import React from 'react'
import { render } from 'react-dom'
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Header from './components/header.js';
import Content from "./components/content";
import Query from './services/Query';
import QueryDialog from './components/dialogs/QueryDialog';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            header: {
                filters: {
                    select: true,
                    insert: true,
                    update: true,
                    delete: true,
                    set:    false,
                },
                webSocket: {
                    url: 'ws://192.168.33.21:8080/'
                },
            },
            content: {
                filteredQueries: [],
                maxQueries: 3000
            },
            dialogs: {
                query: {
                    open: false,
                    query: null
                }
            }
        };

        this.query = null;
        this.ws = null;
        this.queries = [];
        this.timeouts = {
            state: null
        };
    }

    componentDidMount() {
        this.listen(this.state.header.webSocket.url);
    }

    listen(url) {
        this.ws = new WebSocket( url );
        this.ws.onopen = function () {};
        this.ws.onclose = function () {};
        this.ws.onmessage = this.dataReceived.bind(this);
    }

    dataReceived(event) {
        let data = event.data;
        data = data.toLowerCase().trim();
        data = data.replace( /\t/g, ' ' );
        data = data.replace( /^\d{6} \d{2}:\d{2}:\d{2} /, '' );
        data = data.replace( /^ */, '' );

        let words = data.split( ' ' );
        words = words.filter( word => word != '' );
        // Is connection id?
        if (/^\d+$/.test( words[0] )) {
            // If state.query is set, we are on the next query. Thus previous one is complete.
            if (this.query) {
                this.query = Query.normalize( this.query );
                this.query.completed = true;

                if (this.query.type != 'prepare') {
                    this.queries.push(this.query);
                    this.delayedSetState();
                }
            }
            this.query = {
                connection: words[0],
                type      : words[1],
                words     : words.slice( 2 ),
                tables    : [],
                completed : false
            }
//            if (this.state.content.queries.length > this.state.content.maxQueries) {
//                clearQueries();
//            }
        }
        // If not, it is a multiline query
        else if (this.query) {
            this.query.words = this.query.words.concat( words );
        }
    }

    toggleFilter(filter)
    {
        let state = Object.assign({}, this.state);
        state.header.filters[filter] = !state.header.filters[filter];
        state.content.filteredQueries = this.filterQueries(state.header.filters, this.queries);
        this.setState(state);
    }

    filterQueries(filters, queries)
    {
        return queries.filter(query => filters[query.queryType]);
    }

    delayedSetState()
    {
        if (!this.timeouts.state) {
            this.timeouts.state = setTimeout( function () {
                let state = Object.assign({}, this.state);
                state.content.filteredQueries = this.filterQueries(state.header.filters, this.queries);
                this.timeouts.state = null;
                this.setState(state);
            }.bind(this), 300);
        }
    }

    openDialogQuery(query)
    {
        let state = Object.assign({}, this.state);
        state.dialogs.query.open = true;
        state.dialogs.query.query = query;
        this.setState(state);
    }

    handleCloseDialogQuery()
    {
        let state = Object.assign({}, this.state);
        state.dialogs.query.open = false;
        this.setState(state);
    }

    render() {

        console.log();

        return <MuiThemeProvider theme={theme}>
            <Grid container>
                <Header
                    filters={this.state.header.filters}
                    webSocket={this.state.header.webSocket}
                    toggleFilter={this.toggleFilter.bind(this)}
                />
                <Grid item xs={12}>
                    <Content queries={this.state.content.filteredQueries}
                             openDialogQuery={(query) => this.openDialogQuery(query)}
                    />
                </Grid>
            </Grid>
            <QueryDialog dialog={this.state.dialogs.query}
                         onClose={() => this.handleCloseDialogQuery()}
            />
        </MuiThemeProvider>;
    }
}

render(<App />, document.getElementById('root'));
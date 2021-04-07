import React from 'react'
import { render } from 'react-dom'
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Header from './components/header.js';
import Content from "./components/content";
import Query from './services/Query';
import QueryDialog from './components/dialogs/QueryDialog';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blueGrey,
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
                    use:    false,
                    set:    false,
                    show:   false,
                },
                webSocket: {
                    url: 'wss://general-log.com:8081/'
                },
                isStop: false,
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
        data = data.replace( /^\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}\.\d{6}z/, '' );
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

    stop()
    {
        if (this.state.header.isStop) {
            let state = Object.assign({}, this.state);
            state.header.isStop = false;
            this.setState(state);

            this.listen(this.state.header.webSocket.url);
        } else {
            this.ws.close();

            let state = Object.assign({}, this.state);
            state.header.isStop = true;

            this.setState(state);
        }
    }

    restart()
    {
        let state = Object.assign({}, this.state);

        state.content.filteredQueries = [];
        this.query = null;
        this.queries = [];

        clearTimeout(this.timeouts.state);
        this.timeouts.state = null;

        this.setState(state);
    }

    render() {
        return <MuiThemeProvider theme={theme}>
            <Grid container>
                <Header
                    filters={this.state.header.filters}
                    webSocket={this.state.header.webSocket}
                    toggleFilter={this.toggleFilter.bind(this)}
                    isStop={this.state.header.isStop}
                    stop={() => this.stop()}
                    restart={() => this.restart()}
                    numberOfFilteredQueries={this.state.content.filteredQueries.length}
                    numberOfQueries={this.queries.length}
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
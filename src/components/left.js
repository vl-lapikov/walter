import React from 'react';
import Grid from '@material-ui/core/Grid';
import hljs from 'highlight.js/lib/highlight';

import Highlight from 'react-highlight'

class Left extends React.Component {

    render() {
        const {queries} = this.props;

        return (
            <Grid item xs={4} style={{color : '#fff'}}>
                {queries.map((query, i) => {
                    return <Highlight key={i} className="sql">{query.tables.join(' ') || ' '}</Highlight>;
                })}
            </Grid>
        );
    }
}

export default Left

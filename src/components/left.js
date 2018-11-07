import React from 'react';
import Grid from '@material-ui/core/Grid';

import HighlightExtended from './HighlightExtended';

class Left extends React.Component {

    render() {
        const {queries} = this.props;

        return (
            <Grid item xs={4} style={{color : '#fff'}}>
                {queries.map((query, i) => {
                    return <HighlightExtended key={'left-'+i} className="sql" query={query.tables.join(' ') || ' '}/>;
                })}
            </Grid>
        );
    }
}

export default Left

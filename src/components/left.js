import React from 'react';
import Grid from '@material-ui/core/Grid';

import HighlightExtended from './HighlightExtended';

class Left extends React.Component {

    render() {
        const {queries, openDialogQuery} = this.props;

        return (
            <Grid item xs={4} style={{color : '#fff'}}>
                {queries.map((query, i) => {
                    return <div key={'left-'+i}  onClick={() => openDialogQuery(query.filtered)}>
                        <HighlightExtended className="sql" query={query.tables.join(' ') || ' '}/>
                    </div>;
                })}
            </Grid>
        );
    }
}

export default Left

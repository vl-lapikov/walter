import React from 'react';
import Grid from '@material-ui/core/Grid';
import HighlightExtended from './HighlightExtended';

class Right extends React.Component {

    render() {
        const {queries, openDialogQuery} = this.props;

        return (
            <Grid item xs={8} style={{color : '#fff'}}>
                {queries.map((query, i) => {
                    return <div key={'right-'+i} onClick={() => openDialogQuery(query.filtered)}>
                        <HighlightExtended className="sql" query={query.filtered}/>
                    </div>;
                })}
            </Grid>
        );
    }
}

export default Right

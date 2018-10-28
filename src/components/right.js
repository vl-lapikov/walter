import React from 'react';
import Grid from '@material-ui/core/Grid';
import Highlight from 'react-highlight'

class Right extends React.Component {

    render() {
        const {queries, openDialogQuery} = this.props;

        return (
            <Grid item xs={8} style={{color : '#fff'}}>
                {queries.map((query, i) => {
                    console.log(openDialogQuery);
                    return <div key={i} onClick={() => openDialogQuery(query.filtered)}><Highlight className="sql">{query.filtered}</Highlight></div>;
                })}
            </Grid>
        );
    }
}

export default Right

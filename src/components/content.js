import React from 'react';
import Grid from '@material-ui/core/Grid';
import Left from './left.js';
import Right from './right.js';

class Content extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.queries !== nextProps.queries;
    }

    render() {
        const {queries, openDialogQuery} = this.props;

        return (
            <Grid container spacing={0}>
                <Left queries={queries} />
                <Right queries={queries} openDialogQuery={openDialogQuery} />
            </Grid>
        );
    }
}

export default Content;
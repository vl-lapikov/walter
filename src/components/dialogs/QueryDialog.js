import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    dialog: {
        backgroundColor: '#333',
    },
});

function QueryDialog(props) {
    const {dialog, onClose, classes} = props;

    return (
        <Dialog open={dialog.open}
                onClose={onClose}
                className={classes.dialog}
        >
            <DialogTitle>{dialog.query}</DialogTitle>
        </Dialog>
    );
}

export default withStyles(styles)(QueryDialog)
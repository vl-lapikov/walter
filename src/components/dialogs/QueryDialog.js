import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SqlFormatter from 'sql-formatter';
import Highlight from 'react-highlight';

const styles = {
    paper: {
        minHeight: '50%',
        backgroundColor: '#333',
    }
};

function QueryDialog(props) {
    const {dialog, onClose, classes} = props;

    let query = '';
    if (dialog.query) {
        query = SqlFormatter.format(dialog.query);
    }

    return (
        <Drawer anchor="bottom"
                open={dialog.open}
                onClose={onClose}
                classes={classes}
        >
            <div>
                <Highlight className="sql">{query}</Highlight>
            </div>
        </Drawer>
    );
}

export default withStyles(styles)(QueryDialog)
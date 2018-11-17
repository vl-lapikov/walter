import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Help from '@material-ui/icons/Help';

const styles = theme => ({
    button: {
        margin: '0px 2px 0px 0px',
    },
});

class Header extends React.Component {

    render() {
        const {classes, restart, stop, numberOfFilteredQueries, numberOfQueries} = this.props;

        return (
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.select ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('select')}
                        >select</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.insert ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('insert')}
                        >insert</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.update ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('update')}
                        >update</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.delete ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('delete')}
                        >delete</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.set ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('set')}
                        >set</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.show ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('show')}
                        >show</Button>
                        <Button
                            size="small"
                            color="primary"
                            variant={this.props.filters.use ? 'contained' : 'text'}
                            className={classes.button}
                            onClick={() => this.props.toggleFilter('use')}
                        >use</Button>
                        <Button disabled color="secondary" style={{color: 'yellowgreen'}}>{numberOfFilteredQueries+' / '+numberOfQueries}</Button>
                        <Tooltip title="Walter doesn't support queries like Connect, Quit, Prepare. But shows the total number for transparency.">
                            <Help color="secondary" fontSize="small" />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                        <Button color="primary"
                                variant={this.props.isStop ? 'contained' : 'text'}
                                onClick={() => stop()}
                        >stop</Button>
                        <Button color="primary"
                                onClick={() => restart()}
                        >refresh</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Input fullWidth value={this.props.webSocket.url} style={{color : '#fff'}} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Header);
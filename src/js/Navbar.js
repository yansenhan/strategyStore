import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link, Route} from 'react-router-dom'
import '../css/App.css'
import { BrowserRouter } from 'react-router-dom'
import Bought from './Bought';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
              <a href="./index.html" style={{fontWeight: 'bolder'}}>Strategy Store</a>
          </Typography>
          <div>
            <Button onClick={props.showBought} variant="text" size="medium" color="inherit" className={classes.button} style={{ fontSize: '18px', textTransform: 'none', fontWeight: 'bold'}}>
              Bought Strategy
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={props.showSell} variant="text" size="medium" color="inherit" className={classes.button} style={{ fontSize: '18px', textTransform: 'none', fontWeight: 'bold'}}>
              Sell Strategy
            </Button>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <a style={{ fontSize: '20px', textTransform: 'none', fontWeight: 'bold'}}>address: {props.account}</a>
            </Typography>
          </div>
         </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
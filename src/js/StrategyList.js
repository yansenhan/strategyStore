import React,{Component} from 'react'
import Grid from '@material-ui/core/Grid'
//import TextField from '@material-ui/core/TextField'
import Strategy from './Strategy.js'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 6,
  },
});

function StrategyList(props){
    const { classes } = props;
    return(
        <div>
            {props.strategies ? (
                <div>
                    <Grid container spacing={24} style={{padding: 24}}>
                        { props.strategies.map(currentStrategy => (
                          <Grid item xs={12} sm={6} lg={4} xl={3}>
                          <Strategy account={props.account}
                                    strategy={currentStrategy}
                                    bought = {props.boughts[currentStrategy.id]}
                                    boughtm = {props.bought}
                                    score = {props.scores[currentStrategy.id]}
                                    Pay = {props.Pay}
                                    View = {props.View}
                                    Modify = {props.Modify}
                                    openVote={props.openVote}
                                    closeVote={props.closeVote}
                                    vote={props.vote}
                                    content={props.content}
                                    />
                           </Grid>
                          )
                          )
                        }
                    </Grid>
                </div>
            ) : "No Strategy found" }
            <Fab onClick = {() => props.Add()} color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon />
            </Fab>
        </div>
    )
}
StrategyList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(StrategyList)
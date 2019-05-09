import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from 'material-ui-rating'

const Choices = (props) => {
    if(props.bought){
        console.log(props.score);
        return (
        <div>
            <Button onClick = {() => props.View(props.id)} variant="contained" size="small" color="primary" target="_blank" style={{ textTransform: 'none', fontWeight: 'bold'}}>View </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick = {() => props.openVote()} variant="contained" size="small" color="primary" target="_blank" style={{ textTransform: 'none', fontWeight: 'bold'}}>Vote </Button>
            <Dialog
               open={props.vote}
               onClose={() => props.closeVote(props.score, props.id)}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Please give your score"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                    <Rating
                      style={{align:'center'}}
                      value={props.score/2}
                      max={5}
                      onChange={(value) => props.closeVote(value*2,props.id)}
                    />
                  </DialogContentText>
              </DialogContent>
            </Dialog>
        </div>
        )
    }
    if(props.owner == props.account){
        return <Button onClick = {() => props.Modify(props.id)} variant="contained" size="small" color="primary" target="_blank" style={{ textTransform: 'none', fontWeight: 'bold'}}>Modify </Button>
    }
    else{
        return <Button onClick = {() => props.Pay(props.price, props.id)} variant="contained" size="small" color="primary" target="_blank" style={{ textTransform: 'none', fontWeight: 'bold'}}>Pay</Button>
    }
}

export default Choices
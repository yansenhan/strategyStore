import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Upload from 'material-ui-upload/Upload';
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing.unit*50,
        marginRight: theme.spacing.unit*50,
        marginTop: theme.spacing.unit*4,
      },
      container2:{
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing.unit*50,
        marginTop:theme.spacing.unit*4,
      },
      container3:{
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing.unit*115,
        marginTop:theme.spacing.unit*4,
        marginBottom: theme.spacing.unit*8,
      },
      input:{
        fontSize:25,
        lineHeight:1.5,
      },
      label: {
        fontSize: 25,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
      },
});

// function captureFile(props, { target }){
//   const reader = new window.FileReader()
//   filename = target.files[0].name
//   props.setFilename(filename)
//   reader.readAsArrayBuffer(target.files[0])
//   reader.onloadend = () => {
//     buffer =  Buffer(reader.result)
//     console.log('buffer', buffer)
//   }
// }

// function captureTitle (event){
//   title = event.target.value
// }

// function captureDescription (event){
//   description = event.target.value
// }

// function captureContent (event) {
//   content = event.target.value
// }

// function capturePrice (event) {
//   price = event.target.price
// }

function Modify(props){
    const { classes } = props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="on">
        <TextField
            label="Title"
            fullWidth
            margin="normal"
            onChange={event => {props.setTitle(event.target.value)}}
            InputProps={{
              classes: {
                input: classes.input,
                },
              }}
            InputLabelProps={{
              FormLabelClasses: {
              root: classes.label
              }
            }}
            defaultValue={props.title}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            margin="normal"
            onChange={event => {props.setDescription(event.target.value)}}
            rows="10"
            InputProps={{
              classes: {
                input: classes.input,
                },
              }}
            InputLabelProps={{
              FormLabelClasses: {
              root: classes.label
              }
            }}
            defaultValue={props.description}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            margin="normal"
            onChange={event => {props.setContent(event.target.value)}}
            rows="20"
            InputProps={{
                classes: {
                    input: classes.input,
                  },
                }}
            InputLabelProps={{
              FormLabelClasses: {
              root: classes.label,
              }
            }}
            defaultValue={props.content}
          />
          <TextField
            label="Price(wei)"
            margin="normal"
            style = {{width: 200}}
            onChange={event => {props.setPrice(event.target.value)}}
            InputProps={{
              classes: {
                input: classes.input,
                },
              }}
            InputLabelProps={{
              FormLabelClasses: {
              root: classes.label
              }
            }}
            defaultValue={props.price}
          /> 
       </form>
       <form className={classes.container2} noValidate autoComplete="on">
       <input
              accept="image/*"
              className={classes.input}
              style={{ display:'none' }}
              id="upload"
              multiple
              onChange = {props.captureFile}
              type="file"
          />
        <label htmlFor="upload">
            <Button variant="contained" size="medium" color="primary" target="_blank" 
            style={{ textTransform: 'none', fontWeight: 'bold'}} component="span">
              Upload
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              margin = "dense"
              variant = "standard"
              inputStyle = {{textAlign : 'center'}}
              InputProps={{
                readOnly: "true",
                fontSize: 21,
                }}
              value = {props.filename}
             />
        </label>
        </form>
        <form className={classes.container3} noValidate autoComplete="on">
        <Button variant="contained" onClick = {props.onSubmit} size="large" color="primary" target="_blank" 
            style={{ textTransform: 'none', fontWeight: 'bold'}} >
              Submit
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick = {props.showHome} size="large" color="primary" target="_blank" 
            style={{ textTransform: 'none', fontWeight: 'bold'}} >
              Cancel
        </Button>
        </form>
        <Dialog
          open={props.invalid}
          onClose={() => props.closeAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Error!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Invalid Input! The reason may be the image is not uploaded or the price is not correct.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={props.closeAlert} color="primary">
                OK
              </Button>
              </DialogActions>
          </Dialog>
          
      </div>
          )
}

Modify.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Modify);
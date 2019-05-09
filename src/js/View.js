import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'


const styles = theme => ({
    container: {
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
        marginLeft: theme.spacing.unit*140,
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

function View(props){
    console.log(props.image)
    const { classes } = props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="on">
        <TextField
            label="Title"
            fullWidth
            margin="normal"
            rows={2}
            InputProps={{
              readOnly: "true",
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
            rows={10}
            InputProps={{
              readOnly: "true",
              classes: {
                input: classes.input,
                },
              }}
            InputLabelProps={{
              FormLabelClasses: {
              root: classes.label
              }
            }}
            value={props.description}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            disabled
            margin="normal"
            rows={25}
            InputProps={{
                readOnly: "true",
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
       </form>
       <form className={classes.container2} noValidate autoComplete="on">
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <a style={{ fontSize: '30px', textTransform: 'none', fontWeight: 'bold'}}>Benefit Analysis</a>
          </Typography>
       </form>
       <form className={classes.container} noValidate autoComplete="on">
       <Card>
          <CardMedia style={{paddingTop: '40%'}}
                        image = {props.image}
                        title={props.title}
                        />
          
          </Card>
          </form>
        <form className={classes.container3} noValidate autoComplete="on">
        <Button variant="contained" onClick = {props.showHome} size="large" color="primary" target="_blank" 
            style={{ textTransform: 'none', fontWeight: 'bold'}} >
              Return
        </Button>
        </form>
        
          
      </div>
          )
}

View.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(View);
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Rating from 'material-ui-rating'
import PropTypes from 'prop-types'
import Choices from './Choices'


const Strategy = (props) => {
    console.log(props.strategy.image)
    return(
        <div>
          { props.strategy&&(props.content == "sell"||!props.boughtm||(props.boughtm&&props.bought)) ? (
                <Card>
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                        image = {props.strategy.image}
                        title={props.strategy.title}
                        />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.strategy.title}
                        </Typography>
                        <Rating
                          value={props.strategy.score.toFixed(1)/2}
                          max={5}
                          readOnly={true}
                        />
                        <Typography gutterBottom noWrap>
                            {props.strategy.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Choices
                        owner={props.strategy.owner}
                        id={props.strategy.id}
                        price={props.strategy.price} 
                        bought={props.bought}
                        account={props.account}
                        strategy={props.strategy}
                        score={props.score}
                        Pay={props.Pay}
                        View={props.View}
                        Modify={props.Modify}
                        openVote={props.openVote}
                        closeVote={props.closeVote}
                        vote={props.vote}
                        />
                    </CardActions>
                </Card>
          ): null }  
        </div>
    )
}

export default Strategy
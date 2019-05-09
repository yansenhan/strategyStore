import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import StrategyList from './StrategyList.js'
import View from './View.js'
import Modify from './Modify.js'



function Content (props){
    if(props.content == 'home'){
        return (
          <StrategyList
            account={props.account}
            strategies={props.strategies}
            boughts={props.boughts}
            bought={props.bought}
            content={props.content}
            scores={props.scores}
            Pay={props.Pay}
            View = {props.View}
            Modify = {props.Modify}
            Add = {props.Add}
            openVote={props.openVote}
            closeVote={props.closeVote}
            vote={props.vote}/>
          )
    }
    if(props.content == 'sell'){
      return (
        <StrategyList
          account={props.account}
          strategies={props.sells}
          boughts={props.boughts}
          bought={props.bought}
          content={props.content}
          scores={props.scores}
          Pay={props.Pay}
          View = {props.View}
          Modify = {props.Modify}
          Add = {props.Add}
          openVote={props.openVote}
          closeVote={props.closeVote}
          vote={props.vote}/>
        )
  }
    if(props.content == 'view'){
        return (
          <View
            image={props.strategies[props.currentid].image}
            title={props.strategies[props.currentid].title}
            description={props.strategies[props.currentid].description}
            content={props.strategies[props.currentid].content}
            showHome={props.showHome}/> 
        )
    }
    if(props.content == 'modify'){
      return (
        <Modify
          image={props.strategies[props.currentid].image}
          title={props.strategies[props.currentid].title}
          description={props.strategies[props.currentid].description}
          content={props.strategies[props.currentid].content}
          state={props.content}
          price={props.strategies[props.currentid].price}
          invalid={props.invalid}
          onSubmit={props.onSubmit}
          filename={props.filename}
          setFilename={props.setFilename}
          closeAlert={props.closeAlert}
          // captureContent={props.captureContent}
          // captureDescription={props.captureDescription}
          captureFile={props.captureFile}
          // capturePrice={props.capturePrice}
          // captureTitle={props.captureTitle}
          setContent={props.setContent}
          setDescription={props.setDescription}
          setPrice={props.setPrice}
          setTitle={props.setTitle}
          showHome={props.showHome}
          /> 
      )
    }
    if(props.content == 'add'){
      return (
        <Modify
          invalid={props.invalid}
          onSubmit={props.onSubmit}
          filename={props.filename}
          setFilename={props.setFilename}
          state={props.content}
          closeAlert={props.closeAlert}
          // captureContent={this.captureContent}
          // captureDescription={this.captureDescription}
          captureFile={props.captureFile}
          // capturePrice={this.capturePrice}
          // captureTitle={this.captureTitle}
          setContent={props.setContent}
          setDescription={props.setDescription}
          setPrice={props.setPrice}
          setTitle={props.setTitle}
          showHome={props.showHome}
          /> 
      )
  }
    
}

export default Content
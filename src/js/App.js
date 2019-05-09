import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import strategyStore from '../../build/contracts/strategyStore.json'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './Navbar.js'
import '../css/App.css'
import ipfs from './ipfs'
import Content from './Content.js';
import {ethers, utils} from 'ethers'
import "babel-polyfill";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      strategies: [],
      bought: false,
      boughts_bool: [],
      sells: [],
      scores: [],
      content: 'home',
      currentid: 0,
      vote: false,
      invalid: false,
      filename: "Upload income analysis",
      buffer: null,
      title: '',
      description: '',
      code: '',
      price: 0,
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
    }
    this.web3 = new Web3(this.web3Provider)
    this.ss = TruffleContract(strategyStore)
    this.ss.setProvider(this.web3Provider)
  }

  componentDidMount() {
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.ss.deployed().then((ssinstance) => {
          this.ssinstance = ssinstance
          this.ssinstance.count().then((count) => {
            for(var i = 0; i < count; i++){
              this.ssinstance.strategies(i).then((strategy) => {
                const strategies = [...this.state.strategies]
                const sells = [...this.state.sells]
                if(!web3.toBigNumber(strategy[0]).isZero()){  
                  strategies.push({
                      owner: strategy[0],
                      image: strategy[1],
                      title: strategy[2],
                      description: strategy[3],
                      content: strategy[4],
                      buyCount: strategy[5],
                      price: strategy[6],
                      score: strategy[7],
                      voteCount: strategy[8],
                      id: strategy[9]
                  });
                if(strategy[0] == this.state.account){
                    sells.push({
                      owner: strategy[0],
                      image: strategy[1],
                      title: strategy[2],
                      description: strategy[3],
                      content: strategy[4],
                      buyCount: strategy[5],
                      price: strategy[6],
                      score: strategy[7],
                      voteCount: strategy[8],
                      id: strategy[9]
                    });
                  }
                }
                this.setState({ strategies: strategies })
                this.setState({ sells: sells })
              });
              }
            for(var i = 0; i < count; i++){
              this.ssinstance.getBought(account, i).then((bought) =>{
                this.setState({ boughts_bool: [...this.state.boughts_bool, bought] })
              })
              

            }
            for(var i = 0; i < count; i++){
              this.ssinstance.getScore(account, i).then((score) => {
                const scores = [...this.state.scores]
                scores.push({score})
                this.setState({scores: scores})
                });
            }
            })
            
          })
          
        
        })
    }
    
  captureFile = ({ target }) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(target.files[0])
    this.setState({filename: target.files[0].name})
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  setTitle = (value) =>{
    this.setState({title: value})
  }

  setDescription = (value) => {
    this.setState({description: value})
  }

  setContent = (value) => {
    this.setState({code: value})
  }
  
  setPrice = (value) => {
    this.setState({price: value})
  }

  // captureTitle = (event) => {
  //   console.log(event.target.value)
  //   this.setState({title: event.target.value})
  // }
  
  // captureDescription = (event) => {
  //   this.setState({description: event.target.value})
  // }

  // captureContent = (event) => {
  //   this.setState({code: event.target.value})
  // }
  
  // capturePrice = (event) => {
  //   this.setState({price: event.target.value})
  // }
  
  onSubmit = () => {
    if(!this.state.buffer) {
        this.setState({invalid: true})
        return
      }
    console.log(this.state.buffer)
    ipfs.files.add(this.state.buffer, (err, result) => {
    // Price is not a number
    console.log(result[0].hash)
    if(isNaN(this.state.price)||this.state.price == ""){
      this.setState({invalid: true})
      console.log("Invalid Input!")
      return
    }
    if(this.state.content == 'modify'){
      const strategies = this.state.strategies
      strategies[this.state.currentid].title = this.state.title
      strategies[this.state.currentid].description = this.state.description
      strategies[this.state.currentid].content = this.state.code
      strategies[this.state.currentid].price = this.state.price
      strategies[this.state.currentid].image = 'https://ipfs.io/ipfs/' + result[0].hash
      this.setState({strategies: strategies})
      const strategy = strategies[this.state.currentid]
      this.ssinstance.modifyStrategy(
        this.state.currentid, strategy.image, strategy.title, strategy.description, strategy.content, strategy.price,
        { from: this.state.account }).then()
    }
    if(this.state.content == 'add'){
      this.ssinstance.addStrategy(
        'https://ipfs.io/ipfs/'+result[0].hash, this.state.title, this.state.description, this.state.code, this.state.price,
        { from: this.state.account }).then()
    }    
    })
  }

  openVote = () =>{
     this.setState({vote: true})
  }
  
  closeVote = async (score, id) => {
    const scores =  this.state.scores;
    scores[id] = score;
    console.log(id)
    this.setState({scores: scores});
    console.log(this.state.scores)
    this.setState({vote: false});
    await this.ssinstance.vote(id, score, {
      from: this.state.account,
    });
  }

  closeAlert = () =>{
    this.setState({invalid: false});
  }
  showHome = () =>{
    this.setState({content: 'home'});
    this.setState({bought: false});
  }
  showBought = () => {
    this.setState({bought: true});
    this.setState({content: 'home'});
  }
  
  showSell = () => {
    this.setState({content: 'sell'});
  }
  
  Pay = async (price, id) => {
    console.log(price)
    price = price.toNumber() + 1e4
    const price_ = utils.formatEther(price)
    await this.ssinstance.buyStrategy(id, this.state.account,{
      from: this.state.account,
      value: utils.parseEther(price_),
    })
    const boughts_bool = this.state.boughts_bool
    boughts_bool[id] = true
    this.setState({ boughts_bool: boughts_bool })
    }
  
  View = (id) => {
    this.setState({content: 'view'});
    this.setState({currentid: id});
    }

  Modify = (id) => {
    this.setState({content: 'modify'});
    this.setState({currentid: id});
    this.setTitle(this.state.strategies[this.state.currentid].title)
    this.setDescription(this.state.strategies[this.state.currentid].description)
    this.setContent(this.state.strategies[this.state.currentid].content)
    this.setPrice(this.state.strategies[this.state.currentid].price)
    
  }
  
  Add = () => {
    if(this.state.account){
      this.setState({content: 'add'});
    }
    
  }
  
  setFilename = (filename) =>{
    this.setState({filename: filename});
  }

  render() {
    console.log(this.state.scores)
    console.log(this.state.strategies)
    return (
      <div>
        <Navbar 
          account={this.state.account}
          strategies={this.state.strategies}
          boughts={this.state.boughts}
          scores={this.state.scores}
          showBought={this.showBought}
          showSell={this.showSell}/>
        <Content 
          account={this.state.account}
          strategies={this.state.strategies}
          sells={this.state.sells}
          boughts={this.state.boughts_bool}
          bought={this.state.bought}
          scores={this.state.scores}
          currentid={this.state.currentid}
          content={this.state.content}
          Pay={this.Pay}
          View={this.View}
          Modify={this.Modify}
          Add={this.Add}
          openVote={this.openVote}
          closeVote={this.closeVote}
          vote={this.state.vote}
          onSubmit={this.onSubmit}
          invalid={this.state.invalid}
          filename={this.state.filename}
          setFilename={this.setFilename}
          closeAlert={this.closeAlert}
          // captureContent={this.captureContent}
          // captureDescription={this.captureDescription}
          captureFile={this.captureFile}
          // capturePrice={this.capturePrice}
          // captureTitle={this.captureTitle}
          setContent={this.setContent}
          setDescription={this.setDescription}
          setPrice={this.setPrice}
          setTitle={this.setTitle}
          showHome={this.showHome}
          />
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)

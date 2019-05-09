pragma solidity ^0.5.0;

contract strategyStore{
    //Strategy model
    struct Strategy{
        address payable owner;
        string image;
        string title;
        string desciption;
        string content;
        uint buyCount;
        uint price;
        uint score;
        uint voteCount;
        uint id;
    }
    struct Buyer{
        uint bought_strategies;
        mapping(uint => uint) score;
        mapping(uint => bool) bought;
    }
    //Fetch Strategy
    mapping(uint => Strategy) public strategies;
    //Fetch Buyer
    mapping(address => Buyer) public buyers;
    // ID of strategies
    uint public count;
    // Number of strategies
    uint public scount;
    // Address of deployer
    address payable public deployer;
    constructor () public payable{
        deployer = msg.sender;
    }
    function getBought (address buyer, uint id) public view returns(bool){
        return buyers[buyer].bought[id];
    }
    function getScore (address buyer, uint id) public view returns(uint){
        return buyers[buyer].score[id];
    }
    // Vote on the strategy by id
    function vote (uint id, uint _score) public{
        require(_score >= 1 && _score <= 10, "Score error.");
        require(msg.sender != strategies[id].owner, "Self-voted is disallowed.");
        require(buyers[msg.sender].bought[id],"Unbought strategy.");
        // If the buyer hasn't voted yet
        if(buyers[msg.sender].score[id] == 0){
            strategies[id].score = (strategies[id].score * strategies[id].voteCount + _score)/(strategies[id].voteCount + 1);
            strategies[id].voteCount ++;
            buyers[msg.sender].score[id] = _score;
        }
        // If the buyer has voted, change her score in the total score
        else{
            strategies[id].score = (strategies[id].score * strategies[id].voteCount - buyers[msg.sender].score[id] + _score)/(strategies[id].voteCount);
            buyers[msg.sender].score[id] = _score;
        }
    }

    function addStrategy(string memory _image, string memory _title, string memory _description, string memory _content, uint _price)public {
        strategies[count] = Strategy(msg.sender, _image, _title, _description, _content, 0,  _price, 0, 0, count);
        count ++;
        scount ++;
    }
    function modifyStrategy(uint id, string memory _image, string memory _title,
     string memory _description, string memory _content, uint _price)public {
        require(
            msg.sender == strategies[id].owner,
            "Not owner of the strategy."
        );
        strategies[id].image = _image;
        strategies[id].title = _title;
        strategies[id].desciption = _description;
        strategies[id].content = _content;
        strategies[id].price = _price;
    }
    
    function deleteStrategy(uint id)public {
        require(
            msg.sender == strategies[id].owner,
            "Not owner of the strategy."
        );
        scount --;
        delete strategies[id];
    }

    function buyStrategy(uint id, address buyer)public payable {
        require(msg.value >= strategies[id].price + 1e4, "Insufficient fund.");
        require(strategies[id].owner != buyer, "Can not buy your own strategy.");
        require(!buyers[buyer].bought[id],"Bought strategy.");
        strategies[id].buyCount ++;
        buyers[buyer].bought[id] = true;
        buyers[buyer].bought_strategies ++;
        strategies[id].owner.transfer(strategies[id].price);
        // //Transfer 0.01 * price of the strategies to the deployer
        // deployer.transfer(msg.value - strategies[id].price);
    }
    // Fetch strategy with max score
    function topStrategy()public view returns (uint id){
        require(count > 0, "No strategy.");
        uint maxScore = 0;
        for(uint i = 1; i <= count; i ++){
            if(strategies[i].score > maxScore){
                id = i;
                maxScore = strategies[id].score;
            }
        }
        
    }

}
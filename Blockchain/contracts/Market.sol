// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./FriendBucks.sol";

contract Market {
    struct PredictionMarket {
        string question;
        uint256 deadline;
        uint256 yesBets;
        uint256 noBets;
        bool resolved;
        bool outcome;
        mapping(address => uint256) betsYes;
        mapping(address => uint256) betsNo;
    }

    FriendBucks public token;
    address public owner;
    mapping(uint256 => PredictionMarket) public markets;
    uint256 public marketCount;

    event MarketCreated(uint256 marketId, string question, uint256 deadline);
    event BetPlaced(uint256 marketId, address user, bool choice, uint256 amount);
    event MarketResolved(uint256 marketId, bool outcome);

    constructor(address _token) {
        token = FriendBucks(_token);
        owner = msg.sender;
    }

    function createMarket(string memory _question, uint256 _deadline) external {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        marketCount++;
        PredictionMarket storage market = markets[marketCount];
        market.question = _question;
        market.deadline = _deadline;

        emit MarketCreated(marketCount, _question, _deadline);
    }

    function placeBet(uint256 _marketId, bool _choice, uint256 _amount) external {
        require(_marketId > 0 && _marketId <= marketCount, "Invalid market ID");
        PredictionMarket storage market = markets[_marketId];
        require(block.timestamp < market.deadline, "Market closed");
        require(_amount > 0, "Bet amount must be greater than 0");

        token.transferFrom(msg.sender, address(this), _amount);
        
        if (_choice) {
            market.betsYes[msg.sender] += _amount;
            market.yesBets += _amount;
        } else {
            market.betsNo[msg.sender] += _amount;
            market.noBets += _amount;
        }

        emit BetPlaced(_marketId, msg.sender, _choice, _amount);
    }

    function resolveMarket(uint256 _marketId, bool _outcome) external {
        require(msg.sender == owner, "Only owner can resolve");
        PredictionMarket storage market = markets[_marketId];
        require(!market.resolved, "Already resolved");

        market.resolved = true;
        market.outcome = _outcome;

        emit MarketResolved(_marketId, _outcome);
    }

    function claimRewards(uint256 _marketId) external {
        PredictionMarket storage market = markets[_marketId];
        require(market.resolved, "Market not resolved");
        
        uint256 payout = 0;
        if (market.outcome) {
            payout = market.betsYes[msg.sender];
        } else {
            payout = market.betsNo[msg.sender];
        }

        require(payout > 0, "No winnings");
        token.transfer(msg.sender, payout * 2); // 2x reward

        delete market.betsYes[msg.sender];
        delete market.betsNo[msg.sender];
    }
}

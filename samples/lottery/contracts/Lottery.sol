pragma solidity ^0.4.21;

contract Lottery {
    address public owner;
    address[] public players;

    function Lottery() public {
        // Making sure the owner is the address that deployed the contract
        owner = msg.sender;
    }

    // Adds a player in the lottery, where the player needs to pay 0.01 ether to join
    // Function is payable because we want that users pay to join the lottery
    function join() public payable {
        // require is used for validations
        // msg.value is the amount of Ether (in Wei) that was sent by the player
        // "ether" automatically converts ether in wei
        require(msg.value >= .01 ether);

        // Storing the player address
        players.push(msg.sender);
    }

    // Generates a random number
    // view means that we're not modifying any state or any data in the contract
    function random() private view returns (uint) {
        // keccak256 represents the SHA-3 algorithm
        // difficulty is a number that indicates how challenging is to solve the current block
        // now is the current time
        // uint will convert hash number tom uint
        return uint(keccak256(block.difficulty, now, players));
    }
}
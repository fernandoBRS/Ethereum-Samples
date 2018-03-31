// web3 constructor
const Web3 = require('web3');
const assert = require('assert');
const ganache = require('ganache-cli');

// If you want to use Ganache, replace the provider by ganache.provider()
const provider = new Web3.providers.HttpProvider('<YOUR PROVIDER URL>');
const web3 = new Web3(provider);

// Interface and bytecode generated by the solidity compiler
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hello World!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use an account to deploy the contract
    // Need to serialize the contract ABI (interface) as an object
    // deploy() creates a transaction object that contains the contract data
    // send() triggers the communication from web3 to the network.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox contract', () => {
    it('deploys a contract', () => {
        // Checks if the contract was deployed successfully
        assert.ok(inbox.options.address);
    });
    
    it('has a default message', async () => {
        // When we want to retrieve a value without modifying it, we have to call a method.
        // methods is an object that contains all public functions that exist in a contract.

        // call is used to customize the transaction that will be sent to the network.
        // For example, if you want to send a transaction we need to send an object as parameter
        // that will have info about who is sending the transaction and the amount of gas to be used.
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message', async () => {
        // At this time we're trying to modify a contract's data.
        // Everytime we want to modify data, we have to send a new transaction.
        await inbox.methods.setMessage('Hello new world!').send({ from: accounts[0] });

        const message = await inbox.methods.message().call();
        assert.equal('Hello new world!', message);
    });
});
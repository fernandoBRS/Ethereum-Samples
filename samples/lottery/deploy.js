const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = ganache.provider();
//const provider = new Web3.providers.HttpProvider('<YOUR PROVIDER URL>');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode })
        .send({ from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to the address', result.options.address);
};

deploy();
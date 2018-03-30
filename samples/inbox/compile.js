const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// module.exports = making the compiled contract available to other js files
// 1 = number of different contracts to be compiled
module.exports = solc.compile(source, 1).contracts[':Inbox'];
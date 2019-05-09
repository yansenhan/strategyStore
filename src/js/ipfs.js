// const IPFS = require('ipfs-api');
// const ipfs = new IPFS({host: 'ipfs.infira.io', port: 5001, protocol: 'https'});
const ipfsApi = require('ipfs-api');
const ipfs = new ipfsApi('localhost', '5001', {protocol:'http'});
export default ipfs
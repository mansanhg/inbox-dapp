const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('./compile');

const provider = new HDWalletProvider(
  'jacket pole cute toast improve limit any sight kiss torch goose medal', //  Mnemonic of the wallet
  'https://rinkeby.infura.io/v3/ba896ff73b8f44b7b2614393a38fdee4' //  Infura API endpoint pointing to the Rinkeby network
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Brave Girls']
    })
    .send({
      gas: '1000000',
      from: accounts[0]
    });

  console.log('Contract deployed at ', result.options.address);
  //  Prevent hanging the deployment
  provider.engine.stop();
};

deploy();

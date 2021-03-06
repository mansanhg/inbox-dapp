const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');

let accounts;
let inbox;
let initialMessage = 'Hi there!';

beforeEach(async () => {
  //  Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //  Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [initialMessage]
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
});

describe('Inbox', () => {
  it('Deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('Initial message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it('Updates message', async () => {
    const newMessage = 'brave sound';
    await inbox.methods.setMessage(newMessage).send({
      from: accounts[0]
    });

    const currentMessage = await inbox.methods.message().call();
    assert.equal(currentMessage, newMessage);
  });
});

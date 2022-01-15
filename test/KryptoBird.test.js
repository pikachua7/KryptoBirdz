const {assert} = require('chai');

//bringing the contract
const KryptoBird = artifacts.require('./KryptoBird')

//check for chai
require('chai').use(require('chai-as-promised')).should()

contract ('KryptoBird' , (accounts) => {

    let contract;

    // before tells our tests to run this first before anything else 
    before( async () => {
        contract = await KryptoBird.deployed(); 
    })

    //testing container
    describe('deployment' , async () => {
        //test samples with writing it
        it('deploys sucessful' , async() => {
            const address = await contract.address;
            assert.notEqual(address , '');
            assert.notEqual(address , null);
            assert.notEqual(address , undefined);
            assert.notEqual(address , 0x0);
        })

        it('has a name' , async() => {
            const name = await contract.name();
            assert.equal(name , 'Kryptobirdz');
        })

        it('has a symbol' , async() => {
            const symbol = await contract.symbol();
            assert.equal(symbol , 'KBIRDZ');
        })
    })

    //testing for minting
    describe('minting', async () => {
        it('creates a new token' , async () =>{
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();
            const event = result.logs[0].args;

            //success
            assert.equal(totalSupply,1);
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from the contract');
            assert.equal(event._to, accounts[0], 'to is msg.sender');
            
            //failures
            await contract.mint('https...1').should.be.rejected;
        })
    })

    //testing all the tokens
    describe('indexing' , async () =>{
        it('lists KryptoBirdz' , async() => {
            //mint three new tokens
            await contract.mint('https...2');
            await contract.mint('https...3');
            await contract.mint('https...4');
            const totalSupply = await contract.totalSupply();
            
            //loop through list and grab KryptoBirdz from list
            let result = [];
            let KryptoBird;
            for(i = 1; i <= totalSupply; i++) {
                KryptoBird = await contract.KryptoBirdz(i - 1);
                result.push(KryptoBird);
            }

            //assert that our new array will equal our expected result
            const expected = ['https...1','https...2','https...3','https...4'];
            assert.equal(result.join(','),expected.join(','));
        })
    })
})

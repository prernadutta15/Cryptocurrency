const Block=require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHah=require('./crypto-hash');
const cryptoHash = require('./crypto-hash');
console.log('okay');
describe('Block', ()=>{
    const timestamp='a-date';
    const lastHash='fooHash';
    const hash='foo';
    const data=['blockchain','data'];
    const nonce=1;
    const difficulty=1;
    const block=new Block({
        timestamp,lastHash,hash,data  }); 
    it('has a timestamp, lastHash, hash and data property',()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });
    describe('genesis()',()=>{
        const genesisBlock=Block.genesis();
        //console.log('genesisBlock',genesisBlock);
    it('returns a block instance',()=>{
        expect(genesisBlock instanceof Block).toBe(true);
    });
    it('returns the genesis data',()=>{
        expect(genesisBlock).toEqual(GENESIS_DATA);
    });
});


    describe('mineblock()',()=>{
        const lastBlock=Block.genesis();
        const data='mined data';
        const minedBlock=Block.mineBlock({
            lastBlock,data
        });
        it('returns a blocked instance',()=>{
            expect(minedBlock instanceof Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock',()=>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        it('sets the `data`',()=>{
            expect(minedBlock.data).toEqual(data);
        });
        it('sets the `timestamp`',()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
        it('creates a SHA-256 `hash` based on inputs',()=>
        {
            expect(minedBlock.hash).toEqual(cryptoHash(
                minedBlock.timestamp,
                minedBlock.nonce,
                minedBlock.difficulty,
                lastBlock.hash,
                data));
        });
        it('sets a `hash` that matches the difficulty criteria',()=>{
            expect(minedBlock.hash.substring(0,minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
        });
    });
});

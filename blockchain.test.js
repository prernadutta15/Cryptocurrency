const Blockchain=require('./blockchain');
const Block=require('./block');
describe('Blockchain',()=>{
    let blockchain;
    let newChain,originalChain;
    beforeEach(()=>{
        blockchain=new Blockchain();
        newChain=new Blockchain();
        originalChain=blockchain.chain;
    });
    console.log('hello world');
   
    it('contains a `chain` array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('adds a new block to the chain',()=>{
        const newData='foo bar';
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });
    describe('isValidChain()',()=>{
        describe('when the chain doesnot start with the genesis block',()=>{
            it('returns false',()=>{
                blockchain.chain[0]={data:'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        describe('replaceChain()',()=>{
            describe('when chain starts with genesis block and has multiple blocks',()=>{
                beforeEach(()=>{
                    blockchain.addBlock({data:'Bears'});
                    blockchain.addBlock({data:'Beets'});
                    blockchain.addBlock({data:'Battlestar'});
                });
                describe('and a lastHash reference has cchanged',()=>{
                    it('returns false',()=>{
                    
                        blockchain.chain[2].lastHash='broken-lastHash';
                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                    });
                });
                describe('and the chain containsa  block with invalid field',()=>{
                    it('returns false',()=>{
                    
                        blockchain.chain[2].data='evil-data';
                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                    });
                });
                describe('and the chain doesnot contain any invlalid blocks',()=>{
                    it('returns true',()=>{
                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                
                    })
                });
            });
        });
    });
    describe('replaceChain()',()=>{
        let errorMock,logMock;
        beforeEach(()=>{
            errorMock=jest.fn();
            logMock=jest.fn();
            global.console.error=errorMock;
            global.console.log=logMock;
        });
        describe('when the new chain is not longer',()=>
        {
            beforeEach(()=>{
                newChain.chain[0]={new: 'chain'};
                blockchain.replaceChain(newChain.chain);
            });
            it('does not replace chain',()=>{
                newChain.chain[0]={new:'chain'};
                //so that test doesnot pass always
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
            it('logs an error',()=>{
                expect(errorMock).toHaveBeenCalled();
            });
        });
        describe('when the new chain is longer()',()=>
        {
            beforeEach(()=>{
               newChain.addBlock({data:'Bears'});
                newChain.addBlock({data:'Beets'});
                newChain.addBlock({data:'Battlestar'});
            });
            describe('and the chain is invalid',()=>{
              
                it('does not replace the chain',()=>{
                    newChain.chain[2].hash='some-fake-hash';
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(originalChain);
                });
                it('logs an error',()=>{
                    expect(errorMock).toHaveBeenCalled();
                })
            });
            describe('and the chain is valid',()=>{
                it('replaces the chain',()=>{
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);  
                });
                
            });
        });
    });
});


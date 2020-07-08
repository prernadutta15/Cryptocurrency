const cryptoHash=require('./crypto-hash');
describe('cryptoHash()',()=>{
    it('generates a SHA-256 hashed output',()=>{
        expect(cryptoHash('foo')).toEqual("2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae");
        console.log(cryptoHash('foo'));
        //expect('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae').toEqual(cryptoHash('foo'));
    });
    it('produces same hash with same argument',()=>{
        expect(cryptoHash('one','two','three')).toEqual(cryptoHash('two','one','three'));
    });
});
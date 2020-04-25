
describe('User Model', () => {
    test('findById func should return valid response', () => {
        let User = require('../models/User');

        let UserOne = {
            UserId: 1,
            Name: 'UserOne',
            Email: 'UserOne@domain.com',
            PasswordHash: '$2y$10$cvUvN2rekVzXaBFT71zNJusf9w2oR1hs5U.S0GKVnh7BWt2K.y5uu'
        }
        
        expect(User.findById(1).toEqual(UserOne));
    });
});

const Deed = require('../models/Deed');

describe('Deed Model', () => {
    describe('Field Mapping', () => {

        beforeEach('Instantiate new Deed from findById function', () => {
            var Deed = Deed.findById(1)
        });
    
        test('Selects a Deed id from the database', () => {
            expect(Deed.DeedId).toBe(1)
        });

        test('Selects a Deed startTime from the database', () => {
            expect(Deed.StartTime).toBe('2018-1-5T05:05')
        });

        test('Selects a Deed task from the database', () => {
            expect(Deed.Title).toBe('Deed One for User One')
        });

        test('Selects a Deed duration from the database', () => {
            expect(Deed.DurationHour).toBe(1)
        });

        test('Selects a Deed user id from the database', () => {
            expect(Deed.UserId).toBe(1)
        });

    });
});
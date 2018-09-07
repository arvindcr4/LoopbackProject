'use strict';

module.exports = function (Product) {
    /**
     * Buy this product
     * @param {number} quantity Number of products
     * @param {Function(Error)} callback
     */

    Product.prototype.buy = function (quantity, callback) {
        // TODO
        var result = {
            status: `You bought ${quantity} product(s)`,

        };
        callback(null, result);
    };

    Product.validatesLengthOf('name', {
        min: 3,
        message: {
            min: 'Name should be at least 3 characters',
        },
    });
    Product.validatesUniquenessOf('name')

    const positiveInteger = /^[0-9]*$/;

    const validatePositiveInteger = function (err) {
        if (!positiveInteger.test(this.price)) {
            err()
        }
    }
    Product.validate('price', validatePositiveInteger, {
        message: 'Price should be a positive integer',
    });
    function validateMinimalPrice(err, done) {
        const price = this.price
        process.nextTick(() => {
            const minimalPriceFromDB = 99
            if (price < minimalPriceFromDB) {
                err();
            }
            done();
        });
    };
    Product.validateAsync('price', validateMinimalPrice, {
        message: 'Price should be higher than the minimal price in the DB'
    });
};

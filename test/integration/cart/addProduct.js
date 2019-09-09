var assert = require('chai').assert;
var request = require('request-promise');
var config = require('../it.config');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

describe('Add Product to cart', function () {
    this.timeout(5000);

    it('analytic should track add-to-cart action', function () {
        var cookieJar = request.jar();

        // The myRequest object will be reused through out this file. The 'jar' property will be set once.
        // The 'url' property will be updated on every request to set the product ID (pid) and quantity.
        // All other properties remained unchanged.
        var myRequest = {
            url: '',
            method: 'POST',
            rejectUnauthorized: false,
            resolveWithFullResponse: true,
            jar: cookieJar,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        var cookieString;

        var addProd = '/Cart-AddProduct';
        var action = 'Cart-AddProduct';
        var message = 'Product added to cart';
        var product = {
            masterId: '25519318M',
            variantId: '701643421084M',
            name: '3/4 Sleeve V-Neck Top',
            qty: 2,
            price: 24,
            itemType: 'product'
        };

        // ----- adding product(s):
        myRequest.url = config.baseUrl + addProd;
        myRequest.form = {
            pid: product.variantId,
            quantity: product.qty
        };

        return request(myRequest)
            // Handle response
            .then(function (response) {
                assert.equal(response.statusCode, 200);

                var expectedResBody = {
                    'quantityTotal': product.qty,
                    'action': action,
                    'message': message,
                    '__mccEvents': [
                        [
                            'trackCart',
                            {
                                'cart': [
                                    {
                                        'item': product.masterId,
                                        'unique_id': product.variantId,
                                        'name': product.name,
                                        'price': product.price,
                                        'item_type': product.itemType
                                    }
                                ]
                            }
                        ]
                    ]
                };

                var bodyAsJson = JSON.parse(response.body);
                assert.equal(bodyAsJson.quantityTotal, expectedResBody.quantityTotal);

                cookieString = cookieJar.getCookieString(myRequest.url);
            });
    });
});

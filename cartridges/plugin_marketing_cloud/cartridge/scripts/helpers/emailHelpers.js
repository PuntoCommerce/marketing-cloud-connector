'use strict';
var base = module.superModule;

module.exports = base;
module.exports.emailTypes = {
    registration: 1,
    passwordReset: 2,
    passwordChanged: 3,
    orderConfirmation: 4,
    accountLocked: 5,
    accountEdited: 6,
    accountNameChanged: 7,
    accountAddressChanged: 8,
    accountPaymentChanged: 9,
    accountEmailChanged: 10
};

# Storefront Reference Architecture (SFRA) Modification Instructions

## Installation using the SFRA overlay cartridge

**Note:** These instructions are only relevant for Version 2.0.0 of the Marketing Cloud Connector after the merging of Pull Request 27 (https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/pull/27).  If you're using a previous release, please use the instructions below at _Manual Modifications to SFRA_

With the release of Version 2.0.0 of the Marketing Cloud Connector, a new cartridge is supplied called **plugin_marketing_cloud**.  This cartridge is intended to overlay the SFRA main cartridge (**app_storefront_base**) and replaces the functionality with that needed to activate the Marketing Cloud Connector hooks.  Essentially, it contains all of the changes the instructions below advise you to make.  You will still need to import and configure all the metadata and custom objects as described below; you just won't have to manually cut and paste all the code from these instructions into your version of SFRA.

After loading up the **plugin_marketing_cloud** cartridge, please adjust your cartridge path to look like:
`plugin_marketing_cloud:app_storefront_base:int_marketing_cloud:int_handlerframework`

## Manual modifications to SFRA

Release 1.0.1 (https://github.com/SalesforceCommerceCloud/handler-framework/tree/1.0.1)

Open **app_storefront_base/cartridge/controllers/Account.js**
Approx. at Approximate line 531, find:

```javascript
var formErrors = require('*/cartridge/scripts/formErrors');
```

After, add:

```javascript
var Site = require('dw/system/Site');
var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
```

At approximate line 585, find:
```javascript
delete formInfo.newPassword;
delete formInfo.newPasswordConfirm;
delete formInfo.profileForm;
```

After, add:
```javascript
var email = customer.profile.email;
var url = URLUtils.https('Account-EditPassword');
var objectForEmail = {
             firstName: customer.profile.firstName,
             lastName: customer.profile.lastName,
              url: url,
              resettingCustomer:customer
             };

var emailObj = {
       to: email,
       subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
       from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
       type: emailHelpers.emailTypes.passwordChanged
        };

emailHelpers.sendEmail(emailObj, 'account/password/passwordChangedEmail', objectForEmail);
```

At approximate line 745, find:

```javascript
var objectForEmail = {
                    firstName: resettingCustomer.profile.firstName,
                    lastName: resettingCustomer.profile.lastName,
                    url: url
                };
```

Replace with the below:
```javascript
 var objectForEmail = {
                    firstName: resettingCustomer.profile.firstName,
                    lastName: resettingCustomer.profile.lastName,
                    url: url,
                    resettingCustomer:resettingCustomer
                };
```

At approximate line 752, find:
```javascript
var emailObj = {
                    to: email,
                    subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
                    from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                    type: emailHelpers.emailTypes.passwordReset
                };
```

Replace with the below:
```javascript
var emailObj = {
                    to: email,
                    subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
                    from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',         
                    type: emailHelpers.emailTypes.passwordChanged
                };
```

Open app_storefront_base/cartridge/scripts/helpers/accountHelpers.js: Approx. at Approximate line 89, find:
```javascript
var objectForEmail = {
        passwordResetToken: passwordResetToken,
        firstName: resettingCustomer.profile.firstName,
        lastName: resettingCustomer.profile.lastName,
        url: url
    };
```

Replace with the below:
```javascript
var objectForEmail = {
         passwordResetToken: passwordResetToken,
         firstName: resettingCustomer.profile.firstName,
         lastName: resettingCustomer.profile.lastName,
         url: url,
         resettingCustomer: resettingCustomer
    };
```

At Approximate line 96, find:
```javascript
var emailObj = {
        to: email,
        subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
        type: emailHelpers.emailTypes.passwordChanged
    };
```

Replace with Below:
```javascript
var emailObj = {
        to: email,
        subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
        type: emailHelpers.emailTypes.passwordReset
    };
```

Previous Releases

Open **app_storefront_base/cartridge/controllers/Account.js:**
Approx. at line 90, find:

```javascript
function sendPasswordResetEmail(email, resettingCustomer) {
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');
    var Mail = require('dw/net/Mail');
    var Template = require('dw/util/Template');
    var Site = require('dw/system/Site');
    var HashMap = require('dw/util/HashMap');

    var template;
    var content;
    var passwordResetToken = getPasswordResetToken(resettingCustomer);
    var url = URLUtils.https('Account-SetNewPassword', 'token', passwordResetToken);
    var objectForEmail = {
        passwordResetToken: passwordResetToken,
        firstName: resettingCustomer.profile.firstName,
        lastName: resettingCustomer.profile.lastName,
        url: url
    };
    var resetPasswordEmail = new Mail();
    var context = new HashMap();
    Object.keys(objectForEmail).forEach(function (key) {
        context.put(key, objectForEmail[key]);
    });

    resetPasswordEmail.addTo(email);
    resetPasswordEmail.setSubject(
        Resource.msg('subject.profile.resetpassword.email', 'login', null));
    resetPasswordEmail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail')
        || 'no-reply@salesforce.com');

    template = new Template('account/password/passwordResetEmail');
    content = template.render(context).text;
    resetPasswordEmail.setContent(content, 'text/html', 'UTF-8');
    resetPasswordEmail.send();
}
```

Change to:

```javascript
function sendPasswordResetEmail(email, resettingCustomer) {
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');
    var Template = require('dw/util/Template');
    var Site = require('dw/system/Site');
    var HashMap = require('dw/util/HashMap');
    var HookMgr = require('dw/system/HookMgr');
    var Logger = require('dw/system/Logger');

    var template;
    var content;
    var passwordResetToken = getPasswordResetToken(resettingCustomer);
    var url = URLUtils.https('Account-SetNewPassword', 'token', passwordResetToken);
    var objectForEmail = {
        passwordResetToken: passwordResetToken,
        firstName: resettingCustomer.profile.firstName,
        lastName: resettingCustomer.profile.lastName,
        url: url,
        resettingCustomer: resettingCustomer
    };
    var context = new HashMap();
    Object.keys(objectForEmail).forEach(function (key) {
        context.put(key, objectForEmail[key]);
    });

    template = new Template('account/password/passwordResetEmail');
    content = template.render(context).text;

    var hookID = 'app.mail.sendMail';
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            'sendMail',
            {
                communicationHookID: 'account.passwordReset',
                template: 'account/password/passwordResetEmail',
                fromEmail: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                toEmail: email,
                subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
                messageBody: content,
                params: context
            }
        );
    } else {
        Logger.error('No hook registered for {0}', hookID);
    }
}
```

Approx. at line 372, find:

```javascript
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
```

After, add:

```javascript
        var HookMgr = require('dw/system/HookMgr');
```

Approx. at line 442, find:

```javascript
                    delete formInfo.profileForm;
                    delete formInfo.email;
```

Before, add:

```javascript
                    if (profileForm.customer.addtoemaillist.checked) {
                        var hookID = 'app.mailingList.subscribe';
                        if (HookMgr.hasHook(hookID)) {
                            HookMgr.callHook(
                                hookID,
                                'subscribe',
                                {
                                    email: formInfo.email
                                }
                            );
                        }
                    }

```

Approx. at line 690, find:

```javascript
        this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
            var CustomerMgr = require('dw/customer/CustomerMgr');
            var URLUtils = require('dw/web/URLUtils');
            var Mail = require('dw/net/Mail');
            var Template = require('dw/util/Template');
            var Site = require('dw/system/Site');
            var HashMap = require('dw/util/HashMap');

            var formInfo = res.getViewData();
            var status;
            var resettingCustomer;
            Transaction.wrap(function () {
                resettingCustomer = CustomerMgr.getCustomerByToken(formInfo.token);
                status = resettingCustomer.profile.credentials.setPasswordWithToken(
                    formInfo.token,
                    formInfo.newPassword
                );
            });
            if (status.error) {
                passwordForm.newpassword.valid = false;
                passwordForm.newpasswordconfirm.valid = false;
                passwordForm.newpasswordconfirm.error =
                    Resource.msg('error.message.resetpassword.invalidformentry', 'forms', null);
                res.render('account/password/newPassword', {
                    passwordForm: passwordForm,
                    token: token
                });
            } else {
                var email = resettingCustomer.profile.email;
                var url = URLUtils.https('Login-Show');
                var objectForEmail = {
                    firstName: resettingCustomer.profile.firstName,
                    lastName: resettingCustomer.profile.lastName,
                    url: url
                };
                var passwordChangedEmail = new Mail();
                var context = new HashMap();
                Object.keys(objectForEmail).forEach(function (key) {
                    context.put(key, objectForEmail[key]);
                });

                passwordChangedEmail.addTo(email);
                passwordChangedEmail.setSubject(
                    Resource.msg('subject.profile.resetpassword.email', 'login', null));
                passwordChangedEmail.setFrom(
                    Site.current.getCustomPreferenceValue('customerServiceEmail')
                    || 'no-reply@salesforce.com');

                var template = new Template('account/password/passwordChangedEmail');
                var content = template.render(context).text;
                passwordChangedEmail.setContent(content, 'text/html', 'UTF-8');
                passwordChangedEmail.send();
                res.redirect(URLUtils.url('Login-Show'));
            }
        });
```

Change to:

```javascript
        this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
            var CustomerMgr = require('dw/customer/CustomerMgr');
            var URLUtils = require('dw/web/URLUtils');
            var Template = require('dw/util/Template');
            var Site = require('dw/system/Site');
            var HashMap = require('dw/util/HashMap');
            var HookMgr = require('dw/system/HookMgr');
            var Logger = require('dw/system/Logger');

            var formInfo = res.getViewData();
            var status;
            var resettingCustomer;
            Transaction.wrap(function () {
                resettingCustomer = CustomerMgr.getCustomerByToken(formInfo.token);
                status = resettingCustomer.profile.credentials.setPasswordWithToken(
                    formInfo.token,
                    formInfo.newPassword
                );
            });
            if (status.error) {
                passwordForm.newpassword.valid = false;
                passwordForm.newpasswordconfirm.valid = false;
                passwordForm.newpasswordconfirm.error =
                    Resource.msg('error.message.resetpassword.invalidformentry', 'forms', null);
                res.render('account/password/newPassword', {
                    passwordForm: passwordForm,
                    token: token
                });
            } else {
                var email = resettingCustomer.profile.email;
                var url = URLUtils.https('Login-Show');
                var objectForEmail = {
                    firstName: resettingCustomer.profile.firstName,
                    lastName: resettingCustomer.profile.lastName,
                    url: url
                };
                var context = new HashMap();
                Object.keys(objectForEmail).forEach(function (key) {
                    context.put(key, objectForEmail[key]);
                });

                var template = new Template('account/password/passwordChangedEmail');
                var content = template.render(context).text;

                var hookID = 'app.mail.sendMail';
                if (HookMgr.hasHook(hookID)) {
                    HookMgr.callHook(
                        hookID,
                        'sendMail',
                        {
                            communicationHookID: 'account.passwordChanged',
                            template: 'account/password/passwordChangedEmail',
                            fromEmail: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                            toEmail: email,
                            subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
                            messageBody: content,
                            params: context
                        }
                    );
                } else {
                    Logger.error('No hook registered for {0}', hookID);
                }

                res.redirect(URLUtils.url('Login-Show'));
            }
        });
```

Save and close the file.

Open **app_storefront_base/cartridge/scripts/checkout/checkoutHelpers.js:**
Approx. at line 7, find:

```javascript
var BasketMgr = require('dw/order/BasketMgr');
var HashMap = require('dw/util/HashMap');
var HookMgr = require('dw/system/HookMgr');
var Mail = require('dw/net/Mail');
```

Change to:

```javascript
var BasketMgr = require('dw/order/BasketMgr');
var HashMap = require('dw/util/HashMap');
var HookMgr = require('dw/system/HookMgr');
```

Approx. at line 529, find:

```javascript
function sendConfirmationEmail(order, locale) {
    var OrderModel = require('*/cartridge/models/order');
    var Locale = require('dw/util/Locale');

    var confirmationEmail = new Mail();
    var context = new HashMap();
    var currentLocale = Locale.getLocale(locale);

    var orderModel = new OrderModel(order, { countryCode: currentLocale.country });

    var orderObject = { order: orderModel };

    confirmationEmail.addTo(order.customerEmail);
    confirmationEmail.setSubject(Resource.msg('subject.order.confirmation.email', 'order', null));
    confirmationEmail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail')
        || 'no-reply@salesforce.com');

    Object.keys(orderObject).forEach(function (key) {
        context.put(key, orderObject[key]);
    });

    var template = new Template('checkout/confirmation/confirmationEmail');
    var content = template.render(context).text;
    confirmationEmail.setContent(content, 'text/html', 'UTF-8');
    confirmationEmail.send();
}
```

Change to:

```javascript
function sendConfirmationEmail(order, locale) {
    var OrderModel = require('*/cartridge/models/order');
    var Locale = require('dw/util/Locale');
    var Logger = require('dw/system/Logger');

    var context = new HashMap();
    var currentLocale = Locale.getLocale(locale);

    var orderModel = new OrderModel(order, { countryCode: currentLocale.country });

    var orderObject = { order: orderModel };
    Object.keys(orderObject).forEach(function (key) {
        context.put(key, orderObject[key]);
    });

    var template = new Template('checkout/confirmation/confirmationEmail');
    var content = template.render(context).text;

    // Set Order for hook compat
    context.put('Order', order);
    // Set extra param, CurrentLocale
    context.put('CurrentLocale', currentLocale);

    var hookID = 'app.mail.sendMail';
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            'sendMail',
            {
                communicationHookID: 'order.confirmation',
                template: 'checkout/confirmation/confirmationEmail',
                fromEmail: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                toEmail: order.customerEmail,
                subject: Resource.msg('subject.order.confirmation.email', 'order', null),
                messageBody: content,
                params: context
            }
        );
    } else {
        Logger.error('No hook registered for {0}', hookID);
    }
}
```

Save and close the file.

Open **app_storefront_base/cartridge/scripts/order/orderHelpers.js:**
Approx. at line 3, find:

```javascript
var HashMap = require('dw/util/HashMap');
var Mail = require('dw/net/Mail');
```

Change to:

```javascript
var HashMap = require('dw/util/HashMap');
```

Approx. at line 109, find:

```javascript
function sendConfirmationEmail(registeredUser) {
    var confirmationEmail = new Mail();
    var context = new HashMap();
    var template;
    var content;

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        url: URLUtils.https('Login-Show')
    };

    confirmationEmail.addTo(userObject.email);
    confirmationEmail.setSubject(
        Resource.msg('email.subject.new.registration', 'registration', null)
    );
    confirmationEmail.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail')
        || 'no-reply@salesforce.com');

    Object.keys(userObject).forEach(function (key) {
        context.put(key, userObject[key]);
    });

    template = new Template('checkout/confirmation/accountRegisteredEmail');
    content = template.render(context).text;
    confirmationEmail.setContent(content, 'text/html', 'UTF-8');
    confirmationEmail.send();
}
```

Change to:

```javascript
function sendConfirmationEmail(registeredUser) {
    var HookMgr = require('dw/system/HookMgr');
    var Logger = require('dw/system/Logger');
    var context = new HashMap();
    var template;
    var content;

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        url: URLUtils.https('Login-Show')
    };

    Object.keys(userObject).forEach(function (key) {
        context.put(key, userObject[key]);
    });

    template = new Template('checkout/confirmation/accountRegisteredEmail');
    content = template.render(context).text;

    var hookID = 'app.mail.sendMail';
    if (HookMgr.hasHook(hookID)) {
        HookMgr.callHook(
            hookID,
            'sendMail',
            {
                communicationHookID: 'account.created',
                template: 'checkout/confirmation/accountRegisteredEmail',
                fromEmail: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                toEmail: userObject.email,
                subject: Resource.msg('email.subject.new.registration', 'registration', null),
                messageBody: content,
                params: context
            }
        );
    } else {
        Logger.error('No hook registered for {0}', hookID);
    }
}
```

Save and close the file.

**Open app_storefront_base/cartridge/templates/default/common/htmlHead.isml:**
At the end of the file, add:

```
<isscript>
    var hookHelper = require('int_handlerframework/cartridge/scripts/template/hookHelper');
    hookHelper.callHook('app.template.htmlHead', null, {pdict: pdict});
</isscript>
```

Save and close the file.


**Open app_storefront_base/cartridge/templates/default/common/scripts.isml:**
At the end of the file, add:

```
<isscript>
    var hookHelper = require('int_handlerframework/cartridge/scripts/template/hookHelper');
    hookHelper.callHook('app.template.afterFooter', null, {pdict: pdict});
</isscript>
```

Save and close the file.
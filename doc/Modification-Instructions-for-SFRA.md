# marketing-cloud-connector: SFRA Modification Instructions #
---
## Table of Contents

1. [Using the SFRA Overlay Cartridge](#Overlay)
2. [Manual Modifications to SFRA](#Manual)

--
<a name="Overlay"></a>
## Using the SFRA Overlay Cartridge

**Note:** These instructions are only relevant for Version 2.0.0 of the Marketing Cloud Connector, after the merging of [Pull Request 27](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/pull/27).  If you're using a previous release, use the [Manual Modifications to SFRA](#Manual).

With the release of the Marketing Cloud Connector version 2.0.0, a new cartridge is supplied called _plugin\_marketing\_cloud_.  This cartridge is intended to overlay the SFRA main cartridge (_app\_storefront\_base_) and replace the functionality with that needed to activate the Marketing Cloud Connector hooks.  Essentially, it contains all of the changes the Manual Modifications instructions advise you to make.  You will still need to import and configure all the metadata and custom objects as described below; you just won't have to manually cut and paste all the code from these instructions into your version of SFRA.

After loading up the _plugin\_marketing\_cloud_ cartridge, adjust your cartridge path to look like:
`plugin_marketing_cloud:app_storefront_base:int_marketing_cloud:int_handlerframework`

<a name="Manual"></a>
## Manual Modifications to SFRA

Release 1.0.1 (https://github.com/SalesforceCommerceCloud/handler-framework/tree/1.0.1)


### Modify the Following Files - Release 1.0.1

**Note**: The following line numbers are approximations, verify the content that you are modifying. 

#### app\_storefront\_base/cartridge/controllers/Account.js

1. Line 531: 

	Find:

	```javascript
	var formErrors = require('*/cartridge/scripts/formErrors');
	```

	Add:

	```javascript
	var Site = require('dw/system/Site');
	var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
	```

2. Line 585: 

	Find:
	
	```javascript
	delete formInfo.newPassword;
	delete formInfo.newPasswordConfirm;
	delete formInfo.profileForm;
	```

	Add:
	
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

3. Line 745: 

	Find:
	
	```javascript
	var objectForEmail = {
	                    firstName: resettingCustomer.profile.firstName,
	                    lastName: resettingCustomer.profile.lastName,
	                    url: url
	                };
	```

	Replace with:
	
	```javascript
	 var objectForEmail = {
	                    firstName: resettingCustomer.profile.firstName,
	                    lastName: resettingCustomer.profile.lastName,
	                    url: url,
	                    resettingCustomer:resettingCustomer
	                };
	```

4. Line 752: 

	Find:
	
	```javascript
	var emailObj = {
	                    to: email,
	                    subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
	                    from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
	                    type: emailHelpers.emailTypes.passwordReset
	                };
	```
	
	Replace with:
	
	```javascript
	var emailObj = {
	                    to: email,
	                    subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
	                    from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',         
	                    type: emailHelpers.emailTypes.passwordChanged
	                };
	```
5. Save and close the file.	
	
#### app_storefront_base/cartridge/scripts/helpers/accountHelpers.js

1. Line 89: 

	Find:
	
	```javascript
	var objectForEmail = {
	        passwordResetToken: passwordResetToken,
	        firstName: resettingCustomer.profile.firstName,
	        lastName: resettingCustomer.profile.lastName,
	        url: url
	    };
	```
	
	Replace with:
	
	```javascript
	var objectForEmail = {
	         passwordResetToken: passwordResetToken,
	         firstName: resettingCustomer.profile.firstName,
	         lastName: resettingCustomer.profile.lastName,
	         url: url,
	         resettingCustomer: resettingCustomer
	    };
	```

2. Line 96: 

	Find:
	
	```javascript
	var emailObj = {
	        to: email,
	        subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
	        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
	        type: emailHelpers.emailTypes.passwordChanged
	    };
	```
	
	Replace with:
	
	```javascript
	var emailObj = {
	        to: email,
	        subject: Resource.msg('subject.profile.resetpassword.email', 'login', null),
	        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
	        type: emailHelpers.emailTypes.passwordReset
	    };
	```

3. Save and close the file.

### Modify the Following Files - Previous Releases

#### app\_storefront\_base/cartridge/controllers/Account.js

1. Line 90: 

	Find:
	
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

2. Line 372: 

	Find:
	
	```javascript
	    function (req, res, next) {
	        var Transaction = require('dw/system/Transaction');
	        var CustomerMgr = require('dw/customer/CustomerMgr');
	        var Resource = require('dw/web/Resource');
	        var URLUtils = require('dw/web/URLUtils');
	```
	
	Add:
	
	```javascript
	        var HookMgr = require('dw/system/HookMgr');
	```

3. Line 442: 

	Find:
	
	```javascript
	                    delete formInfo.profileForm;
	                    delete formInfo.email;
	```
	
	Add:
	
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

4. Line 690: 

	Find:
	
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

5. Save and close the file.

#### app\_storefront\_base/cartridge/scripts/checkout/checkoutHelpers.js####

1. Line 7: 

	Find:
	
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

2. Line 529: 

	Find:
	
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

3. Save and close the file.

#### app\_storefront\_base/cartridge/scripts/order/orderHelpers.js:

1. Line 3: 

	Find:
	
	```javascript
	var HashMap = require('dw/util/HashMap');
	var Mail = require('dw/net/Mail');
	```
	
	Change to:
	
	```javascript
	var HashMap = require('dw/util/HashMap');
	```

2. Line 109: 

	Find:
	
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

3. Save and close the file.

#### app\_storefront\_base/cartridge/templates/default/common/htmlHead.isml####

1. At the end of the file, add:
	
	```
	<isscript>
	    var hookHelper = require('int_handlerframework/cartridge/scripts/template/hookHelper');
	    hookHelper.callHook('app.template.htmlHead', null, {pdict: pdict});
	</isscript>
	```

2. Save and close the file.


#### app\_storefront\_base/cartridge/templates/default/common/scripts.isml####

1. At the end of the file, add:

	```
	<isscript>
	    var hookHelper = require('int_handlerframework/cartridge/scripts/template/hookHelper');
	    hookHelper.callHook('app.template.afterFooter', null, {pdict: pdict});
	</isscript>
	```

2. Save and close the file.
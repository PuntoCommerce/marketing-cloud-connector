# marketing-cloud-connector: SiteGenesis Modification Instructions #
---
## Table of Contents

1. [Clone or Pull From Community SiteGenesis](#Clone)
2. [Manual Modifications to SiteGenesis](#Manual)

--

<a name="Clone"></a>
## Clone or Pull from Community SiteGenesis 

The official Javascript Controller based SiteGenesis repository is in maintenance-only mode while a new Mobile First Reference Architecture is in development. A community-supported fork of SiteGenesis has been established ([Community Site Genesis](https://www.google.com/url?q=https://github.com/SalesforceCommerceCloud/community-sitegenesis)), allowing the community to continue enhancing and extending SiteGenesis.

For detailed information on the SiteGenesis JavaScript Controller, review the existing [Commerce Cloud Documentation](https://documentation.demandware.com/DOC1/topic/com.demandware.dochelp/SGJC/SiteGenesisSetup.html?cp=0_4_13).

1. Update SiteGenesis:
    1. For a fresh install of SiteGenesis, clone the Community Site Genesis repository.
    2. For an existing project that is based on the SiteGenesis git repository (and has the git history intact), add the Community Site Genesis as a new git remote, and pull or merge in the community changes.
    
2. Open the file `app_storefront_controllers/cartridge/scripts/hooks.json`, and delete: 

    ```:::javascript
        {
            "name": "app.mail.sendMail",
            "script": "./mail/mailHook"
        },
	```
  

If your project cannot take advantage of Community SiteGenesis for some reason, review the Manual Modifications to SiteGenesis Cartridge.

<a name="Manual"></a>
## Manual Modifications to SiteGenesis Cartridge ##

###Modify the Following Files###

**Note**: The following line numbers are approximations, verify the content that you are modifying. 

#### app\_storefront\_controllers/cartridge/controllers/Account.js ####

1. At line 11: 

	Find:

	```javascript
	var Resource = require('dw/web/Resource');
	var URLUtils = require('dw/web/URLUtils');
	var Form = require('~/cartridge/scripts/models/FormModel');
	var OrderMgr = require('dw/order/OrderMgr');
	```
	
	Change to:
	
	```javascript
	var Resource = require('dw/web/Resource');
	var URLUtils = require('dw/web/URLUtils');
	var Form = require('~/cartridge/scripts/models/FormModel');
	var HookMgr = require('dw/system/HookMgr');
	var OrderMgr = require('dw/order/OrderMgr');
	```

2. Line 78: 
	
	Find:
	
	```javascript
	        confirm: function () {
	            var isProfileUpdateValid = true;
	            var hasEditSucceeded = false;
	            var Customer = app.getModel('Customer');
	```
	
	Add:
	
	```javascript
	            var Email = app.getModel('Email');
	```
	
3. Line 108:

	 Find:
	
	```javascript
	            }
	
	            if (isProfileUpdateValid && hasEditSucceeded) {
	```
	
	Add:
	
	```javascript
	                var accountUpdatedMail = Email.get('mail/accountupdatedemail', customer.profile.email);
	                accountUpdatedMail.setSubject(Resource.msg('account.updatedemail.subject', 'account', null));
	                accountUpdatedMail.send({
	                    Customer: customer
	                });
	
	```

4. Line 120:
	
	Find:
	
	```javascript
	        changepassword: function () {
	            var isProfileUpdateValid = true;
	            var hasEditSucceeded = false;
	            var Customer = app.getModel('Customer');
	```
	
	Add:
	
	```javascript
	            var Email = app.getModel('Email');
	```
	
5. Line 146: 

	Find:
	
	```javascript
	            }
	
	            if (isProfileUpdateValid && hasEditSucceeded) {
	```
	
	Add:
	
	```javascript
	                var passwordChangedMail = Email.get('mail/passwordchangedemail', customer.profile.email);
	                passwordChangedMail.setSubject(Resource.msg('account.passwordchangedemail.subject', 'account', null));
	                passwordChangedMail.send({
	                    Customer: customer
	                });
	
	```

6. Line 323: 
	
	Find:
	
	```javascript
	                    passwordChangedMail.setSubject(Resource.msg('resource.passwordassistance', 'email', null));
	```
	
	Change to:
	
	```javascript
	                    passwordChangedMail.setSubject(Resource.msg('account.passwordchangedemail.subject', 'account', null));
	```

7. Line 362:

	Find (within `registrationForm` function):
	
	```javascript
	            var email, emailConfirmation, orderNo, profileValidation, password, passwordConfirmation, existingCustomer, Customer, target;
	```
	
	Change to:
	
	```javascript
	            var email, emailConfirmation, orderNo, profileValidation, password, passwordConfirmation, existingCustomer, Customer, target, Email;
	```
	
8. Line 364: 
	
	Find:
	
	```javascript
	            Customer = app.getModel('Customer');
	```
	
	Add:
	
	```javascript
	            Email = app.getModel('Email');
	```

9. Line 394:

	Find:
	
	```javascript
	                if (orderNo) {
	```
	
	Change to:
	
	```javascript
	                if (profileValidation && orderNo) {
	```
	
10. Line 430:

	Find:
	
	```javascript
	                    ContinueURL: URLUtils.https('Account-RegistrationForm')
	                }).render('account/user/registration');
	            } else {
	                app.getForm('profile').clear();
	```
	
	Change to:
	
	```javascript
	                    ContinueURL: URLUtils.https('Account-RegistrationForm')
	                }).render('account/user/registration');
	            } else {
	                if (app.getForm('profile.customer.addtoemaillist').checked) {
	                    var hookID = 'app.mailingList.subscribe';
	                    if (HookMgr.hasHook(hookID)) {
	                        HookMgr.callHook(
	                            hookID,
	                            'subscribe',
	                            {
	                                email: email
	                            }
	                        );
	                    }
	                }
	
	                app.getForm('profile').clear();
	
	                var accountCreatedMail = Email.get('mail/accountcreatedemail', email);
	                accountCreatedMail.setSubject(Resource.msg('account.createdemail.subject', 'account', null));
	                accountCreatedMail.send({
	                    Customer: profileValidation
	                });
	```
	
11. Save and close the file.

#### app\_storefront\_controllers/cartridge/controllers/CustomerService.js ####

1. Line 50: 

	Find:
	
	```javascript
	            return Email.get('mail/contactus', formgroup.email.value)
	```
	
	Replace with:
	
	```javascript
	            return Email.get(
	                'mail/contactus',
	                require('dw/system/Site').current.getCustomPreferenceValue('customerServiceEmail')
	            )
	```
2. Save and close the file.

#### app\_storefront\_controllers/cartridge/scripts/models/EmailModel.js ####

1. Line 9: 

	Find:
	
	```javascript
	var AbstractModel = require('./AbstractModel');
	var Mail = require('dw/net/Mail');
	var Site = require('dw/system/Site');
	var Template = require('dw/util/Template');
	```
	
	Replace with:
	
	```javascript
	var AbstractModel = require('./AbstractModel');
	var HookMgr = require('dw/system/HookMgr');
	var Logger = require('dw/system/Logger');
	var Site = require('dw/system/Site');
	var Status = require('dw/system/Status');
	var Template = require('dw/util/Template');
	```

2. Line 32: 

	Find:
	
	```javascript
	var EmailModel = AbstractModel.extend({
	    template: null,
	```
	
	Add:
	
	```javascript
	    subject: '',
	    from: '',
	    to: null,
	```

3. Line 39: 

	Find:
	
	```javascript
	        this._super(new Mail());
	        this.template = template;
	```
	
	Replace with:
	
	```javascript
	        // Ensure class variables are reinstantiated, otherwise values can carry across "new" instances
	        this.template = template;
	        this.subject = '';
	        this.from = '';
	        this.to = [];
	```
	
4. Line 42: 

	Find:
	
	```javascript
	        var mail = this.object;
	        mail.addTo(recipient);
	        mail.setFrom(Site.getCurrent().getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
	```
	
	Replace with:
	
	```javascript
	        this.addTo(recipient);
	        this.setFrom(Site.getCurrent().getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
	    },
	
	    addTo: function(to) {
	        this.to.push(to);
	        return this;
	    },
	
	    setFrom: function(from) {
	        this.from = from;
	        return this;
	    },
	
	    setSubject: function(subject) {
	        this.subject = subject;
	        return this;
	```
	
5. Line 88: 

	Find:
	
	```javascript
	        this.object.setContent(params.MainContent, 'text/html', 'UTF-8');
	        return this.object.send();
	```
	
	Replace with:
	
	```javascript
	        var result;
	        var hookID = 'app.mail.sendMail';
	        if (HookMgr.hasHook(hookID)) {
	            // expects a Status object returned from the hook call
	            result = HookMgr.callHook(
	                hookID,
	                'sendMail',
	                {
	                    template: this.template,
	                    fromEmail: this.from,
	                    toEmail: this.to,
	                    subject: this.subject,
	                    messageBody: params.MainContent,
	                    params: params
	                }
	            );
	        } else {
	            Logger.error('No hook registered for {0}', hookID);
	            result = new Status(Status.ERROR);
	        }
	        return result;
	```
	
6. Line 155: 

	Find:
	
	```javascript
	    var mail = new Mail();
	    mail.addTo(options.recipient);
	    mail.setSubject(options.subject);
	    mail.setFrom(options.from || Site.getCurrent().getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
	    var context = require('~/cartridge/scripts/object').toHashMap(options.context);
	    context.CurrentForms = session.forms;
	    context.CurrentHttpParameterMap = request.httpParameterMap;
	    context.CurrentCustomer = customer;
	    var template = new Template(options.template);
	    var content = template.render(context).text;
	    mail.setContent(content, 'text/html', 'UTF-8');
	    return mail.send();
	```
	
	Replace with:
	
	```javascript
	    var mail = new EmailModel(options.template, options.recipient);
	    mail.setSubject(options.subject);
	    if (options.from) mail.setFrom(options.from);
	    return mail.send(options.context);
	```

7. Save and close the file.
	

#### app\_storefront\_controllers/cartridge/scripts/models/OrderModel.js ####

1. Line 9: 

	Find:
	
	```javascript
	var AbstractModel = require('./AbstractModel');
	var Order = require('dw/order/Order');
	var OrderMgr = require('dw/order/OrderMgr');
	var Resource = require('dw/web/Resource');
	var Status = require('dw/system/Status');
	var Transaction = require('dw/system/Transaction');
	```
	
	Replace with:
	
	```javascript
	var AbstractModel = require('./AbstractModel');
	var HookMgr = require('dw/system/HookMgr');
	var Order = require('dw/order/Order');
	var OrderMgr = require('dw/order/OrderMgr');
	var Resource = require('dw/web/Resource');
	var Status = require('dw/system/Status');
	var Transaction = require('dw/system/Transaction');
	```
	
2. Line 88: 
	
	Find:
	
	```javascript
	    Email.sendMail({
	        template: 'mail/orderconfirmation',
	        recipient: order.getCustomerEmail(),
	        subject: Resource.msg('order.orderconfirmation-email.001', 'order', null),
	        context: {
	            Order: order
	        }
	    });
	```
	
	Add:
	
	```javascript
	
	    if (session.forms.billing.billingAddress.addToEmailList.checked) {
	        var hookID = 'app.mailingList.subscribe';
	        if (HookMgr.hasHook(hookID)) {
	            HookMgr.callHook(
	                hookID,
	                'subscribe',
	                {
	                    email: order.getCustomerEmail(),
	                    Order: order
	                }
	            );
	        }
	    }
	```

3. Save and close the file.
	
	
#### app\_storefront\_controllers/cartridge/scripts/request/OnRequest.js ####

1. Line 16:

	Find:

	```javascript
	exports.onRequest = function () {
	    return new Status(Status.OK);
	};
	```
	
	Replace with:
	
	```javascript
	exports.onRequest = function () {
	    // only return a value if anything is done here, otherwise it may block other onRequest hooks from executing
	    //return new Status(Status.OK);
	};
	```
2. Save and close the file.

####app\_storefront\_core/cartridge/templates/default/checkout/cart/minicart.isml####

1. Line 12: 

	Find:
	
	```
	 <isinclude template="util/reporting/ReportBasket.isml"/>
	```
	
	Add:
	
	```
	<isscript>
	    var format = pdict.CurrentHttpParameterMap.format.stringValue;
	    if (format === 'ajax') {
	        var hookHelper = require('app_storefront_controllers/cartridge/scripts/template/hookHelper');
	        hookHelper.callHook('app.template.ajaxPartial', null, {pdict: pdict});
	    }
	</isscript>
	```
2. Save and close the file.

#### app\_storefront\_core/cartridge/templates/default/checkout/cart/refreshcart.isml ####

1. Line 6: 

	Find:
	
	```
	</iscomment>
	```
	
	Add:
	
	```
	<isscript>
	    var hookHelper = require('app_storefront_controllers/cartridge/scripts/template/hookHelper');
	    hookHelper.callHook('app.template.ajaxPartial', null, {pdict: pdict});
	</isscript>
	```
2. Save and close the file.

#### app\_storefront\_core/cartridge/templates/default/components/footer/footer_UI.isml ####

1. Line 33: 

	Find:
	
	```
	var keywords = "${pdict.CurrentPageMetaData.keywords}";
	</script>
	```
	
	Add:
	
	```
	
	<isscript>
	    var hookHelper = require('app_storefront_controllers/cartridge/scripts/template/hookHelper');
	    hookHelper.callHook('app.template.afterFooter', null, {pdict: pdict});
	</isscript>
	```
2. Save and close the file.	

#### app\_storefront\_core/cartridge/templates/default/components/header/htmlhead.isml ####

1. Line 76:

	Find:

	```
	<isinclude url="${URLUtils.url('Home-SetLayout')}"/>
	```
	
	Add:
	
	```
	
	<isscript>
	    var hookHelper = require('app_storefront_controllers/cartridge/scripts/template/hookHelper');
	    hookHelper.callHook('app.template.htmlHead', null, {pdict: pdict});
	</isscript>
	```
2. Save and close the file.

#### app\_storefront\_core/cartridge/templates/default/util/pt_empty.isml ####

1. Line 76:

	Find:
	
	```
	</iscomment>
	```
	
	Add:
	
	```
	<isscript>
	    var format = pdict.CurrentHttpParameterMap.format.stringValue;
	    if (format === 'ajax') {
	        var hookHelper = require('app_storefront_controllers/cartridge/scripts/template/hookHelper');
	        hookHelper.callHook('app.template.ajaxPartial', null, {pdict: pdict});
	    }
	</isscript>
	```
2. Save and close the file.


#### app\_storefront\_core/cartridge/templates/resources/account.properties ####

1. Line 176: 

	Find:

	```
	account.orderstatusinclude.orderprocessed=Being Processed
	account.orderstatusinclude.ordercanceled=Canceled
	account.orderstatusinclude.ordercontact=Please contact Customer Support:
	```

	Add:

	```
	
	##############################################
	# ISML Directory: mail/
	##############################################
	account.createdemail.subject=Your New Account
	account.createdemail.dear=Dear
	account.createdemail.message1=You have successfully created a new account.
	account.createdemail.message2=You can visit your account at
	account.createdemail.message3=This is an automatically generated email, please do not reply.
	
	account.updatedemail.subject=Your Account
	account.updatedemail.dear=Dear
	account.updatedemail.message1=You have successfully updated your account.
	account.updatedemail.message2=You can visit your account at
	account.updatedemail.message3=This is an automatically generated email, please do not reply.
	```

#### app\_storefront\_controllers/cartridge/scripts/hooks.json ####

1. Find, and delete this entry, if it exists:

	```javascript
	        {
	            "name": "app.mail.sendMail",
	            "script": "./mail/mailHook"
	        },
	```

2. Find:
	
	```javascript
	        },
	        {
	            "name": "app.template.afterFooter",
	            "script": "./template/footer"
	        }
	```

	Replace with:
	
	```javascript
	        }
	```

3. Find:
	
	```javascript
	        }
	    ]
	}
	```

	Replace with:

	```javascript
	        },
	        {
	            "name": "app.template.afterFooter",
	            "script": "./template/templateHooks"
	        }
	    ]
	}
	```





### Create the Following New Files ###

The code samples below need to be created as new files. 

### app\_storefront\_controllers/cartridge/scripts/mail/mailHook.js ###

```javascript
'use strict';

var ArrayList = require('dw/util/ArrayList');
var Mail = require('dw/net/Mail');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {dw/util/HashMap|dw.util.HashMap} params Object containing additional parameters for usage by the hook
 * @property {dw/web/Forms|dw.web.Forms} params.CurrentForms The forms available in current session
 * @property {dw/web/HttpParameterMap|dw.web.HttpParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw/customer/Customer|dw.customer.Customer} params.CurrentCustomer The current customer
 */

/**
 * Hook for mail send action
 * @param {CustomerNotification} args
 * @returns {dw/system/Status|dw.system.Status}
 */
function sendMail(args) {
    var email = new Mail();
    if (Array.isArray(args.toEmail)) {
        email.setTo(new ArrayList(args.toEmail));
    } else {
        email.addTo(args.toEmail);
    }
    email.setFrom(args.fromEmail);
    email.setSubject(args.subject);
    email.setContent(args.messageBody, 'text/html', 'UTF-8');
    return email.send();
}

exports.sendMail = sendMail;
```

### app\_storefront\_controllers/cartridge/scripts/template/hookHelper.js ###

```javascript
'use strict';

var HookMgr = require('dw/system/HookMgr');
var Logger = require('dw/system/Logger');

function stringifyError(key, value) {
    if (value instanceof Error) {
        var error = {};
        Object.getOwnPropertyNames(value).forEach(function (k) {
            error[k] = value[k];
        });
        return error;
    }

    return value;
}

/**
 * @param {string} hookname Registered hook
 * @param {string} [hookfunction] Optional hook function, if empty, function is deduced from hookname
 * @param {Object} [params] Optional params object to pass to the called hook
 */
function callHook(hookname, hookfunction, params) {
    if (hookname) {
        if (empty(hookfunction)) {
            hookfunction = hookname.slice(hookname.lastIndexOf('.') + 1);
        }
        if (HookMgr.hasHook(hookname)) {
            try {
                HookMgr.callHook(
                    hookname,
                    hookfunction,
                    params || {}
                );
            } catch (e) {
                Logger.error(
                    'Exception thrown while executing template hooks. Hook: {0} ;; Function: {1} ;; Error: {2}',
                    hookname,
                    hookfunction,
                    JSON.stringify(e, stringifyError, 4)
                );
            }
        }
    }
}

exports.stringifyError = stringifyError;
exports.callHook = callHook;
```

### app_storefront_controllers/cartridge/scripts/template/templateHooks.js ###

```javascript
'use strict';

var ISML = require('dw/template/ISML');
var Logger = require('dw/system/Logger');

/**
 * Example template-based hook
 * Should be executed in page head
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.htmlHead hook.
 * @param {Object} params Parameters from the template
 */
function htmlHead(params) {
    // see example implementation in afterFooter
}

/**
 * Example template-based hook
 * Should be executed after page footer
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.afterFooter hook.
 * @param {Object} params Parameters from the template
 */
function afterFooter(params) {
    // NOTE: Template naming is still important, ensure your template is unique
    // Otherwise, an unexpected template may be rendered based on cartridge path
    var templateName = 'hooks/afterFooter';
    try {
        ISML.renderTemplate(templateName, params);
        // Another option is to render using Velocity templates
        /*
         var velocity = require('dw/template/Velocity');
         params.message = params.message || 'world';
         velocity.render('Hello $message', params);
         */
    } catch (e) {
        Logger.error('Error while rendering template ' + templateName);
    }
}

/**
 * Example template-based hook
 * Should be executed when responding to an ajax request (only recommended when the returned result is HTML, rather than JSON response).
 * Renders a template result. No value return is expected.
 * Platform hook execution results in all registered hooks being executed, regardless of any return value.
 * For this to execute, a cartridge's hooks.json must register app.template.ajaxPartial hook.
 * @param {Object} params Parameters from the template
 */
function ajaxPartial(params) {
    // see example implementation in afterFooter
}

exports.htmlHead = htmlHead;
exports.afterFooter = afterFooter;
exports.ajaxPartial = ajaxPartial;
```

### app\_storefront\_core/cartridge/templates/default/hooks/afterFooter.isml ###

```
<!--- TEMPLATENAME: hooks/afterFooter.isml --->
<iscontent compact="true"/>
<!-- hooks/afterFooter is successfully loaded -->
```

### app\_storefront\_core/cartridge/templates/default/mail/accountcreatedemail.isml ###

```
<iscontent type="text/html" charset="UTF-8" compact="true"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<subject><isif condition="${!empty(pdict.MailSubject)}">${pdict.MailSubject}<iselse/>${Resource.msg('account.createdemail.subject','account',null)}</isif></subject>
<html>
<head>
<title>${Resource.msg('account.createdemail.subject','account',null)}</title>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table  style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">${Resource.msg('account.createdemail.dear','account',null)}&nbsp;<isprint value="${pdict.Customer.profile.firstName}"/>&nbsp;<isprint value="${pdict.Customer.profile.lastName}"/>,</p>

                            <p>${Resource.msg('account.createdemail.message1','account',null)}</p>

                            <p>${Resource.msg('account.createdemail.message2','account',null)} <a href="${URLUtils.https('Account-Show')}">${URLUtils.https('Account-Show')}</a>.</p>

                            <p>${Resource.msg('account.createdemail.message3','account',null)}</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>


</body>
</html>
```

### app\_storefront\_core/cartridge/templates/default/mail/accountupdatedemail.isml ###

```
<iscontent type="text/html" charset="UTF-8" compact="true"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<subject><isif condition="${!empty(pdict.MailSubject)}">${pdict.MailSubject}<iselse/>${Resource.msg('account.updatedemail.subject','account',null)}</isif></subject>
<html>
<head>
<title>${Resource.msg('account.updatedemail.subject','account',null)}</title>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="background:#e0e0e0;padding:50px 0;">
            <center>
                <table  style="background:#ffffff;border:1px solid #999999;width:680px;">
                    <tr>
                        <td style="font-size:12px;font-family:arial;padding:20px 10px;vertical-align:top;">

                            <p style="font-family:georgia;font-size:20px;">${Resource.msg('account.updatedemail.dear','account',null)}&nbsp;<isprint value="${pdict.Customer.profile.firstName}"/>&nbsp;<isprint value="${pdict.Customer.profile.lastName}"/>,</p>

                            <p>${Resource.msg('account.updatedemail.message1','account',null)}</p>

                            <p>${Resource.msg('account.updatedemail.message2','account',null)} <a href="${URLUtils.https('Account-Show')}">${URLUtils.https('Account-Show')}</a>.</p>

                            <p>${Resource.msg('account.updatedemail.message3','account',null)}</p>

                        </td>
                    </tr>
                </table>
            </center>
        </td>
    </tr>
</table>


</body>
</html>
```

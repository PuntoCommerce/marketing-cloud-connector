SFRA (Storefront Reference Architecture) support is a work-in-progress. Below are notes related to the SFRA-support effort.

## Differences from SiteGenesis implementation ##

### Triggered Sends ###
- Contact Us doesn't exist in SFRA
- Account Created/Registered email only implemented for registration during checkout, but not standalone account registration from Login page ([created SFRA issue for this difference](https://github.com/SalesforceCommerceCloud/storefront-reference-architecture/issues/72))
- Account Updated email not implemented in SFRA
- Account Locked email not implemented in SFRA
- E-Gift Certificate recipient email not implemented in SFRA

### Subscription Management ###
- Subscribe checkbox supported for Account Profile, but not for Checkout as SFRA doesn't provide a subscribe checkbox in checkout

## Analytics ##
- SFRA uses JSON for partial responses (AJAX requests), rather than template partials. This prevents the server-side injection of tracking data. If tracking is needed for AJAX requests, it needs to be implemented client-side, or with a combination of client-side plus server-side JSON interception.
- SFRA doesn't yet support Wishlist, which means no wishlist tracking either.
- SFRA doesn't yet support Gift Registries, which means no registry tracking either.
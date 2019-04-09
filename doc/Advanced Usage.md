# marketing-cloud-connector: Advanced Usage and Configuration  #
---
###### - Done? Go Back to the [readMe.md](README.md)
**What is the marketing-cloud-connector?**   
A [Salesforce Labs](https://twitter.com/salesforce_labs?lang=en) project that facilitates an "above the API" integration between Salesforce B2C Commerce and Marketing Clouds.

---

This page contains details around advanced usage of Marketing Cloud Connector cartridge.

## Data Export Mapping

Within the `MarketingCloudDataExport` custom object, the `Export Attributes` field contains a JSON object that maps fields to export values. The map key is where the feed output value should be retrieved from. The map value can be a string (the column name to map the value into), an object (which is detailed below), or an array of strings and objects, which allows you to map one value into multiple columns.

### Map Key Reference

The map key should reflect the path to a value in the feed data record that is being output.

#### Catalog Data Object


```
#!javascript

{
    Product: product, // instance of dw.catalog.Product or one of its subclasses
    DefaultProduct: defaultProduct, // master, variation group, default variant, or empty
    ProductLink: require('dw/web/URLUtils').abs('Product-Show', 'pid', product.ID).https(), // instance of dw.web.URL, that is output as a string
    ImageLink: imageLink, // function that returns an image link as string. Required param: imageType
    Images: images, // function that returns a collection/array of image link strings. Required param: imageType
    StandardPrice: standardPrice // function that returns inherited pricebook price, to reflect original price before a markdown. Returns empty if no price available (such as for master products, typically)
}
```


#### Content Data Object


```
#!javascript

{
    Content: content, // instance of dw.content.Content
    ContentLink: require('dw/web/URLUtils').abs('Page-Show','cid', content.getID()) // instance of dw.web.URL, that is output as a string
}
```


#### Customer Data Object


```
#!javascript

{
    Customer: profile.getCustomer(), // instance of dw.customer.Customer
    Profile: profile // instance of dw.customer.Profile
}
```


#### Order Data Object


```
#!javascript

{
    Order: order, // instance of dw.order.Order
    orderAsXML: helpers.stripXmlNS( order.getOrderExportXML(null, null, false) ) // XML string export of the order
}
```


### Map Value Object Reference

The map value, as an object, may have the following properties:

- **fallback**: Specify the map key to use as a fallback when no value found for the primary-mapping.
    - type: string
- **format**: Calls `dw.util.StringUtils.format()`, passing in the provided format and the mapped value result.
    - type: string
- **required**: Specifies whether the field is required. If a required field is missing, the record is skipped.
    - type: boolean
- **type**: Allows for some basic type conversion/handling.
    - type: string
    - possible values:
        - "bool": outputs truthy value as "Y", else "N"
        - "array": output a collection
            - **mappedValue**: Required parameter. If a string, it returns a simple array of values where the string is a path to a value within each collection record. If an object, the format expected is the same format used by the entire map object definition (so treat it as if you are mapping a data feed).
                - type: string|object
                - required: true
            - **concat**: Optional parameter. If true, resulting array is output as a string of values concatenated with a comma. If this value is being sent to Marketing Cloud as-is, it's recommended to always set this param to true when outputting an array or collection.
                - type: boolean


### Example Data Mapping


```
#!javascript

{
    "SiteID": "SiteID",
    "Product.ID": ["ProductID", {"label":"ProductCode", "required":true}],
    "Product.masterProduct.ID": "MasterID",
    "Product.master": {"label":"IsMaster", "required":true, "type":"bool"},
    "Product.variant": {"label":"IsVariant", "required":true, "type":"bool"},
    "Product.name": {"label":"ProductName", "required":true},
    "Product.primaryCategory.ID": {"label":"ProductType", "required":true, "fallback": "DefaultProduct.primaryCategory.ID"},
    "ProductLink": {"label":"ProductLink", "required":true},
    "Product.onlineFlag": {"label":"OnlineAvailability", "required":true, "type":"bool"},
    "Product.manufacturerSKU": "SkuID",
    "ImageLink": {"label":"ImageLink", "imageType":"large"},
    "Images": {"label":"LargeImages", "imageType":"large", "type": "array", "concat": true},
    "StandardPrice": {"label":"RegularPrice", "fallback": "Product.priceModel.price.decimalValue"},
    "Product.priceModel.price.decimalValue": {"label":"SalePrice", "fallback": "DefaultProduct.priceModel.price.decimalValue"},
    "Product.shortDescription": "Description"
}
```
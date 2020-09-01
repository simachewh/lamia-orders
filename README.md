# Orders API

A simple api to place orders that responds with an invoice for the order

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run devServer
```

## API Description

The api is accesible at `host/api/orders`.
Make a `Post`request to creatte orders.

An example of the body in a post request looks like below

```json
{
    "products" : [
        {
        "name": "milk",
        "quantity": 4
        },
        {
            "name": "shoes1",
            "quantity": 3
        },
        {
            "name": "shoes2",
            "quantity": 2
        }],
    "country": "finland",
    "invoiceFormat" : "html",
    "emailInvoice": true,
    "email" : "janedoe@gmail.com"
}

```

A list of orders is available at `GET /orders`

### Demo

A demo deploy is available [here](https://lamia-orders.herokuapp.com/api/orders)

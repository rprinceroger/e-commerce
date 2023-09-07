# E-COMMERCE API DOCUMENTATION

***USED `POSTMAN` / `RESTMAN` TO TEST THE API***
- Here's the [POSTMAN](https://www.postman.com/downloads/) download link. 
- Here's the [RESTMAN](https://chrome.google.com/webstore/detail/restman/ihgpcfpkpmdcghlnaofdmjkoemnlijdi) download link.

## TEST ACCOUNTS:
***Regular User:***
   - email:
```
user@mail.com
```
   - passwordd: 
```
user123
```
   - userId:
```
64df3f54801d1c3b9099f6f4
```
  - Note: You might need to get a new bearer token after log-in.


***Admin User:***
   - email:
```
admin@mail.com
```
   - password:
```   
admin123
```
   - userId:
```
64df3f37801d1c3b9099f6f2
```
   - Note: You might need to get a new bearer token after log-in.

## SAMPLE PRODUCTS:
- Zebra GK420d
   - productId:
```
64df4ab8801d1c3b9099f6fd
```
   - isActive: false (Discontinued)
     
- Zebra ZD421
   - productId:
```
64df4c5d801d1c3b9099f702
```
   - isActive: true (Active)

## ROUTES:
- Registration (POST)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/users/register
```
- request body: 
  - email (string)
  - password (string)

- Authentication (POST)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/users/login
```
   - request body: 
     - email (string)
     - password (string)

- Create Product (Admin only) (POST)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products
```
   - request body: 
     - name (string)
     - description (string)
     - price (number)
   - authentication: 
     - bearer token required

- Retrieve all products (GET)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products/all
```

- Retrieve all active products (GET)
```
http://localhost:4000/products
```

- Retrieve single product (GET)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products/(productId)
```
   - NOTE: insert your productId to be routed accordingly.

- Update Product information (Admin only) (PUT)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products/(productId)
```
   - NOTE: insert your productId to be routed accordingly.
    - request body:
        - name (string)
        - description (string)
        - price (number)
    - authentication: 
    	- bearer token required

- Archive Product (Admin only) (PUT)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products/(productId)/archive
```
   - NOTE: insert your productId to be routed accordingly.
    - authentication: 
    	- bearer token required

- Activate Product (Admin only) (PUT)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/products/(productId)
```
   - NOTE: insert your productId to be routed accordingly.
    - authentication: 
    	- bearer token required

- Non-admin User checkout (Create Order) (POST)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/orders/checkout
```
   - request body:
     - productId (string)
     - authentication: 
    	- bearer token required

- Retrieve User Details (POST)
```
https://cpstn2-ecommerceapi-robielos.onrender.com/users/details
```
   - authentication: 
     - bearer token required


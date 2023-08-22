## E-COMMERCE API DOCUMENTATION

***TEST ACCOUNTS:***
- Regular User:
    - email: user@mail.com
    - pwd: user123
    - userId: 64df3f54801d1c3b9099f6f4
    - Note: You might need to get a new bearer token after log-in.

- Admin User:
    - email: admin@mail.com
    - pwd: admin123
    - userId: 64df3f37801d1c3b9099f6f2
	- Note: You might need to get a new bearer token after log-in.

***SAMPLE PRODUCTS***
- Zebra GK420d
	- productId: 64df4ab8801d1c3b9099f6fd
    - isActive: false (Discontinued)
     
- Zebra ZD421
	- productId: 64df4c5d801d1c3b9099f702
    - isActive: true (Active)

***ROUTES:***
- Registration (POST)
	- http://localhost:4000/users/register
    - request body: 
        - email (string)
        - password (string)

- Authentication (POST)
	- http://localhost:4000/users/login
    - request body: 
        - email (string)
        - password (string)

- Create Product (Admin only) (POST)
	- http://localhost:4000/products
    - request body: 
        - name (string)
        - description (string)
        - price (number)
    - authentication: 
    	- bearer token required

- Retrieve all products (GET)
	- http://localhost:4000/products/all

- Retrieve all active products (GET)
	- http://localhost:4000/products

- Retrieve single product (GET)
	- http://localhost:4000/products/(productId)
	- NOTE: insert your productId to be routed accordingly.

- Update Product information (Admin only) (PUT)
	- http://localhost:4000/products/(productId)
	- NOTE: insert your productId to be routed accordingly.
    - request body:
        - name (string)
        - description (string)
        - price (number)
    - authentication: 
    	- bearer token required

- Archive Product (Admin only) (PUT)
	- http://localhost:4000/products/(productId)/archive
	- NOTE: insert your productId to be routed accordingly.
    - authentication: 
    	- bearer token required

- Activate Product (Admin only) (PUT)
	- http://localhost:4000/products/(productId)
	- NOTE: insert your productId to be routed accordingly.
    - authentication: 
    	- bearer token required

- Non-admin User checkout (Create Order) (POST)
	- http://localhost:4000/orders/checkout
    - request body:
    	- productId (string)
    - authentication: 
    	- bearer token required

- Retrieve User Details (POST)
	- http://localhost:4000/users/details
    - authentication: 
    	- bearer token required


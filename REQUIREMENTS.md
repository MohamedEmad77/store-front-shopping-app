# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)



RESTful routes : 
----------------
1- user Route :
    
    a- SHOW route: 'users/:id' [GET] [token required]
    b- INDEX route: 'users/' [GET] [token required]
    c- CREATE route: 'users/' [POST]
    d- SIGNIN route: 'users/signin' [POST]
  

2- product Route :
    
    a- SHOW route: 'products/:id' [GET]
    b- INDEX route: 'products/' [GET] 
    c- CREATE route: 'products/' [POST] [token required]


3- order Route :
    
    a- get order by user details route: 'orders/users/:id' [GET] [token required]
    b- add product to order route: 'orders/:id/products' [POST] [token required]
    b- INDEX route: 'orders/' [GET] [token required]
    c- SHOW route: 'orders/:id' [GET] [token required]

-------------------------------------------------------------------------------------------------------
DATABASE Tables :
------------------
Table: users (id:primary key, firstname:varchar, lastname:varchar, email:varchar, password:varchar publisher_id:string[foreign key to publishers table])

Table: products (id:primary key, name:varchar, price:number)

Table: orders (id:primary key, status:varchar, user_id:string[foreign key to users table])

Table: orders (id:primary key,  order_id:string[foreign key to orders table], product_id:string[foreign key to products table], quantity: number)

----------------------------------------------------------------------------------------------------------------











# The Shopping Page

This is a small shopping page app with React, Apollo GraphQL, and Node.

This is **not** a production ready app. It just fulfills the following requirements.

## Frontend

React app with

- a header that has a logo, hard coded user name and avatar, and a *Cart* button,
- a sidebar with three categories - vegetables, fruits, and cheese and the ability to fetch products for each of these categories from a GraphQL server,
- list of products for each of the categories with the ability to add each product to a shopping cart,
- a shopping cart modal that provides the ability to see all items added to the cart, the total price, and to place the order to a GraphQL server.

## Backend

Apollo GraphQL server with

- a query that returns list of products for a given category,
- a mutation that takes an order request.

## How to run the app

### 1. Run the server

Open a terminal window and run the following commands.

```
cd api
npm i
npm run server
```

If you want to run the server in watch mode so that it reloads when a source file changes, you need to install [entr](http://eradman.com/entrproject/),
for example with `brew install entr`.

### 2. Run the client

Open another terminal window and run the following commands.

```
cd client
npm i
npm run dev
```

## Notes

### Implementation choices

1. I chose the simplest possible approach to implement a React client and GraphQL server.

2. I am not a designer. Therefore, the UI does not look polished. It is functional, but not visually pleasing enough.

3. It's been several years since I worked with databases. Therefore, at the moment the server returns just a hard coded list of products.

### What functionality is missing?

1. The GraphQL server is not connected to MongoDB.

2. Pagination is not implemented yet.

### What needs to be done to make the app production ready?

 1. Error handling. The app should display errors to the users if the API calls fail for some reason.

 2. The API urls are hard coded. The urls should instead be provided to the app from environment variables.

 3. Add unit and integration tests so that we are confident the app works as expected before deploying to production.

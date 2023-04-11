const { gql } = require('apollo-server');

const typeDefs = gql`
type Product {
  id: ID!
  name: String!
  description: String
  availableQuantity: Int!
  price: Float!
}

type OrderInfo {
  id: ID!
  orderedItems: [Product]!
  totalPrice: Float!
}

input GetProductsInput {
  category: String!
}

input OrderItem {
  category: String!
  id: ID!
  orderQuantity: Int!
}

type Query {
  products(input: GetProductsInput!): [Product]!
}

type Mutation {
  order(input: [OrderItem!]!): OrderInfo!
}
`;

module.exports = typeDefs;

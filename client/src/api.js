import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4002',
  cache: new InMemoryCache(),
});

export const PRODUCT_LIST = gql`
  query GetProducts($input: GetProductsInput!) {
    products(input: $input) {
      id
      name
      description
      availableQuantity
      pricePerKg: price
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: [OrderItem!]!) {
    order(input: $input) {
      id
      totalPrice
    }
  }
`;

export default client;

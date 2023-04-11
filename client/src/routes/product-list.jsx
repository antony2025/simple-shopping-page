import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PRODUCT_LIST } from '../api';
import ProductCard from '../components/product-card';

export default function ProductList() {
  const { category } = useParams();
  const { loading, error, data } = useQuery(PRODUCT_LIST, {
    variables: { input: { category } },
  });

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  const items = data.products || [];

  const getItemCards = () =>
    items.map((item) => (
      <section key={item.id}>
        <ProductCard category={category} product={item} />
      </section>
    ));

  return (
    <div>
      <h2>{category}</h2>
      {getItemCards()}
    </div>
  );
}

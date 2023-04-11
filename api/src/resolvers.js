module.exports = {
  Query: {
    products(_, { input }) {
      const vegetables = [
        {
          id: 'brc1',
          name: 'Broccoli',
          description: 'Cruciferous veg',
          availableQuantity: 10,
          price: 3,
        },
        {
          id: 'crt1',
          name: 'Carrot',
          description: 'Suitable for juicing & eating',
          availableQuantity: 25,
          price: 3.5,
        },
      ];
      const fruits = [
        {
          id: 'apl1',
          name: 'Apple',
          description: 'Jona Prince',
          availableQuantity: 15,
          price: 2.99,
        },
        {
          id: 'orn1',
          name: 'Orange',
          description: 'Suitable for juicing',
          availableQuantity: 7,
          price: 1.49,
        },
      ];
      const cheese = [
        {
          id: 'cdr1',
          name: 'Cheddar',
          description: 'Cheddar cheese from Switzerland',
          availableQuantity: 12,
          price: 19.99,
        },
        {
          id: 'emr1',
          name: 'Emmentaler',
          description: 'Aromatic cheese from Germany',
          availableQuantity: 12,
          price: 14.99,
        },
      ];
      const items = new Map();
      items.set('vegetables', vegetables);
      items.set('fruits', fruits);
      items.set('cheese', cheese);
      return items.get(input.category.toLowerCase()) || [];
    },
  },
  Mutation: {
    order() {
      return { id: '124', orderedItems: [], totalPrice: 100 };
    },
  },
};

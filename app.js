const vm = new Vue({
  el: '#app',
  data: {
    products: [],
  },
  filters: {
    priceNumber(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
  methods: {
    fetchProducts() {
      fetch('./api/products.json')
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        });
    },
  },
  created() {
    this.fetchProducts();
  },
});

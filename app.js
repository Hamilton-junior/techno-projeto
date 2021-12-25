const vm = new Vue({
  el: '#app',
  data: {
    products: [],
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

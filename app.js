const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false,
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
    fetchProduct(id) {
      fetch(`./api/products/${id}/dados.json`)
        .then((response) => response.json())
        .then((data) => {
          this.product = data;
        });
    },
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.product = false;
      }
    },
  },
  created() {
    this.fetchProducts();
  },
});

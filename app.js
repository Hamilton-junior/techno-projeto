const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false,
    cart: [],
  },
  filters: {
    priceNumber(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
  computed: {
    cartTotal() {
      let total = 0;
      if (this.cart.length) {
        this.cart.forEach((item) => {
          total += item.preco;
        });
      }
      return total;
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
    addItem() {
      this.product.estoque--;
      const { id, nome, preco } = this.product;
      this.cart.push({ id, nome, preco });
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
  },
  created() {
    this.fetchProducts();
  },
});

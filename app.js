const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false,
    cart: [],
    cartActive: false,
    messageAlert: 'Item adicionado',
    alertActive: false,
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
    closeCart({ target, currentTarget }) {
      if (target === currentTarget) {
        this.cartActive = false;
      }
    },
    addItem() {
      this.product.estoque--;
      const { id, nome, preco } = this.product;
      this.cart.push({ id, nome, preco });
      this.alert(`${nome} adicionado ao carrinho.`);
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
    checkLocalStorage() {
      if (window.localStorage.cart) {
        this.cart = JSON.parse(window.localStorage.cart);
      }
    },
    alert(message) {
      this.messageAlert = message;
      this.alertActive = true;
      setTimeout(() => {
        this.alertActive = false;
      }, 1500);
    },
    // metedo para abrir um produto caso o parâmetro na url
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduct(hash.replace('#', ''));
      }
    },
  },
  watch: {
    product() {
      document.title = this.product.nome || 'Techno';
      const hash = this.product.id || '';
      history.pushState(null, null, `#${hash}`);
    },
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    },
  },
  created() {
    this.fetchProducts();
    this.checkLocalStorage();
    this.router();
  },
});

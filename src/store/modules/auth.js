
const state = {
  user: null,
  products: [],
  users: []
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateProducts: (state) => state.products,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({state, dispatch}, form) {
    let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    let user = {
      id: id,
      email: form.email,
      password: form.password
    }
    state.users.push(user)
    let UserForm = new FormData()
    UserForm.append('id', id)
    UserForm.append('email', form.email)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {
      await commit("setUser", user.get('id'));
      return {status: true, msg: 'LoggedIn Successfully!'}
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },

  async CreateProduct({state, dispatch }, product) {
    product.userId = state.user.id
    state.products.push(product)
    return await dispatch("GetProducts");
  },

  async GetProducts({state, commit }) {
    commit("setproducts", state.products);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setproducts(state, products) {
    state.products = products;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

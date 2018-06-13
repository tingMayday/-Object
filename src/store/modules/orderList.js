import Vue from 'vue'
const state = {
  orderList: [],
  params: {}
}
const getters = {
  getOrderList: state =>  state.orderList
}
const actions = {
  fetchOrderList ({commit, state}) {
    Vue.http.get('/api/getOrderList', state.params)
    .then((res) => {
      commit('updateOrderList', res.data.list)
    }, (err) => {

    })
  }
}
const mutations = {
 updateOrderList(state, orderList) {
    state.orderList = orderList
  },
  updateParams(state, {key, val}){
    state.params[key] = val
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
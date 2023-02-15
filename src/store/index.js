import Vue from "vue";

import Vuex from "vuex";

// import data from "@/json_database/dataplans.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeUser: "",
    apliances: [
      {name: 'Normal Bulb', watts: 50, img: 'https://i.imgur.com/3rCS5r9.png', qty: 0},
      {name: 'Tube Light', watts: 18, img: 'https://i.imgur.com/aylWK9F.png', qty: 0},
      {name: 'Led Lamp', watts: 15, img: 'https://i.imgur.com/g6EWrcO.png', qty: 0},
      {name: 'Fan', watts: 70, img: 'https://i.imgur.com/4rA0uRq.png', qty: 0},
      {name: 'Music System', watts: 320, img: 'https://i.imgur.com/WwXFHfq.png', qty: 0},
      {name: 'Dj Jack', watts: 60, img: 'https://i.imgur.com/GwUdno2.png', qty: 0},
      {name: 'LCD/LED TV (< 42)', watts: 150, img: 'https://i.imgur.com/eLNnq2R.png', qty: 0},
      {name: 'LCD/LED TV (> 42)', watts: 200, img: 'https://i.imgur.com/vUXmjOe.png', qty: 0},
      {name: 'Desktop Computer', watts: 200, img: 'https://i.imgur.com/Es8Ulzq.png', qty: 0},
      {name: 'Laptop', watts: 200, img: 'https://i.imgur.com/oVq0W64.png', qty: 0},
      {name: 'Refrigerator (165-250Ltr)', watts: 150, img: 'https://i.imgur.com/GP7GdKx.pngg', qty: 0},
      {name: 'Refrigerator (250-350Ltr)', watts: 210, img: 'https://i.imgur.com/U8WnDiD.png', qty: 0},
      {name: 'Refrigerator(350-450Ltr)', watts: 320, img: 'https://i.imgur.com/U8WnDiD.png', qty: 0},
      {name: 'Refrigerator (> 450Ltr)', watts: 460, img: 'https://i.imgur.com/U8WnDiD.png', qty: 0},
      {name: 'AC - 1HP', watts: 1120, img: 'https://i.imgur.com/ht8cGJM.png', qty: 0},
      {name: 'AC - 1.5HP', watts: 1830, img: 'https://i.imgur.com/ht8cGJM.png', qty: 0},
      {name: 'AC - 2HP', watts: 2500, img: 'https://i.imgur.com/ht8cGJM.png', qty: 0},
      {name: 'Toaster', watts: 800, img: 'https://i.imgur.com/rvGHuex.png', qty: 0},
      {name: 'Washing Machine', watts: 1000, img: 'https://i.imgur.com/X40MexQ.png', qty: 0},
      {name: 'Gaming Console', watts: 200, img: 'https://i.imgur.com/nbQIUK0.png', qty: 0},
      {name: 'Microwave Oven', watts: 1400, img: 'https://i.imgur.com/rwt3Lvy.png', qty: 0},
      {name: 'Dry Iron', watts: 1300, img: 'https://i.imgur.com/kXkbelB.png', qty: 0},
      {name: 'Mini Iron', watts: 500, img: 'https://i.imgur.com/E4KsYuu.png', qty: 0},	
      {name: 'Water Pump (1 HP)', watts: 1900, img: 'https://i.imgur.com/opMVGhW.png', qty: 0},
      {name: 'Water Pump (2 HP)', watts: 2500, img: 'https://i.imgur.com/opMVGhW.png', qty: 0},
      {name: 'Blender', watts: 400, img: 'https://i.imgur.com/vINF1jl.png', qty: 0},
      {name: 'Hair Dryer', watts: 1200, img: 'https://i.imgur.com/mbmCTQ8.png', qty: 0}

    ]
  },
  getters: {},
  mutations: {
    SET_ACTIVE_USER(state, payload) {
      localStorage.setItem("activeUser", JSON.stringify(payload));
      state.activeUser = payload;
    },
    UNSET_ACTIVE_USER(state, payload) {
      localStorage.removeItem("activeUser");
      state.activeUser = payload;
    },
    SET_DATAS(state, payload){
      state.dataPacks = payload;
    },
    SET_NETWORKS(state, payload){
      state.networksPack = payload
    },
    SET_CABLES(state, payload){
      state.cables = payload
    },
    SET_CABLESPLAN(state, payload){
      state.cablesPlan = payload
    },
    Set_Electricity(state, payload){
      state.electricity = payload
    },
  },
  actions: {
    ActiveUser({ commit }, payload) {
      commit("SET_ACTIVE_USER", payload);
    },
    RemoveUser({ commit }, payload) {
      commit("UNSET_ACTIVE_USER", payload);
    },
    SetNetwork({ commit }, payload){
      commit("SET_NETWORKS", payload);
    },
    SetDatas({ commit }, payload){
      commit("SET_DATAS", payload);
    },
    SetCablesPlan({ commit }, payload){
      commit("SET_CABLESPLAN", payload);
    },
    SetCables({ commit }, payload){
      commit("SET_CABLES", payload);
    },
    SetElectricity({ commit }, payload){
      commit("Set_Electricity", payload);
    },


  },
  modules: {},
});

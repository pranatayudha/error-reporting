/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import qs from "qs";
import Vue from "vue";

export default {
  state: {
    load: {
      detailLoad: "LOADING",
      activeLoad: "LOADING",
      serverLoad: "LOADING",
      statusLoad: "LOADING",
      userLoad: "LOADING",
    },
    detailData: [],
    activeIssue: [],
    getUser: [],
    getStatusAll: [],
    serverData: [],
    userLogin: [],
    historyData: [],
    getAllUser: [],
  },
  getters: {
    loadDetail(state) {
      return state.load.detailLoad;
    },
    loadActive(state) {
      return state.load.activeLoad;
    },
    loadServer(state) {
      return state.load.serverLoad;
    },
    loadStatus(state) {
      return state.load.statusLoad;
    },
    getDetail(state) {
      return state.detailData;
    },
    getActiveIssue(state) {
      return state.activeIssue;
    },
    getUserLogin(state) {
      return state.userLogin;
    },
    getUsers(state) {
      return state.getUser;
    },
    getHistories(state) {
      return state.historyData;
    },
    getStatus(state) {
      return state.getStatusAll;
    },
    getServer(state) {
      return state.serverData;
    },
  },
  mutations: {
    SET_DATA_DETAIL({ load }, state) {
      load.detailLoad = state;
    },
    SET_DATA_ACTIVE_ISSUE({ load }, state) {
      load.activeLoad = state;
    },
    UPDATE_DATA_DETAIL(state, data) {
      const idx = state.detailData.findIndex((dt) => dt.id == data.id);
      const dataUser = state.getUser.find((user) => user.id == data.user_id);
      let selectedData = state.detailData[idx];
      if (selectedData) {
        if (selectedData.user == null) {
          selectedData.user = dataUser;
        } else if (selectedData.user) {
          selectedData.user = dataUser;
        }
      }
      const updatedData = { ...selectedData, ...data };
      Vue.set(state.detailData, idx, updatedData);
    },
    UPDATE_DATA_ACTIVE_ISSUE(state, data) {
      const idx = state.activeIssue.findIndex((dt) => dt.id == data.id);
      const dataUser = state.getUser.find((user) => user.id == data.user_id);
      let selectedData = state.activeIssue[idx];
      if (selectedData) {
        if (selectedData.user == null) {
          selectedData.user = dataUser;
        } else if (selectedData.user) {
          selectedData.user = dataUser;
        }
      }
      const updatedData = { ...selectedData, ...data };
      Vue.set(state.activeIssue, idx, updatedData);
    },
    UPDATE_DATA_HISTORIES(state, data) {
      const idx = state.getStatusAll.findIndex((dt) => dt.id == data.id);
      const dataUser = state.getUser.find((user) => user.id == data.user_id);
      let selectedData = state.getStatusAll[idx];
      if (selectedData) {
        if (selectedData.user == null) {
          selectedData.user = dataUser;
        } else if (selectedData.user) {
          selectedData.user = dataUser;
        }
      }
      const updatedData = { ...selectedData, ...data };
      Vue.set(state.getStatusAll, idx, updatedData);
    },
    SET_DATA_SERVER({ load }, state) {
      load.serverLoad = state;
    },
    SET_DATA_STATUS({ load }, state) {
      load.statusLoad = state;
    },
    ADD_DETAIL_DATA(state, data) {
      state.detailData = data;
    },
    ADD_ACTIVE_ISSUE(state, data) {
      state.activeIssue = data;
    },
    SAVE_USER_LOGIN(state, data) {
      state.userLogin = data;
    },
    ADD_USERS_DATA(state, data) {
      state.getUser = data;
    },
    ADD_ALL_STATUS_DATA(state, data) {
      state.getStatusAll = data;
    },
    ADD_SERVER_DATA(state, data) {
      state.serverData = data;
    },
    ADD_HISTORIES_DATA(state, data) {
      state.historyData = data;
    },
  },
  actions: {
    LOAD_DETAIL_DATA({ commit }) {
      commit("SET_DATA_DETAIL", "LOADING");
      return axios
        .get(`${process.env.VUE_APP_API_URL}/messages`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_DETAIL_DATA", response.data);
            commit("SET_DATA_DETAIL", "LOADED");
          }
        })
        .catch((error) => {
          commit("SET_DATA_DETAIL", "ERROR");
        });
    },
    LOAD_ACTIVE_ISSUE({ commit }) {
      commit("SET_DATA_ACTIVE_ISSUE", "LOADING");
      return axios
        .get(`${process.env.VUE_APP_API_URL}/active_issues`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_ACTIVE_ISSUE", response.data);
            commit("SET_DATA_ACTIVE_ISSUE", "LOADED");
          }
        })
        .catch((error) => {
          commit("SET_DATA_ACTIVE_ISSUE", "ERROR");
        });
    },
    LOAD_SERVER_DATA({ commit }) {
      commit("SET_DATA_SERVER", "LOADING");
      return axios
        .get(`${process.env.VUE_APP_API_URL}/servers`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_SERVER_DATA", response.data);
            commit("SET_DATA_SERVER", "LOADED");
          }
        })
        .catch((error) => {
          commit("SET_DATA_SERVER", "ERROR");
        });
    },
    LOAD_USER_LOGIN({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SAVE_USER_LOGIN", data);
        resolve();
      });
    },
    LOAD_HISTORIES_DATA({ commit }) {
      return axios
        .get(`${process.env.VUE_APP_API_URL}/histories`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_HISTORIES_DATA", response.data);
          }
        })
        .catch((error) => {});
    },
    LOAD_USERS_DATA({ commit }) {
      return axios
        .get(`${process.env.VUE_APP_API_URL}/users`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_USERS_DATA", response.data);
          }
        });
    },
    UPDATE_DATA({ commit }, data) {
      console.log(data);
      return axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/update_status`,
        crossdomain: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      }).then((response) => {
        if (response !== null) {
          const payload = qs.parse(data);
          console.log(payload);
          commit("UPDATE_DATA_DETAIL", payload);
          commit("UPDATE_DATA_ACTIVE_ISSUE", payload);
          commit("UPDATE_DATA_HISTORIES", payload);
        }
      });
    },
    LOAD_GET_STATUS_DATA({ commit }) {
      commit("SET_DATA_STATUS", "LOADING");
      return axios
        .get(`${process.env.VUE_APP_API_URL}/messages?status=3`)
        .then((response) => {
          if (response !== null) {
            commit("ADD_ALL_STATUS_DATA", response.data);
            commit("SET_DATA_STATUS", "LOADED");
          }
        })
        .catch((error) => {
          commit("SET_DATA_STATUS", "ERROR");
        });
    },
   },
};

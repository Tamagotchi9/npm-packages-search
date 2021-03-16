import Vue from "vue";
import Vuex from "vuex";
import { fetchPackages, fetchAuthor } from "@/data";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    packages: null,
    currentPackage: null,
    modal: false,
    author: null
  },
  getters: {
    MODAL_STATUS(state) {
      return state.modal;
    }
  },
  mutations: {
    SET_PACKAGES(state, packages) {
      state.packages = packages;
    },

    SET_AUTHOR(state, author) {
      state.author = author;
    },

    SET_CURRENT_PACKAGE(state, currentPackage) {
      state.currentPackage = currentPackage;
    },

    TOGGLE_MODAL(state) {
      state.modal = !state.modal;
    }
  },
  actions: {
    async GET_PACKAGES({ commit }, text) {
      const fetchedPackages = await fetchPackages(text);
      const packages = await fetchedPackages.json();
      commit("SET_PACKAGES", packages.objects);
    },

    async GET_AUTHOR({ commit }) {
      const fetchedAuthor = await fetchAuthor();
      const author = await fetchedAuthor.json();
      commit("SET_AUTHOR", author);
    },

    SHOW_CURRENT_PACKAGE({ commit }, currentPackage) {
      commit("SET_CURRENT_PACKAGE", currentPackage);
      commit("TOGGLE_MODAL");
    }
  },
  modules: {}
});

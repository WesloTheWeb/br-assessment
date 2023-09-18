import { createStore } from 'vuex'

export type StateType = {
  userInput: {
    fullName: string;
    phoneNumber: string;
    gender: string;
    reference: string[];
    description: string;
  };
};

export default createStore({
  state: {
    userInput: {
      fullName: '',
      phoneNumber: '',
      gender: '',
      reference: [],
      description: '',
    }
  },
  getters: {
    getUserInput: (state) => state.userInput
  },
  mutations: {
    SET_USER_INPUT: (state, payload) => {
      state.userInput = payload;
    }
  },
  actions: {
    updateUserInput: ({ commit }, payload) => {
      commit('SET_USER_INPUT', payload);
    }
  },
  modules: {
  }
})

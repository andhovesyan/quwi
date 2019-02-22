export const state = () => ({
  items: [],
  currentItem: null,
  fetchError: '',
  fetchCurrentError: '',
});

export const getters = {
  all: ({ items }) => items,
  current: ({ currentItem }) => currentItem,
  fetchError: ({ fetchError }) => fetchError,
  fetchCurrentError: ({ fetchCurrentError }) => fetchCurrentError,
};

export const actions = {
  async fetchItems({ commit }) {
    try {
      const res = await this.$axios.get('projects-manage/index');
      commit('SET_ITEMS', res.data.projects);
      return res.data.projects;
    } catch (e) {
      let error = 'Something went wrong';
      if (e.response) {
        error = e.response.data.message;
      }
      commit('SET_ERROR', error);
      throw error;
    }
  },
  async fetchCurrentItem({ state, commit }, id) {
    try {
      let project = state.items.filter((i) => i.id === id)[0];
      if (!project) {
        const res = await this.$axios.get(`projects-manage/${id}`);
        project = res.data.project;
      }
      commit('SET_CURRENT_ITEM', project);
      return project;
    } catch (e) {
      let error = 'Something went wrong';
      if (e.response) {
        error = e.response.data.message;
      }
      commit('SET_CURRENT_ERROR', error);
      throw error;
    }
  },
  async updateItem({ state, commit }, { id, ...data }) {
    const res = await this.$axios.put(`projects-manage/${id}`, data);
    const project = res.data.project;
    commit('UPDATE_ITEM', project);
    return project;
  }
};

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
  SET_CURRENT_ITEM(state, items) {
    state.currentItem = items;
  },
  UPDATE_ITEM(state, item) {
    state.items = state.items.map((old) => {
      return old.id === item.id ? item : old;
    });
  },
  SET_ERROR(state, error) {
    state.fetchError = error;
  },
  SET_CURRENT_ERROR(state, error) {
    state.fetchCurrentError = error;
  },
};

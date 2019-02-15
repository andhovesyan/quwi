export const state = () => ({
  items: [],
  currentItem: null,
});

export const getters = {
  all: ({ items }) => items,
  current: ({ currentItem }) => currentItem,
};

export const actions = {
  async fetchItems({ commit }) {
    const res = await this.$axios.get('projects-manage/index');
    commit('SET_ITEMS', res.data.projects);
    return res.data.projects;
  },
  async fetchCurrentItem({ state, commit }, id) {
    let project = state.items.filter((i) => i.id === id)[0];
    if (!project) {
      const res = await this.$axios.get(`projects-manage/${id}`);
      project = res.data.project;
    }
    commit('SET_CURRENT_ITEM', project);
    return project;
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
};

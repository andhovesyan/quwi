<template>
  <section id="content" class="content">
    <top-bar>projects</top-bar>
    <div class="error-container" v-if="error">
      {{error}}
    </div>
    <div v-else class="projects-list">
      <project-box
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="redirectToProject(project)"
      />
    </div>
  </section>
</template>

<script>

import {
  mapGetters,
  mapActions,
} from 'vuex';

import ProjectBox from '~/components/ProjectBox';
import TopBar from '~/components/TopBar';

export default {
  name: 'Home',
  components: {
    ProjectBox,
    TopBar,
  },
  async fetch({ store }) {
    try {
      await store.dispatch('projects/fetchItems');
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    ...mapGetters({
      projects: 'projects/all',
      error: 'projects/fetchError',
    }),
  },
  methods: {
    ...mapActions({
      fetchProjects: 'projects/fetchItems',
    }),
    redirectToProject({ id }) {
      this.$router.push(`/projects/${id}`)
    },
  },
}
</script>

<style scoped>
.projects-list {
  margin: 15px auto 50px;
  max-width: 600px;
  position: relative;
  width: 100%;
}
</style>

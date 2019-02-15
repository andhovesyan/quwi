<template>
  <section id="content" class="content">
    <top-bar>projects</top-bar>
    <div class="projects-list">
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
  data () {
    return {};
  },
  mounted() {
    this.fetchProjects();
  },
  computed: {
    ...mapGetters({
      projects: 'projects/all',
    }),
  },
  methods: {
    ...mapActions({
      fetchProjects: 'projects/fetchItems',
    }),
    redirectToProject({ id }) {
      console.log(id);
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

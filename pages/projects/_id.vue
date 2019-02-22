<template lang="html">
  <section id="content" class="content">
    <top-bar>
      <nuxt-link class="btn btn-secondary btn-back" to="/projects">Back</nuxt-link>
    </top-bar>
    <div class="error-container" v-if="error">
      {{error}}
    </div>
    <div v-else class="container">
      <form v-if="project" class="form-block" method="post" @submit.prevent="submit">
        <fieldset class="logo-container">
          <img v-if="project.logo_url" class="logo-img" :src="project.logo_url" />
          <logo-placeholder v-else :text="project.name" :font-size="34" />
        </fieldset>
        <fieldset class="form-group">
          <label class="form-label" for="projectActive">Active</label>
          <checkbox-switcher id="projectActive" name="is_active" v-model="formData.is_active"/>
        </fieldset>
        <fieldset class="form-group">
          <label class="form-label" for="projectName">Name</label>
          <input class="custom-input" id="projectName" type="text" v-model="formData.name">
          <button class="btn btn-primary" type="submit">OK</button>
        </fieldset>
        <fieldset>
          <checkbox-switcher id="projectOwnerWatched" name="is_owner_watched" v-model="formData.is_owner_watched"/>
          <label for="projectOwnerWatched">
            Add me as watcher to tickets created by others
          </label>
        </fieldset>
        <div class="alert" :class="`alert-${alert.type || 'none'}`">
          {{alert.message}}
        </div>
      </form>
    </div>
  </section>
</template>


<script>

import {
  mapGetters,
  mapActions,
} from 'vuex';
import TopBar from '~/components/TopBar';
import CheckboxSwitcher from '~/components/common/CheckboxSwitcher';
import LogoPlaceholder from '~/components/common/LogoPlaceholder';

export default {
  name: 'Project',
  components: {
    TopBar,
    CheckboxSwitcher,
    LogoPlaceholder,
  },
  async asyncData({ store, params }) {
    try {
      const project = await store.dispatch('projects/fetchCurrentItem', params.id);
      return {
        formData: {
          name: project.name,
          is_active: project.is_active,
          is_owner_watched: project.is_owner_watched,
        },
      };
    } catch (e) {
      console.error(e);
      return {};
    }
  },
  data () {
    return {
      formData: {
        name: '',
        is_active: false,
        is_owner_watched: false,
      },
      alert: {
        type: 'none',
        message: '',
      },
    };
  },
  mounted() {
    if (!this.project) {
      this.fetchCurrentProject(this.$route.params.id)
        .then(this.setFormData);
    }
  },
  computed: {
    ...mapGetters({
      project: 'projects/current',
      error: 'projects/fetchCurrentError',
    }),
  },
  methods: {
    ...mapActions({
      fetchCurrentProject: 'projects/fetchCurrentItem',
      updateProject: 'projects/updateItem',
    }),
    back() {
      this.$router.push('/projects');
    },
    setFormData() {
      this.formData = {
        name: this.project.name,
        is_active: this.project.is_active,
        is_owner_watched: this.project.is_owner_watched,
      };
    },
    submit() {
      this.updateProject({id: this.$route.params.id, ...this.formData})
        .then(() => {
          this.alert = {
            type: 'success',
            message: 'Project saved successfully',
          };
        })
        .catch((err) => {
          this.alert = {
            type: 'error',
            message: Object.values(err.response.data.first_errors)[0],
          };
        });
    },
  },
  watch: {
    project: {
      handler(to, from) {
        if (!from || from.id !== to.id) {
          this.setFormData();
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
  .form-block {
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .44);
    padding: 20px;
    margin: 20px auto;
    width: 100%;
  }

  .logo-container {
    float: right;
    height: 80px;
    width: 120px;
    padding: 0;

    .logo-img,
    .logo-placeholder {
      border-radius: 50%;
      height: 80px;
      width: 80px;
      float: right;
      margin-right: 10px;
    }
  }

  .form-label {
    min-width: 100px;
    display: inline-block;
  }

  .custom-input {
    padding: 9px;
    box-shadow: none;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 2px;
    height: 34px;
    margin-right: 6px;
    display: inline-block;
    width: calc(100% - 175px);

    &::placeholder {
      color: #bbb;
    }
  }

  .btn-primary {
    height: 34px;
    padding: 0 15px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    text-shadow: 1px 1px 1px rgba(0,0,0,.5);
    background: #395378;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    width: 47px;

    &:hover {
      opacity: .75;
      transition: .3s;
    }
  }

  .btn-back {
    height: 34px;
    font-weight: 700;
    font-size: 11px;
    padding: 0 15px;
    width: auto;
    line-height: 32px;
    border-radius: 4px;

    &:hover {
      opacity: .7;
      text-decoration: none;
    }
  }

  .alert {
    padding-top: 8px;
    transition: opacity .2s;

    &.alert-success {
      color: #0b8f14;
      opacity: 1;
    }

    &.alert-error {
      color: #c33a24;
      opacity: 1;
    }

    &.alert-none {
      opacity: 0;
    }
  }
</style>

<template lang="html">
  <div
    class="project-block"
    :class="project.is_active ? 'active' : 'inactive'"
    @click="$emit('click')"
  >
    <div class="logo">
      <img v-if="project.logo_url" class="logo-img" :src="project.logo_url" />
      <logo-placeholder v-else :text="project.name" />
    </div>
    <div class="name">
      <div class="e-name">{{ project.name }}</div>
    </div>
    <div class="status">
      <div v-if="project.is_active" class="e-status m-active">
        active
      </div>
      <div v-else class="e-status m-inactive">
        inactive
      </div>
      <div v-if="project.users.length" class="e-users">
        {{project.users.length}} users
      </div>
      <div v-else class="e-users">No users</div>
    </div>
    <div class="stats">
      <div class="stats-row">
        <div class="e-titles">time this week</div>
        <div class="e-counts">
          {{ secondsToTime(project.spent_time_month, 'HH:mm:ss') }}
        </div>
      </div>
      <div class="stats-row">
        <div class="e-titles">this month</div>
        <div class="e-counts">
          {{ secondsToTime(project.spent_time_week, 'HH:mm:ss') }}
        </div>
      </div>
      <div class="stats-row">
        <div class="e-titles">total</div>
        <div class="e-counts">
          {{ secondsToTime(project.spent_time_all, 'HH:mm:ss') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import secondsToTime from '~/mixins/secondsToTime';
import LogoPlaceholder from '~/components/common/LogoPlaceholder';

export default {
  mixins: [secondsToTime],
  components: {
    LogoPlaceholder,
  },
  props: {
    project: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.project-block {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #dedede;
  padding: 18px 20px 20px 25px;
  cursor: pointer;
  font-size: 0.9em;
  height: 90px;
  margin-bottom: 6px;

  &.inactive {
    opacity: 0.5;
  }

  &:hover {
    background: #ececec;
    cursor: pointer;
  }

  .name,
  .status {
    flex: 2;
    display: flex;
    flex-direction: column;
    text-align: center;

    .e-status {
      color: #777;
      text-transform: capitalize;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .e-status.m-active {
      color: green;
    }

    .e-users {
      font-weight: 700;
    }
  }

  .name {
    font-weight: 700;
    overflow: hidden;

    .e-name {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
    }
  }

  .stats {
    flex: 2;
    white-space: nowrap;
    margin-top: 2px;
    margin-left: 32px;
    min-width: 162px;
    max-width: 162px;
    .stats-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .e-counts,
    .e-titles {
      margin: 4px 0 0;
    }
    .e-counts {
      text-align: right;
      font-weight: 700;
    }
  }

  .logo {
    width: 100%;
    max-width: 65px;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .logo-img,
  .logo-placeholder {
    border-radius: 50%;
    overflow: hidden;
    font-size: 17px;
    height: 40px;
    width: 40px;
  }
}
</style>

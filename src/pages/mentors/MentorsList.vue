<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="An error has occured."
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <mentors-filter @change-filter="setFilter"></mentors-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadMentors(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Log in to Register as a Mentor</base-button
          >
          <base-button v-if="canRegisterAsMentor" link to="/register"
            >Register as a Mentor</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasMentors">
          <mentor-item
            v-for="mentor in filteredMentors"
            :key="mentor.id"
            :id="mentor.id"
            :first-name="mentor.firstName"
            :last-name="mentor.lastName"
            :areas="mentor.areas"
            :rate="mentor.hourlyRate"
          ></mentor-item>
        </ul>
        <h3 v-else>No registered mentors yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import MentorItem from '../../components/mentors/MentorItem.vue';
import MentorsFilter from '../../components/mentors/MentorsFilter.vue';

export default {
  components: {
    MentorItem,
    MentorsFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      areasFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredMentors() {
      const keys = Object.keys(this.areasFilter);
      const selectedAreas = keys.filter((key) => this.areasFilter[key]);
      const result = this.$store.getters['mentors/getMentors'].filter(
        (mentor) => {
          return mentor.areas.some((area) => selectedAreas.includes(area));
        }
      );
      return result;
    },
    canRegisterAsMentor() {
      return !this.isMentor && !this.isLoading && this.isLoggedIn;
    },
    hasMentors() {
      return !this.isLoading && this.$store.getters['mentors/hasMentors'];
    },
    isMentor() {
      return this.$store.getters['mentors/isMentor'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    setFilter(updatedFilter) {
      this.areasFilter = updatedFilter;
    },
    async loadMentors(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('mentors/loadMentors', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'An error has occured.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadMentors();
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
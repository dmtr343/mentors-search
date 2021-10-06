<template>
  <section>
    <mentors-filter @change-filter="setFilter"></mentors-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadMentors">Refresh</base-button>
        <base-button v-if="!isMentor && !isLoading" link to="/register"
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
    hasMentors() {
      return !this.isLoading && this.$store.getters['mentors/hasMentors'];
    },
    isMentor() {
      return this.$store.getters['mentors/isMentor'];
    },
  },

  methods: {
    setFilter(updatedFilter) {
      this.areasFilter = updatedFilter;
    },
    async loadMentors() {
      this.isLoading = true;
      await this.$store.dispatch('mentors/loadMentors');
      this.isLoading = false;
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
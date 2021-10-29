<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="An error has occured."
    >
      <p>{{ error }}</p>
    </base-dialog>
    <template v-if="isLoading">
      <section>
        <base-card>
          <div>
            <base-spinner></base-spinner>
          </div>
        </base-card>
      </section>
    </template>
    <template v-else-if="selectedMentor">
      <section>
        <base-card>
          <h2>{{ fullName }}</h2>
          <h3>${{ selectedMentor.hourlyRate }}/hour</h3>
          <base-badge
            v-for="area in selectedMentor.areas"
            :key="area"
            :title="area"
            :type="area"
          >
          </base-badge>
          <p>{{ selectedMentor.description }}</p>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h2>Contact this mentor if you are interested!</h2>
            <base-button link :to="contactLink">Contact</base-button>
          </header>
          <router-view></router-view>
        </base-card>
      </section>
    </template>
    <template v-else>
      <section>
        <base-card>
          <header>
            <h2>Wrong mentor ID.</h2>
          </header>
        </base-card>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      error: null,
      selectedMentor: null,
      isLoading: false,
      showContactLink: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedMentor.firstName + ' ' + this.selectedMentor.lastName;
    },
    contactLink() {
      if (this.$route.path.includes('/contact')) {
        return this.$route.path;
      } else {
        return this.$route.path + '/contact';
      }
    },
  },
  async created() {
    if (!this.$store.getters['mentors/getLastFetchTime']) {
      await this.loadMentors();
    }
    this.selectedMentor = this.$store.getters['mentors/getMentors'].find(
      (mentor) => mentor.id === this.id
    );
  },
  methods: {
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
};
</script>
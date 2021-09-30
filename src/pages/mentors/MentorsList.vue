<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as a Mentor</router-link>
    </div>
    <ul v-if="hasMentors">
      <li v-for="mentor in filteredMentors" :key="mentor.id">
        {{ mentor.firstName }}
      </li>
    </ul>
    <h3 v-else>No registered mentors yet.</h3>
  </section>
</template>

<script>
export default {
  computed: {
    filteredMentors() {
      return this.$store.getters['mentors/getMentors'];
    },
    hasMentors() {
      return this.$store.getters['mentors/hasMentors'];
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
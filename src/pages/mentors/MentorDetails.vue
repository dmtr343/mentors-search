<template>
<div>
  <template v-if="selectedMentor">
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
      selectedMentor: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedMentor.firstName + ' ' + this.selectedMentor.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedMentor = this.$store.getters['mentors/getMentors'].find(
      (mentor) => mentor.id === this.id
    );
  },
};
</script>

<style>
</style>
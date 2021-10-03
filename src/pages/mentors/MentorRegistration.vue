<template>
  <section>
    <base-card>
      <h2>Register as a Mentor</h2>
      <mentor-form @save-data="saveData"></mentor-form>
    </base-card>
  </section>
</template>

<script>
import MentorForm from '../../components/mentors/MentorForm.vue';
export default {
  components: { MentorForm },
  methods: {
    saveData(formData) {
      this.$store.dispatch('mentors/addMentor', formData);
      this.$router.replace('/mentors');
    },
  },
};
</script>

<style>
</style>
<template>
  <section>
    <form @submit.prevent="sumbitForm">
      <div class="form-control">
        <label for="email">Email:</label>
        <input v-model.trim="email" type="email" id="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea v-model.trim="message" id="message" rows="7"></textarea>
      </div>
      <p class="errors" v-if="!isFormValid">
        Check that email is correct and message is not empty.
      </p>
      <div class="actions">
        <base-button>Send message</base-button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      isFormValid: true,
    };
  },
  methods: {
    sumbitForm() {
      this.isFormValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.isFormValid = false;
        return;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Autheticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p class="errors" v-if="!isFormValid">
          Check that email is correct and password must contain at least 6
          characters.
        </p>
        <base-button>{{ submitFormButtonText }}</base-button>
        <base-button type="button" mode="flat" @click="switchForm">{{
          switchFormButtonText
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseSpinner from '../../components/UI/BaseSpinner.vue';
export default {
  components: { BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      isFormValid: true,
      openedForm: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitFormButtonText() {
      return this.openedForm === 'login' ? 'Log in' : 'Register';
    },
    switchFormButtonText() {
      return this.openedForm === 'login' ? 'Register' : 'Log in';
    },
  },
  methods: {
    async submitForm() {
      this.isFormValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.isFormValid = false;
        return;
      }

      this.isLoading = true;

      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.openedForm === 'login') {
          await this.$store.dispatch('login', userData);
        } else {
          await this.$store.dispatch('register', userData);
        }

        const redirectUrl = '/' + (this.$route.query.redirect || 'mentors');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchForm() {
      if (this.openedForm === 'login') {
        this.openedForm = 'register';
      } else {
        this.openedForm = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>
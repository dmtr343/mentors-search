<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Autheticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form
        @animationend="animated = false"
        :class="{ fade: animated }"
        @keyup.enter="submitForm"
        @submit.prevent=""
      >
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
        <base-button
          type="button"
          :mode="isLoginActive ? '' : 'flat'"
          @click="handleFormClick('login')"
          >Log in</base-button
        >
        <base-button
          type="button"
          :mode="isRegisterActive ? '' : 'flat'"
          @click="handleFormClick('register')"
          >Register</base-button
        >
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
      animated: false,
    };
  },
  computed: {
    isLoginActive() {
      return this.openedForm === 'login';
    },
    isRegisterActive() {
      return this.openedForm === 'register';
    },
  },
  methods: {
    handleFormClick(button) {
      if (this.openedForm === button) {
        this.submitForm();
      } else {
        this.switchForm();
      }
    },
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
      this.isFormValid = true;
      this.animated = true;
      if (this.openedForm === 'login') {
        this.openedForm = 'register';
      } else {
        this.openedForm = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
    animate() {
      this.animated = true;
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

.fade {
  animation: 0.4s fadeOutIn ease-in-out;
}

@keyframes fadeOutIn {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  49% {
    opacity: 0;
    transform: translateY(15px);
  }
  50% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #186600;
  border: 1px solid #2d6664;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #5f9110;
  border-color: #2d6664;
  transition: background-color 0.15s linear;
}

.flat {
  background-color: transparent;
  color: #2d6664;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #2d6664;
  color: #2d6664;
}

.nav {
  background-color: transparent;
  width: 100%;
  border-radius: 0;
  padding: 1.5rem;
  margin: 0;
  color: #14f81f;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

.nav:hover,
.nav:active {
  background-color: #186600;
}
</style>
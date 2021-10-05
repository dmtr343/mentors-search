<template>
  <li>
    <h4>{{ email }}</h4>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['email', 'message'],
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
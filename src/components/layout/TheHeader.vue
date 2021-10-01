<template>
  <header>
    <nav>
      <h1><router-link to="/">Find your mentor</router-link></h1>
      <ul>
        <li><router-link to="/mentors">All mentors</router-link></li>
        <li><router-link to="/requests">Requests</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3a834b;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #14f81f;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 2px solid #74cfc3;
  border-radius: 8px;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
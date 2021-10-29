<template>
  <header>
    <nav class="navbar">
      <h1 class="nav-title">
        <router-link to="/">Mentors Search</router-link>
      </h1>
      <ul
        class="nav-menu"
        :class="{ active: isNavbarOpened }"
        @click="closeMenu"
      >
        <li class="nav-item">
          <router-link to="/mentors">All mentors</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else class="nav-item">
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <base-button mode="nav" @click="logout">Log out</base-button>
        </li>
      </ul>
      <button
        class="nav-toggler"
        :class="{ active: isNavbarOpened }"
        @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isNavbarOpened: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/mentors');
    },
    toggleMenu() {
      this.isNavbarOpened = !this.isNavbarOpened;
    },
    closeMenu() {
      this.isNavbarOpened = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  background-color: #3a834b;
  justify-content: space-around;
  align-items: center;
  padding: 0;
}

.navbar a {
  text-decoration: none;
}

.nav-title {
  margin: 0;
}

.nav-title a {
  color: #ffffff;
}

.nav-toggler {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #ffffff;
}

.nav-menu {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.nav-item {
  list-style: none;
}

.nav-item a {
  display: block;
  color: #14f81f;
  font-size: 1rem;
  padding: 1.5rem;
}

.nav-item a:active,
.nav-item a:hover,
.nav-item a.router-link-active {
  background-color: #186600;
  transition: background-color 0.15s linear;
}

@media only screen and (max-width: 576px) {
  .navbar {
    justify-content: space-between;
    padding: 1rem;
  }

  .nav-menu {
    position: absolute;
    z-index: 1;
    left: -100%;
    top: 4rem;
    flex-direction: column;
    background-color: #3a834b;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
  }

  .nav-item {
    width: 100%;
  }

  .nav-item a,
  .nav-item button {
    padding: 1rem;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-toggler {
    display: block;
    cursor: pointer;
  }
}
</style>
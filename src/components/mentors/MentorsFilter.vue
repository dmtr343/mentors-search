<template>
  <base-card>
    <h3>Show only:</h3>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        :checked="filters.frontend"
        @change="setFilter"
      />
      <label for="frontend">Frontend</label>
      <input
        type="checkbox"
        id="backend"
        :checked="filters.backend"
        @change="setFilter"
      />
      <label for="backend">Backend</label>
      <input
        type="checkbox"
        id="career"
        :checked="filters.career"
        @change="setFilter"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      this.filters[inputId] = !this.filters[inputId];
      this.$emit('change-filter', this.filters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
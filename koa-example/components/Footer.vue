<template>
  <footer class="footer" v-if="todos.length">
    <span class="todo-count"><strong>{{ remaining }}</strong> item<span v-if="remaining > 1">s</span> left</span>
    <ul class="filters">
      <li>
        <nuxt-link to="/" exact>All</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/active">Active</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/completed">Completed</nuxt-link>
      </li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-if="todos.length > remaining">
      Clear completed
    </button>
  </footer>
</template>

<script>
export default {
  computed: {
    todos () {
      return this.$store.getters.allTodos
    },
    actives () {
      return this.$store.getters.activeTodos
    },
    remaining () {
      return this.$store.getters.activeTodos.length
    }
  },
  methods: {
    removeCompleted () {
      this.$store.dispatch('setTodos', this.actives)
    }
  }
}
</script>

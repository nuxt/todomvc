<template>
  <section class="todoapp">
    <todo-header/>
		<section class="main" v-if="todos.length">
			<input class="toggle-all" type="checkbox" @click="allDone">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
        <li v-for="todo in todos" :class="{'completed': todo.completed, 'editing': editedTodo === todo}">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editedTodo = todo">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-if="editedTodo === todo" v-model="editedTodo.title" @blur="editTodo(todo)" @keyup.enter="editTodo(todo)" @keyup.esc="editedTodo = null">
        </li>
			</ul>
		</section>
    <todo-footer/>
	</section>
</template>

<script>
import TodoHeader from '~components/header'
import TodoFooter from '~components/footer'

export default {
  validate ({ params }) {
    return !params.slug || params.slug === 'active' || params.slug === 'completed'
  },
  head () {
    return {
      title: this.$route.params.slug || 'all',
      titleTemplate: 'Nuxt TodoMVC : %s todos'
    }
  },
  mounted () {
    this.$store.commit('fetch', JSON.parse(localStorage.getItem('nuxt-todos') || '[]'))
  },
  data () {
    return {
      editedTodo: null
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: 'save'
    }
  },
  computed: {
    todos () {
      if (this.$route.params.slug === 'active') {
        return this.$store.getters.activeTodos
      }
      if (this.$route.params.slug === 'completed') {
        return this.$store.getters.completedTodos
      }
      return this.$store.getters.allTodos
    }
  },
  methods: {
    allDone () {
      this.$store.commit('allDone')
    },
    editTodo (todo) {
      if (!this.editedTodo.title) {
        this.$store.commit('remove', todo)
      }
      this.editedTodo = null
    },
    removeTodo (todo) {
      this.$store.commit('remove', todo)
    },
    save () {
      localStorage.setItem('nuxt-todos', JSON.stringify(this.todos))
    }
  },
  components: {
    TodoHeader,
    TodoFooter
  }
}
</script>

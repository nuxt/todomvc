import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allTodos (state) {
      return state.todos
    },
    activeTodos (state) {
      return state.todos.filter(todo => !todo.completed)
    },
    completedTodos (state) {
      return state.todos.filter(todo => todo.completed)
    }
  },
  mutations: {
    fetch (state, todos) {
      state.todos = todos
    },
    add (state, todo) {
      state.todos.push(todo)
    },
    remove (state, todo) {
      var i = state.todos.indexOf(todo)
      state.todos.splice(i, 1)
    },
    removeCompleted (state, todos) {
      state.todos = todos
    },
    allDone (state) {
      var value = state.todos.filter(todo => todo.completed).length === state.todos.length
      state.todos.forEach((todo) => {
        todo.completed = !value
      })
    }
  }
})

export default store

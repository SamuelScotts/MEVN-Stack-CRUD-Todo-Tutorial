<template>
  <v-app>

    <!-- CREATE A TODO -->
    <div class="d-flex justify-center">
      <h1 id="addTodo">Add Todo</h1>
    </div>
    <div class="d-flex justify-center">
      <v-col cols="6" style="margin: 0px auto;">
        <v-text-field v-model="newTodo" label="Add Todo" solo></v-text-field>
      </v-col>
    </div>
    <div class="d-flex justify-center">
      <v-btn @click="addTodo()" color="primary">Add Todo</v-btn>
    </div>

    <!-- UNCOMPLETED TODOS -->
    <div class="d-flex justify-center">
      <h1>Uncompleted Todo</h1>
    </div>
    <div v-for="todo in uncompletedTodos" :key="todo._id">
      <v-card class="mx-auto" color="white" dark max-width="800">
        <v-card-text class="font-weight-bold title blue--text">
        {{ todo.title }}
          <v-list-item id="todo-list-item" class="grow">
            <v-btn @click="completeTodo(todo._id)" class="mx-2" small color="green">Done</v-btn>
          <v-btn @click="deleteTodo(todo._id)" class="mx-2" small color="red">Delete</v-btn>
          </v-list-item>
        </v-card-text>
      </v-card>
    </div>

    <!-- COMPLETED TODOS -->
    <div class="d-flex justify-center">
      <h1>Completed ToDo</h1>
    </div>
    <div v-for="todo in completedTodos" :key="todo._id">
      <v-card class="mx-auto" color="blue" dark max-width="800">
        <v-card-text class="font-weight-bold title white--text">
        {{ todo.title }}
          <v-list-item id="todo-list-item" class="grow">
            <v-btn @click="deleteTodo(todo._id)" class="mx-2" small color="red">Delete</v-btn>
          </v-list-item>
        </v-card-text>
      </v-card>
    </div>

  </v-app>
</template>

<script>
import axios from 'axios';

export default {

  data: () => ({
    newTodo: '',
    uncompletedTodos: [],
    completedTodos: [],
  }),

  methods:{
    addTodo(){
      axios
      .post("http://localhost:3000/todo/add", {todo: this.newTodo})
      .then(response => {this.message = response.data;});
    },
    deleteTodo(todoID){
      axios
      .delete("http://localhost:3000/todo/" + todoID)
      .then(response => {console.log(response.data);});
    },
    completeTodo(todoID){
      axios
      .post("http://localhost:3000/todo/complete" + todoID)
      .then(response => {console.log(response.data);});
    },
  },

  created(){
    // FETCH UNCOMPLETED TODO:
    axios
    .get("http://localhost:3000/todo/uncompleted")
    .then(response => (this.uncompletedTodos = response.data))
    .catch(error => console.log(error));

    // FETCH COMPLETED TODO:
    axios
    .get("http://localhost:3000/todo/completed")
    .then(response => (this.completedTodos = response.data))
    .catch(error => console.log(error));
  },

};
</script>

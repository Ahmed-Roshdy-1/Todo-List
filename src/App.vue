<template>
  <div class="todo">
    <div class="title has-text-centered">Todo List Project</div>
    <form @submit.prevent="addTodo">
      <div class="field has-addons mb-5">
        <div class="control">
          <input class="input" type="text" placeholder="Add A Todo..." v-model="newTodoContent" />
        </div>
        <div class="control">
          <button class="button is-info" :disabled="!newTodoContent">Add</button>
        </div>
      </div>
    </form>

    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 is-mobile has-text-right" style="display: flex">
              <button
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
                style="height: 16px"
                @click="editTodo(todo.id)"
              >
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                style="height: 16px"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

const todoCollectionRef = collection(db, "todos"); // firebase refrance

const todosCollectionQuery = query(todoCollectionRef, orderBy("date", "desc"));

const todos = ref([
  // {
  //   id: "id1",
  //   content: "Task =>> 1",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "Task =>> 2",
  //   done: true,
  // },
]);

// get Todos

onMounted(async () => {
  // const querySnapshot = await getDocs(collection(db, "todos"));
  // let fbTodos = [];
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, doc.data());
  //   const todo = {
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done,
  //   };
  //   fbTodos.push(todo);
  // });
  // todos.value = fbTodos;

  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const newTodoContent = ref("");
const addTodo = () => {
  // const newTodo = {
  //   id: uuidv4(),
  //   content: newTodoContent.value,
  //   done: false,
  // };

  // todos.value.unshift(newTodo);
  // newTodoContent.value = "";

  const docRef = addDoc(todoCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });

  newTodoContent.value = "";
};

function deleteTodo(id) {
  // todos.value = todos.value.filter((e) => e.id != id);
  deleteDoc(doc(todoCollectionRef, id));
}

function editTodo(id) {
  // todos.value[i].done = !todos.value[i].done;
  const i = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todoCollectionRef, id), {
    done: !todos.value[i].done,
  });
}
</script>

<style scoped>
@import "node_modules/bulma/css/bulma.min.css";
.todo {
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
}
.field {
  width: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}
.control:first-child {
  width: 70%;
}

.line-through {
  text-decoration: line-through;
}
</style>

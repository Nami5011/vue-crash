<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <TaskListComponent
    :tasks="tasks"
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
  />
</template>

<script>
import TaskListComponent from "../components/Tasks";
import AddTask from "../components/AddTask";
import UrlPath from "../constants/urlPath";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    TaskListComponent,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    // タスク削除
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(UrlPath.API + `/tasks/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    // リマインダートグル
    async toggleReminder(id) {
      // db update
      const tastToToggle = await this.fetchTask(id);
      const updTask = updateReminder(tastToToggle);
      const res = await fetch(UrlPath.API + `/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      const data = await res.json();

      // display update
      this.tasks = this.tasks.map((task) => (task.id === id ? data : task));
      function updateReminder(task) {
        task.reminder = !task.reminder;
        return task;
      }
    },
    // タスク追加
    async addTask(task) {
      const res = await fetch(UrlPath.API + "/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },
    async fetchTasks() {
      const res = await fetch(UrlPath.API + "/tasks");
      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(UrlPath.API + `/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

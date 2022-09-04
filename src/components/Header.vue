<template>
  <header>
    <h1>{{ title }}</h1>
    <TaskButton
      v-show="homePage"
      @btn-click="$emit('btn-click')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'btn-danger' : 'btn-success'"
    />
  </header>
</template>

<script>
import TaskButton from "./Button";
export default {
  name: "app-header",
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    TaskButton,
  },
  computed: {
    homePage() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
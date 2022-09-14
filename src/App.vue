<template>
  <div class="d-flex justify-content-center base">
    <div class="card m-3 px-3 py-4">
      <!-- <AppHeader
        title="Task Tracker"
        @btn-click="toggleAddTask"
        @btn-click-modal="toggleAddTask"
        :showAddTask="showAddTask"
      /> -->
      <AppHeader
        title="Task Tracker"
        @btn-click-modal="toggleAddTask"
        :showAddTask="showAddTask"
      />
      <router-view
        :showAddTask="showAddTask"
        @btn-click-modal="toggleAddTask"
      ></router-view>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      showAddTask: false,
    };
  },
  methods: {
    // フォーム表示切り替え
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css");

.base {
  margin: 0px;
  padding: 0px;
}
.card {
  width: 550px;
  min-width: 250px;
}
@media (max-width: 575.98px) {
  .base {
    min-width: 250px;
  }
  .card {
    min-width: 250px;
    width: 90%;
  }
}
</style>

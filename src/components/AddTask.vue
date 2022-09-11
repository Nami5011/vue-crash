<template>
  <form class="add-form" @submit="onSubmit">
    <div class="form-group">
      <label>Task</label>
      <input
        class="form-control"
        type="text"
        name="text"
        placeholder="Add Task"
        v-model="text"
      />
    </div>
    <div class="form-group">
      <label>Day & Time</label>
      <!-- <input
        class="form-control"
        type="text"
        name="day"
        placeholder="Add Day & Time"
        v-model="day"
      /> -->
      <Datepicker v-model="day" :format="format"></Datepicker>
    </div>
    <div class="form-group d-flex justify-content-center">
      <input
        class="form-check-input"
        type="checkbox"
        id="reminder"
        name="reminder"
        v-model="reminder"
      />
      <label class="form-check-label ms-2" for="reminder">Set Reminder</label>
    </div>
    <div class="m-2 mb-4 d-flex justify-content-center">
      <input type="submit" value="Save Task" class="btn btn-dark px-5" />
    </div>
  </form>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "AddTask",
  components: { Datepicker },
  data() {
    return {
      text: "",
      day: "",
      reminder: false,
    };
  },
  setup() {
    const date = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const HH = date.getHours();
      const mm = date.getMinutes();

      return `${day}/${month}/${year} ${HH}:${mm}`;
    };

    return {
      date,
      format,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.text) {
        alert("Please add a task");
        return;
      }

      const newTask = {
        // id: Math.floor(Math.random() * 10000),
        text: this.text,
        day: this.format(this.day),
        reminder: this.reminder,
      };
      this.$emit("add-task", newTask);

      this.text = "";
      this.day = "";
      this.reminder = false;
    },
  },
};
</script>

<style scoped>
.form-group {
  margin: 0px 20px 20px 20px;
}
</style>
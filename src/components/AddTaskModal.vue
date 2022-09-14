

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <!-- <slot name="header">default header</slot> -->
          </div>

          <div class="modal-body">
            <!-- <slot name="body">default body</slot> -->

            <slot name="body">
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
                  <label class="form-check-label ms-2" for="reminder"
                    >Set Reminder</label
                  >
                </div>

                <div class="m-2 mb-4 d-flex justify-content-center">
                  <input
                    type="submit"
                    value="Save Task"
                    class="btn btn-dark px-5"
                    @click="$emit('close')"
                  />
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer justify-content-center">
            <slot name="footer">
              <div>
                <button class="btn px-5" @click="$emit('close')">CANCEL</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "AddTaskModal",
  components: { Datepicker },
  props: {
    show: Boolean,
  },
  emits: ["close"],
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.form-group {
  margin: 0px 20px 20px 20px;
}

@media (max-width: 575.98px) {
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
  }
}
</style>
<template>
  <div
    class="card-header"
    :class="[task.reminder ? 'reminder' : '', 'task']"
    @dblclick="$emit('toggle-reminder', task.id)"
  >
    <h5>
      {{ task.text }}
      <i class="fas fa-times" @click="$emit('delete-task', task.id)"></i>
    </h5>

    <p>{{ task.day }}</p>
  </div>
</template>

<script>
export default {
  name: "TaskComponent",
  props: {
    task: Object,
  },
};
</script>

<style scoped>
.fas {
  color: red;
}
.task.reminder {
  border-left: 8px solid green;
}
h5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
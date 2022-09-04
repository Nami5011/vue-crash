<template>
  <button class="btn" :class="color" @click="$emit('btn-click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "TaskButton",
  props: {
    text: String,
    color: String,
  },
};
</script>


<template>
  <button
    class="text-gray-500 p-2 uppercase font-bold"
    :class="isActive ? 'bg-gray-900' : 'bg-gray-600'"
    v-text="label"
    @click="activation()"
  ></button>
</template>

<script>
export default {
  name: 'vue-button',
  props: [
    'label',
    'isActive',
  ],
  methods: {
    activation() {
      this.$emit('activation');
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col p-2 justify-center my-4 relative"
    :class="[colors, padding]">

    <span
      class="leading-tight text-center font-bold"
      v-text="message"
      v-for="message in messages"
      :key="message"></span>

    <div
      class="absolute top-0 right-0 leading-none p-1 font-bold cursor-pointer"
      @click="$emit('closeNotification')"
      v-if="!removeCloseButton">x</div>

  </div>
</template>
<script>
export default {
  name: 'Notification',
  props: {
    level: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
    removeCloseButton: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    colors() {
      switch (this.level) {
        case 'error':
          return 'bg-red-300 text-red-900';
        case 'warning':
          return 'bg-orange-300 text-orange-900';
        default:
          return 'bg-gray-900 text-gray-100';
      }
    },
    padding() {
      return this.removeCloseButton ? '' : 'py-4';
    },
  },
};
</script>

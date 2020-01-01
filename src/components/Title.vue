<template>
  <h1 class="font-bold uppercase mb-6 text-xl text-center" v-text="label"></h1>
</template>

<script>
export default {
  name: 'vue-title',
  props: [
    'label',
  ],
};
</script>

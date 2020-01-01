<template>
  <div class="mx-5 flex flex-col h-screen">
    <vue-title :label='title' />
    <div class="flex flex-wrap justify-between items-stretch">
      <div
        class="flex flex-col w-6/12 p-2"
        v-for="(game, index) in games"
        :key="game.id"
      >
        <div
          class="flex flex-col h-full text-left uppercase text-xs font-bold p-4 relative"
          :class="
            index % 3 === 0
            ? 'bg-gray-400 text-gray-900'
            : 'bg-gray-700 text-gray-300'
          "
        >
          <span v-text="game.title" class="pb-5"></span>
          <div class="absolute bottom-0 right-0 p-2">
            <router-link
              class="lowercase underline"
              :to="{ name: 'game', params: {id: game.id} }"
            >Rejoindre</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import VueTitle from '@/components/Title.vue';

export default {
  name: 'dashboard',
  components: {
    VueTitle,
  },
  data() {
    return {
      title: 'Liste des parties',
      games: [],
    };
  },
  created() {
    axios.get(
      `${process.env.VUE_APP_LCB_API_URL}/games`,
      {
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
        },
      },
    )
      .then((response) => {
        this.games = response.data;
      });
  },
};
</script>

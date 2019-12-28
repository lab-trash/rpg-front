<template>
  <div class="mx-5 flex flex-col h-screen">
    <h1 class="font-bold uppercase mb-6 text-xl text-center">Game</h1>
    <div class="flex flex-1">
      <chat class="mx-2" v-if="isChatDisplayed"/>
    </div>
    <div class="flex items-center justify-around h-32 my-2">
      <button
        class="text-gray-500 p-2 uppercase font-bold"
        :class="isChatDisplayed ? 'bg-gray-900' : 'bg-gray-600'"
        @click="displayChat()"
      >
        chat
      </button>
      <button
        class="text-gray-500 p-2 uppercase font-bold"
        :class="isCharacterDisplayed ? 'bg-gray-900' : 'bg-gray-600'"
        @click="displayCharacter()"
      >
        personnage
      </button>
      <button
        class="text-gray-500 p-2 uppercase font-bold"
        :class="isTeamDisplayed ? 'bg-gray-900' : 'bg-gray-600'"
        @click="displayTeam()"
      >
        équipe
      </button>
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat.vue';

export default {
  name: 'game',
  components: {
    Chat,
  },
  data() {
    return {
      isChatDisplayed: true,
      isCharacterDisplayed: false,
      isTeamDisplayed: false,
    };
  },
  methods: {
    displayChat() {
      this.isChatDisplayed = true;
      this.isCharacterDisplayed = false;
      this.isTeamDisplayed = false;
    },
    displayCharacter() {
      this.isChatDisplayed = false;
      this.isCharacterDisplayed = true;
      this.isTeamDisplayed = false;
    },
    displayTeam() {
      this.isChatDisplayed = false;
      this.isCharacterDisplayed = false;
      this.isTeamDisplayed = true;
    },
  },
};
</script>

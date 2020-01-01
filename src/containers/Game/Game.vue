<template>
  <div class="mx-5 flex flex-col h-screen">
    <vue-title :label='game.title' />
    <div class="flex flex-1">
      <chat class="mx-2" v-if="isChatDisplayed"/>
    </div>
    <div class="flex items-center justify-around h-32 my-2">
      <vue-button
        :label='"chat"'
        :isActive='isChatDisplayed'
        @activation="displayChat()"/>
      <vue-button
        :label='"personnage"'
        :isActive='isCharacterDisplayed'
        @activation="displayCharacter()"/>
      <vue-button
        :label='"équipe"'
        :isActive='isTeamDisplayed'
        @activation="displayTeam()"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Chat from '@/components/Chat.vue';
import VueButton from '@/components/Button.vue';
import VueTitle from '@/components/Title.vue';

export default {
  name: 'game',
  components: {
    Chat,
    VueButton,
    VueTitle,
  },
  data() {
    return {
      isChatDisplayed: true,
      isCharacterDisplayed: false,
      isTeamDisplayed: false,
      game: {
        id: this.$route.params.id,
        title: '',
      },
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
  created() {
    axios.get(
      `${process.env.VUE_APP_LCB_API_URL}/games/${this.game.id}`,
      {
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
        },
      },
    )
      .then((response) => {
        this.game = response.data;
      });
  },
};
</script>

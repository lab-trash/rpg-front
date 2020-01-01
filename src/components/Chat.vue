<template>
  <div class="flex flex-col flex-auto">
    <div class="h-64 flex-auto bg-white p-2 pb-4 pt-0 overflow-y-auto" id="chat">
      <p
        class="text-gray-800 text-sm pt-4"
        v-for="message in messages"
        :key="message.id">
        <span
          v-text="message.username"
          :class="isCurrentUser(message.username) ? 'text-green-600' : ''"
          class="font-bold"
          v-if="!message.isGenerated">
        </span>
        <span
          v-text="`${formatMessageDate(message.createdAt)}: `"
          class="text-xs text-gray-600"
          v-if="!message.isGenerated">
        </span>
        <span
          v-text="message.content"
          :class="message.isGenerated ? 'italic text-gray-600' : ''"
        ></span>
      </p>
    </div>
    <form @submit.prevent="sendMessage()" class="flex flex-col">
      <input
        class="mt-4 mb-2 text-gray-800 p-2"
        placeholder="Message"
        type="text"
        v-model="message"
      >
      <button
        class="bg-gray-900 text-gray-500 p-2 uppercase font-bold"
        type="submit"
      >Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: [],
      isNotificationOpen: false,
      errors: [],
      gameId: this.$route.params.id,
    };
  },
  methods: {
    sendMessage() {
      const content = this.message;
      this.message = '';
      axios
        .post(`${process.env.VUE_APP_LCB_API_URL}/chat/messages`, {
          message: content,
          gameId: this.gameId,
        },
        {
          headers: {
            'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
          },
        })
        .then(() => {
        })
        .catch((error) => {
          this.errors = [];
          error.response.data.errors.forEach((element) => {
            this.errors.push(element);
          });

          this.isNotificationOpen = true;
        });
    },
    formatMessageDate(date) {
      return ` (${date.toLocaleDateString()} - ${date.toLocaleTimeString()})`;
    },
    scrollToEnd() {
      const container = this.$el.querySelector('#chat');
      container.scrollTop = container.scrollHeight;
    },
    isCurrentUser(username) {
      return username === this.$store.getters.user.name;
    },
  },
  created() {
    axios.get(
      `${process.env.VUE_APP_LCB_API_URL}/chat/messages/${this.gameId}`,
      {
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
        },
      },
    )
      .then((response) => {
        const messages = response.data;

        this.messages = messages.map(data => ({
          id: data.id,
          username: data.emitter.name,
          content: data.content,
          createdAt: new Date(data.createdAt),
          isGenerated: data.isGenerated,
        }));
      });

    const url = new URL('https://mercure-rpg.herokuapp.com/.well-known/mercure');
    url.searchParams.append('topic', `chat/messages/${this.gameId}`);

    const eventSource = new EventSource(url);

    const that = this;
    // The callback will be called every time an update is published
    eventSource.onmessage = (e) => {
      const messageData = JSON.parse(e.data);

      that.messages.push({
        id: messageData.id,
        username: messageData.emitter.name,
        content: messageData.content,
        createdAt: new Date(messageData.createdAt),
        isGenerated: messageData.isGenerated,
      });

      if (!this.isCurrentUser(messageData.emitter.name)) {
        // eslint-disable-next-line no-new
        new Notification(messageData.content);
      }
    };
  },
  updated() {
    this.scrollToEnd();

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  },
};
</script>

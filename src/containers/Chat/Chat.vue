<template>
  <div id="chat" class="container mx-auto flex flex-col w-2/5">
    <h1 class="font-bold uppercase mb-6 text-xl text-center">Chat</h1>
    <div class="h-64 bg-white p-2 pb-4 pt-0 overflow-y-auto">
      <p
        class="text-gray-800 text-sm pt-4"
        v-for="message in messages"
        :key="message.id">
        <span v-text="message.username" class="font-bold"></span> : {{ message.content }}</p>
    </div>
    <input
      class="mt-4 mb-2 text-gray-800 p-2"
      placeholder="Message"
      type="text"
      v-model="message"
    >
    <button
      class="mb-2 bg-gray-900 text-gray-500 p-2 uppercase font-bold"
      @click="sendMessage()"
    >Envoyer</button>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: [],
      isNotificationOpen: false,
      errors: [],
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('sendMessage', {
        message: this.message,
      })
        .then(() => {
          this.message = '';
        })
        .catch((error) => {
          this.errors = [];
          error.response.data.errors.forEach((element) => {
            this.errors.push(element);
          });

          this.isNotificationOpen = true;
        });
    },
  },
  created() {
    const url = new URL('https://mercure-rpg.herokuapp.com/.well-known/mercure');
    url.searchParams.append('topic', 'chat/messages');
    // The URL class is a convenient way to generate URLs such as https://example.com/.well-known/mercure?topic=https://example.com/books/{id}&topic=https://example.com/users/dunglas

    const eventSource = new EventSource(url);

    const that = this;
    // The callback will be called every time an update is published
    eventSource.onmessage = (e) => {
      const messageData = JSON.parse(e.data);

      that.messages.push({
        id: e.lastEventId,
        username: messageData.username,
        content: messageData.message,
      });
    };
  },
};
</script>

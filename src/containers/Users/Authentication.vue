<template>
  <div class="container mx-auto">
    <h1 class="font-bold uppercase text-xl text-center" v-text="title"></h1>
    <form @submit.prevent="auth()" class="flex flex-col mx-5">
      <div class="notification-wrapper" v-if="isNotificationOpen">
        <notification
          :level="'error'"
          :messages="errors"
          @closeNotification="closeNotification()"
        ></notification>
      </div>
      <input
        autocomplete="username"
        class="mt-4 mb-2 text-gray-800 p-2"
        placeholder="Nom d'invocateur"
        type="text"
        v-model="name"
      >
      <input
        autocomplete="new-password"
        class="mb-2 text-gray-800 p-2"
        placeholder="Mot de passe"
        type="password"
        v-model="password"
      >
      <button
        class="mb-2 bg-gray-900 text-gray-500 p-2 uppercase font-bold"
        type="submit"
        v-text="submit"
      ></button>
    </form>
    <p
      class="text-gray-100 underline cursor-pointer mx-auto text-center"
      v-text="link"
      @click="toggleAuthMode()"
    ></p>
  </div>
</template>
<script>
import Notification from '@/components/Notification.vue';

export default {
  name: 'Authentication',
  data() {
    return {
      name: '',
      password: '',
      AuthModeConnection: true,
      isNotificationOpen: false,
      errors: [],
    };
  },
  components: {
    Notification,
  },
  computed: {
    title() {
      return this.AuthModeConnection ? 'Connexion' : 'Création de compte';
    },
    link() {
      return this.AuthModeConnection ? 'Pas encore de compte ? Inscris-toi ici !' : 'Déjà un compte ? Connecte-toi ici !';
    },
    submit() {
      return this.AuthModeConnection ? 'Se connecter' : 'Créer un compte';
    },
    registerUser() {
      return {
        name: this.name,
        password: this.password,
      };
    },
  },
  methods: {
    toggleAuthMode() {
      this.closeNotification();
      this.AuthModeConnection = !this.AuthModeConnection;
    },
    auth() {
      if (this.AuthModeConnection) {
        this.signIn();
      } else {
        this.signUp();
      }
    },
    signIn() {
      this.$store.dispatch('signIn', {
        name: this.name,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'game' });
        })
        .catch((error) => {
          this.errors = [];
          error.response.data.errors.forEach((element) => {
            this.errors.push(element);
          });

          this.isNotificationOpen = true;
        });
    },
    signUp() {
      this.$store.dispatch('signUp', this.registerUser)
        .then(() => {
          this.$router.push({ name: 'game' });
        })
        .catch((error) => {
          this.errors = [];
          error.response.data.error.forEach((element) => {
            this.errors.push(element);
          });

          this.isNotificationOpen = true;
        });
    },
    closeNotification() {
      this.isNotificationOpen = false;
      this.errors = [];
    },
  },
};
</script>

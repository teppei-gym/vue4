<template>
  <div>
    <h1>Login</h1>
    <div class="form-wrap">
      <label for="email">Emeil</label>:
      <input id="emai" type="email" v-model="email" />
    </div>
    <div class="form-wrap">
      <label for="password">password</label>:
      <input id="password" type="password" v-model="password" />
    </div>
    <p>{{ errorMessage }}</p>
    <button class="btn is-blue" @click="signIn()">Login</button>
    <div>
      <router-link :to="{ name: 'register' }">新規作成はこちらから</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    signIn() {
      if (!this.email || !this.password) {
        this.message = '未入力項目があります';
        return;
      } else {
        this.message = '';
      }

      this.$store.dispatch('signIn', this);
    },
  },
  computed: {
    errorMessage() {
      return this.message;
    },
  },
};
</script>

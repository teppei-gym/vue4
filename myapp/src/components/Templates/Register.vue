<template>
  <div>
    <h1>新規登録画面</h1>
    <div class="form-wrap">
      <label for="name">user name</label>:
      <input id="name" type="text" v-model="name" />
    </div>
    <div class="form-wrap">
      <label for="email">Emeil</label>:
      <input id="emai" type="email" v-model="email" />
    </div>
    <div class="form-wrap">
      <label for="password">password</label>:
      <input id="password" type="password" v-model="password" />
    </div>
    <p>{{ getErrorMessage }}</p>
    <button class="btn is-blue" @click="register()">新規登録</button>
    <div>
      <router-link :to="{ name: 'login' }">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  computed: {
    getErrorMessage() {
      return this.$store.getErrorMessage;
    },
  },
  methods: {
    register() {
      this.$store.dispatch('register', this);
    },
  },
};
</script>

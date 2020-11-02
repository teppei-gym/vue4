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
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button class="btn is-blue" @click="signIn()">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    signIn() {
      if (!this.email || !this.password) {
        this.errorMessage = "未入力項目があります";
        return;
      }

      this.errorMessage = "";

      this.$store.dispatch("signIn", this);
    }
  }
};
</script>

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
    <button class="btn is-blue" @click="signIn()">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      if (this.email === "" || this.password === "") {
        alert("未入力項目があります");
        return;
      }

      this.$store.dispatch("signIn", this);
    }
  }
};
</script>

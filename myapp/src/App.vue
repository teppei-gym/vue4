<template>
  <div id="app">
    <template v-if="auth">
      <button class="btn is-blue" @click="logout()">ログアウト</button>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      auth: false
    };
  },
  methods: {
    logout() {
      console.log("todo");
    }
  },
  created() {
    const _this = this;

    firebase.auth().onAuthStateChanged(user => {
      if (user) _this.auth = true;
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form-wrap {
  margin: 20px;
}
.form-wrap > label {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.btn {
  cursor: pointer;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}

.is-blue {
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
}
</style>

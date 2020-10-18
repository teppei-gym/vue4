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
    <p>{{ errorMessage }}</p>
    <button class="btn is-blue" @click="register()">新規登録</button>
    <div>
      <router-link :to="{ name: 'login' }">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    register() {
      const _this = this;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function(results) {
          results.user.updateProfile({
            displayName: _this.name,
          });

          _this.$router.push({ name: 'users' });
        })
        .catch(function(error) {
          _this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
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

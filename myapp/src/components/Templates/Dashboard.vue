<template>
  <div>
    <template v-if="user">
      <button class="btn is-blue" @click="logout()">ログアウト</button>
    </template>
    <h2>
      ようこそ {{ user.name }} さん<span>残高：{{ user.wallet }}</span>
    </h2>
    <h1>ユーザー一覧</h1>
    <!-- todo -->
    <!-- <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th colspan="3">name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, key) in users" :key="key">
            <td>{{ val.name }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      users: {},
    };
  },
  methods: {
    logout() {
      console.log('todo');
    },
  },
  beforeCreate() {
    this.$store.dispatch('getUsers').then(({ currentUser, dataList }) => {
      console.log(currentUser);
      this.user = currentUser;
      this.users = dataList;
    });
  },
};
</script>

<style scoped>
.table-wrap {
  display: inline-block;
}

h2 > span {
  margin-left: 100px;
}
</style>

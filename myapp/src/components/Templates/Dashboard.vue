<template>
  <div>
    <h2>
      ようこそ {{ user.name }} さん<span>残高：{{ user.wallet }}</span>
      <template v-if="user">
        <button class="btn is-blue" @click="logout()">ログアウト</button>
      </template>
    </h2>
    <h1>ユーザー一覧</h1>
    <!-- todo -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th colspan="3">name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, key) in usersInfo" :key="key">
            <td>{{ val.name }}</td>
            <td>
              <button
                class="button is-info"
                @click="wallet"
                :data-target-user-name="val.name"
                :data-user-id="key"
              >
                walletを見る
              </button>
            </td>
            <td>
              <button
                class="button is-info"
                @click="confirm"
                :data-user-id="key"
              >
                送る
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <transition name="fade" type="animation">
      <div v-if="sendShow">
        <div class="modal">
          <div class="modal-wrap">
            <div class="modal-content">
              <div class="send-warp">
                <div class="cancel-wrap">
                  <span class="cancel" @click="cancel">✖︎</span>
                </div>
                <div class="send">
                  <div>
                    <p>あなたの残高：</p>
                    <p>送る金額</p>
                    <p>{{ validateMessage }}</p>
                    <input type="text" v-model="sendWallet" />
                  </div>
                  <div class="input-wrap"></div>
                </div>
                <div class="submit-wrap">
                  <button class="button is-denger" @click="send">送信</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="walletShow">
        <div class="modal">
          <div class="modal-wrap">
            <div class="modal-content">
              <div class="send-warp">
                <div class="send">
                  <div>
                    <p>{{ userName }}の残高： {{ balance }}</p>
                  </div>
                  <div class="input-wrap"></div>
                </div>
                <div class="submit-wrap">
                  <button class="button is-denger" @click="walletShow = false">
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendShow: false,
      walletShow: false,
      sendWallet: '',
      validate: '',
      recipientUserId: '',
      targetUserName: '',
      user: {},
      users: {},
      balance: {},
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    confirm(e) {
      this.sendShow = true;
      this.targetUserName = '';
      this.recipientUserId = e.target.dataset.userId;
    },
    cancel() {
      this.sendShow = false;
      this.recipientUserId = '';
    },
    send() {
      if (!Number(this.sendWallet)) {
        this.validate = '半角かつ数字で入力してください。';
        return;
      }
      // 初期化
      this.validate = '';
      if (this.user.wallet - this.sendWallet < 0) {
        this.validate = '残高以上の金額を設定は送る事ができません。';
      }
      const _this = this;
      const data = {
        recipientUserId: _this.recipientUserId,
        wallet: _this.sendWallet,
        senderUserMail: _this.user.email,
      };
      this.$store.dispatch('update', data).then(() => {
        this.$store.dispatch('getUsers').then(({ currentUser, dataList }) => {
          this.user = currentUser;
          this.users = dataList;
        });
        this.sendShow = false;
      });
    },
    wallet(e) {
      const userId = e.target.dataset.userId;
      this.targetUserName = e.target.dataset.targetUserName;
      this.$store.dispatch('getUser', userId).then((user) => {
        this.balance = user.wallet;
      });
      this.walletShow = true;
    },
  },
  computed: {
    userInfo() {
      return this.user;
    },
    usersInfo() {
      return this.users;
    },
    validateMessage() {
      return this.validate;
    },
    userName() {
      return this.targetUserName;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getUsers').then(({ currentUser, dataList }) => {
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
  margin: 0 50px 0 100px;
}

.button {
  background-color: #fff;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
}

.is-info {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}

.is-denger {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}

.send-warp {
  border: solid 1px #f5f5f5;
  background-color: #fff;
  margin: 0 auto;
  width: 400px;
}

.send {
  margin: 30px;
}

.cancel-wrap {
  display: flex;
  justify-content: flex-end;
  padding-right: 5px;
}

.cancel {
  cursor: pointer;
}

.submit-wrap {
  background-color: #f5f5f5;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}

.modal {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 1;
}

.modal-wrap {
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-content {
  overflow: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.fade-enter-active {
  animation: fade-in 0.5s;
}

.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    register({ dispatch }, user) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((results) => {
          results.user.updateProfile({
            displayName: user.name,
          });

          dispatch('createUser', user);
          user.$router.push({ name: 'dash' });
        }).catch((e) => {
          alert(e.message);
        });
    },
    signIn(context, user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          user.$router.push({ name: 'dash' });
        })
        .catch(function () {
          alert(
            'ログインに失敗しました。メールアドレスとパスワードを再度入力してください'
          );
        });
    },
    logout() {
      firebase.auth().signOut();
    },
    auth() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) resolve(user);
        })
      });
    },
    createUser(context, user) {
      const room = 'users';
      firebase.database().ref(room).push({
        name: user.name,
        email: user.email,
        wallet: 2000,
      });
    },
    getUsers(context) {
      return new Promise(resolve => {
        const room = 'users';
        firebase.database().ref(room).on('value', data => {
          context.dispatch('auth').then((user) => {
            if (data) {
              let dataList = data.val();
              let currentUser = {};

              for (let data in dataList) {
                if (dataList[data].email === user.email) {
                  currentUser = dataList[data];
                  currentUser.id = data;
                  delete dataList[data];
                }
              }

              resolve({ currentUser, dataList });
            }
          });
        });
      })
    },
    getUser(context, userId) {
      return new Promise(resolve => {
        const room = 'users/' + userId;
        firebase.database().ref(room).once('value', user => {
          resolve(user.val());
        });
      })
    },
    update({ dispatch }, { recipientUserId, wallet, senderUserId }) {
      return new Promise(resolve => {
        const room = 'users';
        dispatch('getUser', senderUserId).then(sender => {
          dispatch('getUser', recipientUserId).then(recipientUser => {
            const recipientUpdatedWallet = Number(wallet) + Number(recipientUser.wallet);
            const senderUpdatedWallet = Number(sender.wallet) - Number(wallet);
            const senderPath = senderUserId + '/wallet';
            const recipientPath = recipientUserId + '/wallet';

            firebase.database().ref(room).update({
              [senderPath]: senderUpdatedWallet,
              [recipientPath]: recipientUpdatedWallet
            }).then(() => {
              resolve();
            })
          }).catch((error) => {
            console.log(error);
          });
        })
      });
    },
  },
});
<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        class="my-5"
        fill-height
      >
        <v-card outlined width="450px" class="mx-auto" shaped elevation="3">
            <div class="mt-3 pt-3 text-center">
                <v-avatar class="text-center mx-auto" dark>
                    <v-img
                        :src="`${baseUrl}system_reporting/error-reporting.png`"
                    ></v-img>
                </v-avatar>
            </div>
            <div class="mt-3 pt-3 mb-0 pb-0"><p class="text-center headline font-weight-light">Sistem Pengecekkan Bug</p></div>
            <div><p class="text-center headline">Login</p></div>
            <v-alert
                type="error"
                v-if="isError"
                dense
                class="mx-4"
            >
                {{ this.errorMessage }}
            </v-alert>
            <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit="login"
                  onSubmit="return false;"
                >
                  <v-text-field
                      label="Username"
                      outlined
                      v-model="selectedUsers"
                      class="mb-4"
                      :rules="nameRules"
                      required
                  />
                </v-form>
                <br>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text type="submit" outlined class="mr-2" @click="login"><v-icon color="pink darken-4" class="mr-2">mdi-account-arrow-right</v-icon>Login</v-btn>
            </v-card-actions>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Vue from 'vue/dist/vue.esm.js'
import persistentState from 'vue-persistent-state'

export default {
  props: {
    source: String,
  },
  data: () => ({
    showPassword: false,
    selectedUsers: '',
    valid: true,
    baseUrl: process.env.BASE_URL,
    userData: '',
    isError: false,
    password: '',
    showPass: false,
    error: false,
    errorMessage: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    nameRules: [
      v => !!v || 'Username is required',
    ]
  }),
  methods: {
    login () {
        const payloads = {
          userData: this.selectedUsers,
          password: '1nt1m4pd3v'
        }
        const dataUser = this.getUserData.find(user => user.name.toLowerCase() == this.selectedUsers.toLowerCase())
        
        if(this.selectedUsers && dataUser){
          this.$store.dispatch('LOAD_USER_LOGIN', payloads).then(() => {

            let initialState = {
              userData: {
                id: dataUser.id,
                name: this.selectedUsers
              },
            }

            Vue.use(persistentState, initialState)

            this.$router.push({path:'/dashboard'})
          })
        } else if(this.selectedUsers && !dataUser){
          this.isError = true
          this.errorMessage = 'Username doesnt matching'
          // console.log('Username doesnt matching')
        } else {
          this.$refs.form.validate()
        }
    }
  },
  watch: {
    // selectedUsers(value){
    //   console.log(value);
    // }
  },
  computed: {
      getUserData() {
        return this.$store.getters.getUsers
      },
      userName() {
        return user => `${user.name}`
      }
  },
  created() {
    this.$store.dispatch('LOAD_USERS_DATA')
    
  },
}
</script>

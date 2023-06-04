<template>
<div>
<v-card
    class="mx-auto"
    v-if="isFetched"
    min-height="120px"
    style="overflow-x : scroll"
    
>
    <v-toolbar
        flat
        color="transparent"
        class="black--text"
    >
        <v-subheader> List issues of TMS - Australia</v-subheader>

        <v-spacer></v-spacer>

        <v-text-field
            class="mr-2"
            clearable
            flat
            dense
            hide-details
            label="Search"
            color="grey"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
        >
        </v-text-field>

        <v-select
            class="mr-2"
            ref="sortByStatus"
            v-model="sortByStatus"
            :items="statusSort"
            label="Sort Status"
            color="grey"
            placeholder="Sort by status"
            required
            hide-details
            prepend-inner-icon="mdi-filter-variant"
            dense
            clearable
            solo-inverted
            flat
        ></v-select>

        <v-select
            ref="sortByDate"
            v-model="sortByDate"
            :items="dateSort"
            label="Sort Date"
            color="grey"
            placeholder="Sort by date"
            required
            hide-details
            prepend-inner-icon="mdi-filter-variant"
            dense
            clearable
            solo-inverted
            flat
        ></v-select>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list three-line class="py-0">
        <v-list-group
        v-for="item in TMSAU" :key="item.id"
        @click="openTimeline(item)"
        >
        <template v-slot:activator >
        <v-list-item active-class="blue">
            <v-list-item-avatar color="orange" size="36" class="mt-5">
            <span class="white--text title mx-auto">
                {{item.count}} <br>
            </span>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>
                <span class="font-weight-bold" v-if="item.status == 0 || item.status == 1 || item.status == 2">{{item.project+'#'+item.id}}</span>
                <span class="font-weight-light" v-if="item.status == 3 || item.status == 4">{{item.project+'#'+item.id}}</span>
                <v-chip
                class="ma-2"
                small
                color="green"
                outlined
                v-if="item.priority == 1"
                >
                Normal
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="red"
                outlined
                v-if="item.priority == 2"
                >
                High
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="orange"
                outlined
                v-if="item.priority == 0"
                >
                Low
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="primary"
                outlined
                v-if="item.status == 0"
                >
                Open
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="grey"
                outlined
                v-if="item.status == 3"
                >
                Closed
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="warning"
                outlined
                v-if="item.status == 1 && !item.user"
                >
                Pending by System
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="warning"
                outlined
                v-if="item.status == 1 && item.user"
                >
                Pending by {{item.user.name}}
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="purple"
                outlined
                v-if="item.status == 2 && !item.user"
                >
                Checking by System
                </v-chip>
                <v-chip
                class="ma-2"
                small
                color="purple"
                outlined
                v-if="item.status == 2 && item.user"
                >
                Checking by {{item.user.name}}
                </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-2"></v-divider>
        </template>
        <v-list-item>
        <v-card elevation="0" outlined min-width="100%" v-if="loadClick">
            <v-skeleton-loader type="article">
            </v-skeleton-loader>
        </v-card>
        <v-card elevation="0" outlined min-width="100%" max-width="100%" v-if="!loadClick">
            <v-card-text class="mr-3 pl-2">
                <div class="text-lg-left" v-if="item.user"><b>Assignee : </b> {{item.user.name}}</div>
                <div class="text-lg-left" v-if="item.priority == 2"><b>Priority : </b> High</div>
                <div class="text-lg-left" v-if="item.priority == 1"><b>Priority : </b> Normal</div>
                <div class="text-lg-left" v-if="item.priority == 0"><b>Priority : </b> Low</div>
                <div class="text-lg-left"><b>Crated At : </b> {{ date(item.created_at) }}</div>
                <div class="text-lg-left"><b>Last Occured : </b> {{ date(item.last_occured) }}</div>
                <div class="text-lg-left" v-if="item.content_obj"><b>User info : </b> {{item.content_obj.userdata}}</div>
                <div class="text-lg-left" v-if="item.content_obj"><b>Formatted : </b> {{item.content_obj.formatted}}</div>
                <div class="text-lg-left" v-if="item.content_obj" style="overflow-x: scroll">
                    <b>Stack Trace : </b> <pre>{{item.content_obj.trace}}</pre>
                </div>
                <div class="text-lg-left" v-if="item.content" style="overflow-x: scroll">
                    <b>Stack Trace : </b> <pre>{{item.content}}</pre>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="mx-2">
            <v-col cols="12" md="4" class="ml-2 mr-2" v-if="isAlert(item)">
                <v-alert
                dense
                type="info"
                color="blue"
                class="mt-2 mb-0"
                >
                This issue is still <strong>Open</strong>
                </v-alert>
            </v-col>
            <v-col v-if="isAssigne()" cols="12" md="4">
                <v-select
                class="mt-2 mb-0"
                dense
                :items="listUsers"
                :item-text="user => `${user.name}`"
                :item-value="user => `${user.id}`"
                v-model="selectAssigne"
                clearable
                max-width= "80%" 
                label="Assignee"
                outlined
                hide-details
                color="blue"
                prepend-inner-icon="mdi-account-multiple-plus"
                ></v-select>
            </v-col>
            <v-spacer v-if="isAlert(item)"></v-spacer>
            <v-col v-if="isAssigne()" cols="6" md="2" class="mt-2 mx-0">
                <v-btn
                outlined
                :loading="loadAssign"
                :disabled="loadAssign"
                @click="assignUser(item)"
                block
                >
                ASSIGN USER
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            <v-col  v-if="item.status == 0 || item.status == 1" cols="6" md="2" class="mt-2 mx-0">
                <v-btn
                color="purple"
                outlined
                :loading="loadCheking"
                :disabled="loadCheking"
                @click="checkingIssue(item)"
                block
                >
                START CHECKING
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            <v-col v-if="item.status == 0" cols="6" md="2" class="mt-2 mx-0">
                <v-btn
                :loading="loadPending"
                :disabled="loadPending"
                color="primary"
                outlined
                @click="pendingIssue(item)"
                block
                >
                CHECK LATER
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            <v-col v-if="item.status == 2 || item.status == 1" cols="6" md="2" class="mt-2 mx-0">
                <v-btn
                :loading="loadClosed"
                :disabled="loadClosed"
                color="green"
                outlined
                block

                @click="closedIssue(item)"
                v-if="item.status == 2 || item.status == 1"
                >
                CLOSE ISSUE
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            <v-col cols="6" md="2" class="mt-2 mx-0" v-if="item.status == 0 || item.status == 1 || item.status == 2">
                <v-btn
                :loading="loadIgnored"
                :disabled="loadIgnored"
                color="red"
                block
                outlined
                @click="ignoredIssue(item)"
                >
                IGNORED ISSUE
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            <v-col cols="6" md="2" class="mt-2 mx-0" v-if="item.status == 3 || item.status == 4">
                <v-btn
                :loading="loadReopen"
                :disabled="loadReopen"
                color="green"
                block
                outlined
                @click="reopenIssue(item)"
                >
                REOPEN ISSUE
                <template v-slot:loader>
                    <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                    </span>
                </template>
                </v-btn>
            </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-card-subtitle v-if="histories.length"> Recent Updates</v-card-subtitle>
            <v-timeline
            :dense="dense"
            class="mr-3 mb-2"
            v-if="histories.length"
            >
            <v-timeline-item
                :fill-dot="fillDot"
                :icon="icon ? 'mdi-account' : ''"
                :right="right"
                small
                v-for="history in histories"
                :key="history.id"
            >
                <v-card class="elevation-2 mr-2">
                <v-card-text>
                    {{formatDesc(history)}} on {{date(history.created_at)}}
                </v-card-text>
                </v-card>
            </v-timeline-item>

            </v-timeline>
        </v-card>
        </v-list-item>
        <v-divider class="mt-2"> </v-divider>
        </v-list-group>
    </v-list>
    <v-alert class="mx-3 mb-3" v-if="!TMSAU.length" type="error">
        There's no data
    </v-alert>
</v-card>
    <v-card v-if="isLoading">
        <v-skeleton-loader
            class="mx-auto"
            type="acticle, card-heading, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
        ></v-skeleton-loader>
    </v-card>
</div>
</template>

<script>
const store = require('store')

import moment from 'moment'

  export default {
    data () {
      return {
        tab: null,
        titles: [
          'ALL Issue', 'HAWK-ID', 'HAWK-AU', 'HAWK-CC', 'HAWK-QCS', 'HAWK-SNTR', 'TMS-AU'
        ],
        tabs: [
          { id: 1, name: "Task", route: `/detail` },
          { id: 2, name: "Project", route: `/detail/project` }
        ],
        status_checking: 0,
        dense: true,
        loadClick: true,
        fillDot: true,
        alert : false,
        assignee: false,
        loadCheking: false,
        loadPending: false,
        activeTab: null,
        loadReopen: false,
        loadAssign: false,
        selectAssigne: '',
        loadClosed: false,
        statusSort: ['Open', 'Pending', 'Checking', 'Closed'],
        dateSort: ['Newest', 'Oldest'],
        sortByStatus: null,
        sortByDate: null,
        loadIgnored: false,
        loader: null,
        icon: true,
        right: true,
        histories: [],
        search: '',
      }
    },
    computed: {
      getDetailData() {
        const dataDetail = this.$store.getters.getActiveIssue;
        return dataDetail;
      },
      listTMSAU() {
        return this.getDetailData.filter(data => data.project == 'TMS-AU');
      },
      loadActive() {
        return this.$store.getters.loadActive
      },
      isFetched() {
        return this.loadActive == 'LOADED'
      },
      isLoading() {
        return this.loadActive == 'LOADING'
      },
      TMSAU () {
        var data = []
        if (!this.search && !this.sortByStatus && !this.sortByDate) {
          data =  this.listTMSAU
        } else if (this.search && !this.sortByStatus && !this.sortByDate){
          const search = this.search.toLowerCase();
          return this.listTMSAU.filter(item => {
            let matchContent = false
            const matchTitle =  item.title.toLowerCase().indexOf(search) > -1
            const matchID =  item.project+'#'+item.id
            const matchName = matchID.toString().toLowerCase().indexOf(search) > -1

            if (item.content_obj) {
              if (item.content_obj.trace) {
                matchContent = item.content_obj.trace.toLowerCase().indexOf(search) > -1
              } else {
                matchContent = false
              }
            }

            return matchContent || matchTitle || matchName
          })
        } else if(this.sortByStatus && !this.search && !this.sortByDate){
          if(this.sortByStatus === 'Open'){
            return this.listTMSAU.filter(item => item.status == 0);
          } else if(this.sortByStatus === 'Pending'){
            return this.listTMSAU.filter(item => item.status == 1)
          } else if(this.sortByStatus === 'Checking'){
            return this.listTMSAU.filter(item => item.status == 2)
          } else if(this.sortByStatus === 'Closed'){
            return this.listTMSAU.filter(item => item.status == 3)
          } else {
            return this.listTMSAU
          }
        } else if(this.search && this.sortByStatus){
          const search = this.search.toLowerCase();
          const searchFunc = this.listTMSAU.filter(item => {
            let matchContent = false
            const matchTitle =  item.title.toLowerCase().indexOf(search) > -1
            const matchID =  item.project+'#'+item.id
            const matchName = matchID.toString().toLowerCase().indexOf(search) > -1

            if (item.content_obj) {
              if (item.content_obj.trace) {
                matchContent = item.content_obj.trace.toLowerCase().indexOf(search) > -1
              } else {
                matchContent = false
              }
            }

            return matchContent || matchTitle || matchName
          })
          
          if(this.sortByStatus === 'Open'){
            return searchFunc.filter(item => item.status == 0)
          } else if(this.sortByStatus === 'Pending'){
            return searchFunc.filter(item => item.status == 1)
          } else if(this.sortByStatus === 'Checking'){
            return searchFunc.filter(item => item.status == 2)
          } else if(this.sortByStatus === 'Closed'){
            return searchFunc.filter(item => item.status == 3)
          }
        } else if(this.sortByDate && !this.search && !this.sortByStatus) {
          if(this.sortByDate === 'Newest'){
            const newest = this.listTMSAU;
            newest.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key2 < key1) {
                  return -1;
              } else if (key2 == key1) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return newest;
          } else if(this.sortByDate === 'Oldest'){
            const oldest = this.listTMSAU;
            oldest.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key1 < key2) {
                  return -1;
              } else if (key1 == key2) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return oldest;
          } else {
            return this.listTMSAU
          }
        } else if(this.sortByStatus && this.sortByDate && !this.search) {
          if(this.sortByStatus === 'Open' && this.sortByDate === 'Newest'){
            const data = this.listTMSAU.filter(item => item.status == 0);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key2 < key1) {
                  return -1;
              } else if (key2 == key1) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Open' && this.sortByDate === 'Olders'){
            const data = this.listTMSAU.filter(item => item.status == 0);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key1 < key2) {
                  return -1;
              } else if (key1 == key2) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Pending' && this.sortByDate === 'Newest'){
            const data = this.listTMSAU.filter(item => item.status == 1);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key2 < key1) {
                  return -1;
              } else if (key2 == key1) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Pending' && this.sortByDate === 'Olders'){
            const data = this.listTMSAU.filter(item => item.status == 1);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key1 < key2) {
                  return -1;
              } else if (key1 == key2) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Checking' && this.sortByDate === 'Newest'){
            const data = this.listTMSAU.filter(item => item.status == 2);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key2 < key1) {
                  return -1;
              } else if (key2 == key1) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Checking' && this.sortByDate === 'Oldest'){
            const data = this.listTMSAU.filter(item => item.status == 2);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key1 < key2) {
                  return -1;
              } else if (key1 == key2) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Closed' && this.sortByDate === 'Newest'){
            const data = this.listTMSAU.filter(item => item.status == 3);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key2 < key1) {
                  return -1;
              } else if (key2 == key1) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else if(this.sortByStatus === 'Closed' && this.sortByDate === 'Oldest'){
            const data = this.listTMSAU.filter(item => item.status == 3);
            data.sort((a,b) => {
              var key1 = new Date(a.created_at);
              var key2 = new Date(b.created_at);
              if (key1 < key2) {
                  return -1;
              } else if (key1 == key2) {
                  return 0;
              } else {
                  return 1;
              }
            });
            return data;
          } else {
            return this.listTMSAU
          }
        }

        return data
      },
      countAll() {
        const datas = this.getDetailData.length;
        const data = " (" + datas + ")"
        return data
      },
      listUsers() {
        const listUser = this.$store.getters.getUsers;
        return listUser;
      },
    },
    created() {
      this.$store.dispatch('LOAD_ACTIVE_ISSUE')
      this.$store.dispatch('LOAD_USERS_DATA')
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 2000)

        this.loader = null
      },
    },
    methods: {
      date : (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      },
      formatDesc : (history) => {
        return history.description;
      },
      isAlert(item) {
        const dataUser = this.$store.getters.getUsers.find(user => user.id == store.get('userData').id)
        if(dataUser){
          if(dataUser.role == 'developer' && item.status == 0){
            this.alert = true
            return this.isAlert
          }
        }
      },
      isAssigne() {
        const dataUser = this.$store.getters.getUsers.find(user => user.id == store.get('userData').id)
        if(dataUser){
          if(dataUser.role == 'system' || dataUser.role == 'admin' || dataUser.role == 'reporter'){
              this.assignee = true
              return this.assignee
          }
        }
      },
      assignUser(item) {
        this.loader = 'loadAssign'
        const id = item.id
        const status = item.status
        const user_id = this.selectAssigne
        const act_user = user_id
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id,
        });
        this.selectAssigne = ''
      },
      openTimeline (item) {
        const messages_id = item.id
        this.$http.get(`${process.env.VUE_APP_API_URL}/histories/${messages_id}`)
          .then(
            (response) => {
              this.histories = response.data;
              this.loadClick = false
            }
          )
      },
      checkingIssue (item) {
        this.loader = 'loadCheking'
        const id = item.id
        const status = 2
        let act_user = 99
        let user_id = 99
        let act_state = store.get('userData').id ? store.get('userData').id : 99
        let act_id = store.get('userData').id ? store.get('userData').id : 99

        if(act_state && user_id){
          act_user = act_state,
          user_id = act_id
        }
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id
        });
      },
      reopenIssue (item) {
        this.loader = 'loadReopen'
        const id = item.id
        const status = 0
        let act_user = 99
        let user_id = 99
        let act_state = store.get('userData').id ? store.get('userData').id : 99
        let act_id = store.get('userData').id ? store.get('userData').id : 99

        if(act_state && user_id){
          act_user = act_state,
          user_id = act_id
        }
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id
        });
      },
      pendingIssue (item) {
        this.loader = 'loadPending'
        const id = item.id
        const status = 1
        let act_user = 99
        let user_id = 99
        let act_state = store.get('userData').id ? store.get('userData').id : 99
        let act_id = store.get('userData').id ? store.get('userData').id : 99

        if(act_state && user_id){
          act_user = act_state,
          user_id = act_id
        }
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id
        });
      },
      closedIssue (item) {
        this.loader = 'loadClosed'
        const id = item.id
        const status = 3
        let act_user = 99
        let user_id = 99
        let act_state = store.get('userData').id ? store.get('userData').id : 99
        let act_id = store.get('userData').id ? store.get('userData').id : 99

        if(act_state && user_id){
          act_user = act_state,
          user_id = act_id
        }
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id
        });
      },
      ignoredIssue (item) {
        this.loader = 'loadIgnored'
        const id = item.id
        const status = 4
        let act_user = 99
        let user_id = 99
        let act_state = store.get('userData').id ? store.get('userData').id : 99
        let act_id = store.get('userData').id ? store.get('userData').id : 99

        if(act_state && user_id){
          act_user = act_state,
          user_id = act_id
        }
        this.$store.dispatch('UPDATE_DATA', {
          id: id,
          status: status,
          act_user: act_user,
          user_id: user_id
        });
      }
    }
  }
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<template>
  <v-container>
    <v-card
      class="mx-auto"
      v-if="isFetched"
      min-height="120px"
      style="overflow-x : scroll"
    >
      <v-toolbar flat dark class="white--text">
        <v-spacer></v-spacer>

        <v-text-field
          class="mx-4"
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
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="MyTask"
        :single-expand="true"
        :expanded="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
        @item-expanded="openTimeline"
      >
        <template v-slot:item.index="{ item }">
          <v-list-item-avatar color="orange" size="36" class="mt-5">
            <span class="white--text title mx-auto">
              {{ MyTask.indexOf(item) + 1 }}
            </span>
          </v-list-item-avatar>
        </template>

        <template v-slot:item.project="{ item }">
          <span class="font-weight-bold">{{
            item.project + "#" + item.id
          }}</span>
        </template>

        <template v-slot:item.priority="{ item }">
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
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip class="ma-2" small color="green" outlined>
            Assigned to you
          </v-chip>
          <v-chip
            class="ma-2"
            small
            color="info"
            outlined
            v-if="item.status == 2"
          >
            Checking
          </v-chip>
          <v-chip
            class="ma-2"
            small
            color="warning"
            outlined
            v-if="item.status == 5"
          >
            Testing
          </v-chip>
          <v-chip
            class="ma-2"
            small
            color="red"
            outlined
            v-if="item.status == 1"
          >
            Pending
          </v-chip>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" style="background-color: white">
            <!-- <v-card elevation="0" outlined min-width="100%" v-if="loadClick">
                <v-skeleton-loader type="article"> </v-skeleton-loader>
              </v-card> -->
            <v-card width="100%" elevation="0">
              <v-card-text class="mr-3 pl-2">
                <div class="text-lg-left" v-if="item.user">
                  <b>Assignee : </b> {{ item.user.name }}
                </div>
                <div class="text-lg-left" v-if="item.priority == 2">
                  <b>Priority : </b> High
                </div>
                <div class="text-lg-left" v-if="item.priority == 1">
                  <b>Priority : </b> Normal
                </div>
                <div class="text-lg-left" v-if="item.priority == 0">
                  <b>Priority : </b> Low
                </div>
                <div class="text-lg-left">
                  <b>Created At : </b> {{ date(item.created_at) }}
                </div>
                <div class="text-lg-left">
                  <b>Last Occured : </b> {{ date(item.last_occured) }}
                </div>
                <div class="text-lg-left" v-if="item.content_obj">
                  <b>User info : </b> {{ item.content_obj.userdata }}
                </div>
                <div class="text-lg-left" v-if="item.content_obj">
                  <b>Formatted : </b> {{ item.content_obj.formatted }}
                </div>
                <div
                  class="text-lg-left"
                  v-if="item.content_obj"
                  style="overflow-x: scroll"
                >
                  <b>Stack Trace : </b>
                  <pre>{{ item.content_obj.trace }}</pre>
                </div>
                <div
                  class="text-lg-left"
                  v-if="item.content"
                  style="overflow-x: scroll"
                >
                  <b>Stack Trace : </b>
                  <pre>{{ item.content }}</pre>
                </div>
                <div class="text-lg-left" v-if="isController">
                  <b>Committer : </b> {{ committerName }}
                </div>
                <div class="text-lg-left" v-if="isAssets">
                  <b>Committer : </b> {{ committerName }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-row class="mx-2" v-if="roleDeveloper">
                <v-spacer></v-spacer>
                <v-col cols="2" class="mt-2 mx-0" v-if="item.status != 2">
                  <v-btn
                    color="info"
                    outlined
                    :loading="loadCheking"
                    :disabled="loadCheking"
                    @click="startChecking(item)"
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
                <v-col cols="2" class="mt-2 mx-0">
                  <v-btn
                    :loading="loadPending"
                    :disabled="loadPending"
                    color="warning"
                    outlined
                    @click="testingIssue(item)"
                    block
                  >
                    TESTING
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="2" class="mt-2 mx-0">
                  <v-btn
                    :loading="loadClosed"
                    :disabled="loadClosed"
                    color="red"
                    outlined
                    block
                    @click="pendingIssue(item)"
                  >
                    PENDING
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="mx-2" v-else>
                <v-spacer></v-spacer>
                <v-col cols="12" md="4">
                  <v-select
                    class="mt-2 mx-0"
                    dense
                    :items="listUsers"
                    :item-text="(user) => `${user.name}`"
                    :item-value="(user) => `${user.id}`"
                    v-model="selectAssigne"
                    clearable
                    max-width="80%"
                    label="Assignee"
                    outlined
                    hide-details
                    color="black"
                    prepend-inner-icon="mdi-account-multiple-plus"
                  ></v-select>
                </v-col>
                <v-col cols="2" class="mt-2 mx-0">
                  <v-btn
                    outlined
                    :loading="loadAssign"
                    :disabled="loadAssign"
                    @click="assignUser(item)"
                    block
                  >
                    RE-ASSIGN USER
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="2" class="mt-2 mx-0">
                  <v-btn
                    color="red"
                    outlined
                    :loading="loadCheking"
                    :disabled="loadCheking"
                    @click="closeIssue(item)"
                    block
                  >
                    CLOSED
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider class="mt-2"></v-divider>
              <v-card-subtitle v-if="histories.length">
                Recent Updates</v-card-subtitle
              >
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
                      {{ formatDesc(history) }} on
                      {{ date(history.created_at) }}
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-card v-if="isLoading">
      <v-skeleton-loader
        class="mx-auto"
        type="acticle, card-heading, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
      ></v-skeleton-loader>
    </v-card>
  </v-container>
</template>

<script>
const store = require("store");

import moment from "moment";

export default {
  data() {
    return {
      tab: null,
      titles: [
        "ALL Issue",
        "HAWK-ID",
        "HAWK-AU",
        "HAWK-CC",
        "HAWK-QCS",
        "HAWK-SNTR",
        "TMS-AU",
      ],
      tabs: [
        { id: 1, name: "Task", route: `/detail` },
        { id: 2, name: "Project", route: `/detail/project` },
      ],
      status_checking: 0,
      dense: true,
      loadClick: true,
      fillDot: true,
      alert: false,
      assignee: false,
      loadCheking: false,
      loadPending: false,
      activeTab: null,
      loadReopen: false,
      loadAssign: false,
      selectAssigne: "",
      loadClosed: false,
      statusSort: ["Open", "Pending", "Checking", "Closed"],
      sortBy: null,
      loadIgnored: false,
      loader: null,
      icon: true,
      right: true,
      histories: [],
      search: "",
      headers: [
        {
          text: "No",
          value: "index",
          align: "left",
        },
        {
          text: "Project",
          value: "project",
          align: "left",
        },
        {
          text: "Priority",
          value: "priority",
          align: "left",
        },
        {
          text: "Status",
          value: "status",
          align: "left",
        },
        { text: "", value: "data-table-expand" },
      ],
      expanded: [],
      committerName: "",
      isController: false,
      isAssets: false,
      roleQA: false,
      roleDeveloper: false,
    };
  },
  computed: {
    getDetailData() {
      const dataDetail = this.$store.getters.getActiveIssue;
      const getId = store.get("userData").id;
      const data = dataDetail.filter((item) => item.user_id == getId);
      let dataMyTask = [];
      if (this.roleDeveloper) {
        dataMyTask = data.filter((item) => {
          if (
            (item.status !== 3 &&
              item.status !== 4 &&
              item.project == "Hawk-ID") ||
            item.project == "Hawk-AU"
          ) {
            return true;
          }
        });
      } else {
        dataMyTask = dataDetail.filter((item) => {
          if (
            item.status == 5 &&
            (item.project == "Hawk-ID" || item.project == "Hawk-AU")
          ) {
            return true;
          }
        });
      }
      return dataMyTask;
    },
    loadActive() {
      return this.$store.getters.loadActive;
    },
    isFetched() {
      return this.loadActive == "LOADED";
    },
    isLoading() {
      return this.loadActive == "LOADING";
    },
    MyTask() {
      var data = [];
      if (!this.search && !this.sortBy) {
        data = this.getDetailData;
      }
      if (this.search && !this.sortBy) {
        const search = this.search.toLowerCase();
        return this.getDetailData.filter((item) => {
          let matchContent = false;
          const matchTitle = item.title.toLowerCase().indexOf(search) > -1;
          const matchID = item.project + "#" + item.id;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;

          if (item.content_obj) {
            if (item.content_obj.trace) {
              matchContent =
                item.content_obj.trace.toLowerCase().indexOf(search) > -1;
            } else {
              matchContent = false;
            }
          }

          return matchContent || matchTitle || matchName;
        });
      } else if (this.sortBy && !this.search) {
        if (this.sortBy === "Open") {
          return this.getDetailData.filter((item) => item.status == 0);
        } else if (this.sortBy === "Pending") {
          return this.getDetailData.filter((item) => item.status == 1);
        } else if (this.sortBy === "Checking") {
          return this.getDetailData.filter((item) => item.status == 2);
        } else if (this.sortBy === "Closed") {
          return this.getDetailData.filter((item) => item.status == 3);
        } else {
          return this.getDetailData;
        }
      } else if (this.search && this.sortBy) {
        const search = this.search.toLowerCase();
        const searchFunc = this.getDetailData.filter((item) => {
          let matchContent = false;
          const matchTitle = item.title.toLowerCase().indexOf(search) > -1;
          const matchID = item.project + "#" + item.id;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;

          if (item.content_obj) {
            if (item.content_obj.trace) {
              matchContent =
                item.content_obj.trace.toLowerCase().indexOf(search) > -1;
            } else {
              matchContent = false;
            }
          }

          return matchContent || matchTitle || matchName;
        });

        if (this.sortBy === "Open") {
          return searchFunc.filter((item) => item.status == 0);
        } else if (this.sortBy === "Pending") {
          return searchFunc.filter((item) => item.status == 1);
        } else if (this.sortBy === "Checking") {
          return searchFunc.filter((item) => item.status == 2);
        } else if (this.sortBy === "Closed") {
          return searchFunc.filter((item) => item.status == 3);
        }
      }

      return data;
    },
    countAll() {
      const datas = this.getDetailData.length;
      const data = " (" + datas + ")";
      return data;
    },
    listUsers() {
      const listUser = this.$store.getters.getUsers;
      return listUser;
    },
  },
  created() {
    this.$store.dispatch("LOAD_DETAIL_DATA");
    this.$store.dispatch("LOAD_ACTIVE_ISSUE");
    this.$store.dispatch("LOAD_USERS_DATA");
    this.setUserRole();
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
    },
  },
  methods: {
    date: (date) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    formatDesc: (history) => {
      return history.description;
    },
    isAlert(item) {
      const dataUser = this.$store.getters.getUsers.find(
        (user) => user.id == store.get("userData").id
      );
      if (dataUser) {
        if (dataUser.role == "developer" && item.status == 0) {
          this.alert = true;
          return this.isAlert;
        }
      }
    },
    isAssigne() {
      const dataUser = this.$store.getters.getUsers.find(
        (user) => user.id == store.get("userData").id
      );
      if (dataUser) {
        if (
          dataUser.role == "system" ||
          dataUser.role == "admin" ||
          dataUser.role == "reporter"
        ) {
          this.assignee = true;
          return this.assignee;
        }
      }
    },
    assignUser(item) {
      this.loader = "loadAssign";
      const id = item.id;
      const status = 2;
      const user_id = this.selectAssigne;
      const act_user = user_id;
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        // user_id: user_id,
        is_re_assign: true,
      });
      this.selectAssigne = "";
    },
    openTimeline(item) {
      const messages_id = item.id;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}/histories/${messages_id}`)
        .then((response) => {
          this.histories = response.data;
          this.loadClick = false;
        });
    },
    startChecking(item) {
      this.loader = "loadCheking";
      const id = item.id;
      const status = 2;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }

      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    closeIssue(item) {
      this.loader = "loadCheking";
      const id = item.id;
      const status = 3;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    reopenIssue(item) {
      this.loader = "loadReopen";
      const id = item.id;
      const status = 0;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    testingIssue(item) {
      this.loader = "loadPending";
      const id = item.id;
      const status = 5;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    pendingIssue(item) {
      this.loader = "loadClosed";
      const id = item.id;
      const status = 1;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    ignoredIssue(item) {
      this.loader = "loadIgnored";
      const id = item.id;
      const status = 4;
      let act_user = 99;
      let user_id = 99;
      let act_state = store.get("userData").id ? store.get("userData").id : 99;
      let act_id = store.get("userData").id ? store.get("userData").id : 99;

      if (act_state && user_id) {
        (act_user = act_state), (user_id = act_id);
      }
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
    },
    setUserRole() {
      const dataUser = this.$store.getters.getUsers.find(
        (user) => user.id === store.get("userData").id
      );
      if (dataUser) {
        if (dataUser.role === "QA") {
          this.roleQA = true;
        } else if (dataUser.role === "developer") {
          this.roleDeveloper = true;
        }
      }
    },
  },
};
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

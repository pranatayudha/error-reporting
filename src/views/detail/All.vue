<template>
  <div>
    <v-card
      class="mx-auto"
      v-if="isFetched"
      min-height="120px"
      style="overflow-x : scroll"
    >
      <v-toolbar flat color="transparent" class="black--text">
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
          ref="sortByStatus"
          v-model="sortByStatus"
          :items="statusSort"
          label="Sort Status"
          color="grey"
          placeholder="Sort by Status"
          required
          hide-details
          prepend-inner-icon="mdi-filter-variant"
          dense
          clearable
          solo-inverted
          flat
          class="mr-2"
        ></v-select>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="AllData"
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
              {{ AllData.indexOf(item) + 1 }}
            </span>
          </v-list-item-avatar>
        </template>

        <template v-slot:item.project="{ item }">
          <span
            class="font-weight-bold"
            v-if="item.status == 0 || item.status == 1 || item.status == 2"
            >{{ item.project + "#" + item.id }}</span
          >
          <span
            class="font-weight-light"
            v-if="item.status == 3 || item.status == 4"
            >{{ item.project + "#" + item.id }}</span
          >
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
          <v-chip
            class="ma-2"
            small
            color="primary"
            outlined
            v-if="item.status == 0 && !item.user"
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
            Pending by {{ item.user.name }}
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
            Checking by {{ item.user.name }}
          </v-chip>
          <v-chip
            class="ma-2"
            small
            color="green"
            outlined
            v-if="item.status == 0 && item.user"
          >
            Assigned
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
                <div class="text-lg-left">
                  <b>Committer : </b> {{ committerName }}
                </div>
              </v-card-text>
              <v-divider
                v-show="roleQA && item.status === 0 && !item.user"
              ></v-divider>
              <v-row
                class="mx-2"
                v-show="roleQA && item.status === 0 && !item.user"
              >
                <v-col cols="12" md="4" class="ml-2 mr-2" v-if="isAlert(item)">
                  <v-alert dense type="info" color="blue" class="mt-2 mb-0">
                    This issue is still <strong>Open</strong>
                  </v-alert>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    class="mt-2 mb-0"
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
                    color="blue"
                    prepend-inner-icon="mdi-account-multiple-plus"
                  ></v-select>
                </v-col>
                <v-spacer v-if="isAlert(item)"></v-spacer>
                <v-col cols="6" md="2" class="mt-2 mx-0">
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
              </v-row>
              <v-divider></v-divider>
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
  </div>
</template>

<script>
const store = require("store");
import _ from "lodash";

import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      tab: null,
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
      isInfo: false,
      loadClosed: false,
      statusSort: ["Open", "Assigned", "Pending", "Checking"],
      sortByStatus: null,
      loadIgnored: false,
      loader: null,
      icon: true,
      right: true,
      histories: [],
      search: "",
      committerName: "Dwiky Ramadhan",
      headers: [
        {
          text: "Count",
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
      isController: false,
      isAssets: false,
      roleQA: false,
      roleDeveloper: false,
    };
  },
  computed: {
    getDetailData() {
      const dataDetail = this.$store.getters.getActiveIssue;
      return dataDetail;
    },
    listHawkIDAU() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return data.content_type == "json" && title[0] != "E_WARNING:";
      });
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
    AllData() {
      var data = [];
      if (!this.search && !this.sortByStatus) {
        data = this.listHawkIDAU;
      } else if (this.search) {
        const search = this.search.toLowerCase();
        return this.listHawkIDAU.filter((item) => {
          const matchID = item.id;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;
          return matchName;
        });
      } else if (!this.search && this.sortByStatus) {
        if (this.sortByStatus === "Open") {
          return this.listHawkIDAU.filter(
            (item) => item.status == 0 && !item.user
          );
        } else if (this.sortByStatus === "Assigned") {
          return this.listHawkIDAU.filter(
            (item) => item.status == 0 && item.user
          );
        } else if (this.sortByStatus === "Pending") {
          return this.listHawkIDAU.filter((item) => item.status == 1);
        } else if (this.sortByStatus === "Checking") {
          return this.listHawkIDAU.filter((item) => item.status == 2);
        } else {
          return this.listHawkIDAU;
        }
      } else if (this.search && this.sortByStatus) {
        const search = this.search.toLowerCase();
        const searchFun = this.listHawkIDAU.filter((item) => {
          const matchID = item.id;
          const matchName =
            matchID
              .toString()
              .toLowerCase()
              .indexOf(search) > -1;
          return matchName;
        });

        if (this.sortByStatus === "Open") {
          return searchFun.filter((item) => item.status == 0 && !item.user);
        } else if (this.sortByStatus === "Assigned") {
          return this.listHawkIDAU.filter(
            (item) => item.status == 0 && item.user
          );
        } else if (this.sortByStatus === "Pending") {
          return searchFun.filter((item) => item.status == 1);
        } else if (this.sortByStatus === "Checking") {
          return searchFun.filter((item) => item.status == 2);
        } else {
          return searchFun;
        }
      }

      return data;
    },
    countAll() {
      const datas = this.listHawkIDAU.length;
      const data = " (" + datas + ")";
      return data;
    },
    listUsers() {
      const listUser = this.$store.getters.getUsers;
      return listUser;
    },
  },
  created() {
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
    getBlame(formatted) {
      let parser = document.createElement("a");
      parser.href = formatted;
      let split = parser.pathname.split("/");

      if (split[1] === "index.php") {
        this.committerName = "";
        let split2 = parser.pathname.split("/index.php/");
        let split3 = split2[1].split("/");
        let split4 = split3[0].split(":");
        let encodeUri = encodeURIComponent(`controllers/${split4[0]}.php`);

        return axios
          .get(
            `${process.env.VUE_APP_GITLAB_URL}/2/repository/files/${encodeUri}/blame?ref=develop`,
            {
              headers: {
                "PRIVATE-TOKEN": "PRIVATE-TOKEN",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers":
                  "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
                "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
              },
              crossdomain: true,
            }
          )
          .then((response) => {
            // console.log(response);
            if (response !== null) {
              const committedDate = response.data.map((d) =>
                moment(d.commit.committed_date)
              );
              const getMax = moment.max(committedDate);
              response.data.map((d) => {
                if (
                  moment(d.commit.committed_date)
                    .toDate()
                    .toString() === getMax.toDate().toString()
                ) {
                  if (
                    d.commit.committer_name == "Rizjami Putera" ||
                    d.commit.committer_name == "Syafdia Okta" ||
                    d.commit.committer_name == "okta" ||
                    d.commit.committer_name == "putera" ||
                    d.commit.committer_name == "Rukanda Faridsi"
                  ) {
                    console.log(1);
                    this.committerName = "Dwiky Ramadhan";
                  } else {
                    console.log(2);
                    this.committerName = d.commit.committer_name;
                  }
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (split[1] === "assets") {
        this.committerName = "";
        let split2 = parser.pathname.split("/assets/");
        let encodeUri = encodeURIComponent(`assets/${split2[1]}`);

        return axios
          .get(
            `${process.env.VUE_APP_GITLAB_URL}/2/repository/files/${encodeUri}/blame?ref=develop`,
            {
              headers: {
                "PRIVATE-TOKEN": "PRIVATE-TOKEN",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers":
                  "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
                "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
              },
              crossdomain: true,
            }
          )
          .then((response) => {
            // console.log(response);
            if (response !== null) {
              const committedDate = response.data.map((d) =>
                moment(d.commit.committed_date)
              );
              const getMax = moment.max(committedDate);
              response.data.map((d) => {
                if (
                  moment(d.commit.committed_date)
                    .toDate()
                    .toString() === getMax.toDate().toString()
                ) {
                  if (
                    d.commit.committer_name == "Rizjami Putera" ||
                    d.commit.committer_name == "Syafdia Okta" ||
                    d.commit.committer_name == "okta" ||
                    d.commit.committer_name == "putera" ||
                    d.commit.committer_name == "Rukanda Faridsi"
                  ) {
                    console.log(1);
                    this.committerName = "Dwiky Ramadhan";
                  } else {
                    console.log(2);
                    this.committerName = d.commit.committer_name;
                  }
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.committerName = "Dwiky Ramadhan";
      }
    },
    date: (date) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    formatDesc: (history) => {
      return history.description;
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
    checkCC(item) {
      if (
        item.project == "Hawk-CC" &&
        _.has(item, "content_obj.info.context.exception")
      ) {
        return true;
      } else {
        return false;
      }
    },
    checkUserInfo(item) {
      if (_.has(item, "content_obj.userdata")) {
        return true;
      } else {
        return false;
      }
    },
    assignUser(item) {
      this.loader = "loadAssign";
      const id = item.id;
      const status = item.status;
      const user_id = this.selectAssigne;
      const act_user = user_id;
      console.log(`${id} ${status} ${act_user}`);
      this.$store.dispatch("UPDATE_DATA", {
        id: id,
        status: status,
        act_user: act_user,
        user_id: user_id,
      });
      this.selectAssigne = "";
    },
    openTimeline({ item }) {
      const messages_id = item.id;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}/histories/${messages_id}`)
        .then((response) => {
          this.histories = response.data;
          // this.loadClick = false;
        });
      if (item.content_obj) {
        this.getBlame(item.content_obj.formatted);
      }
    },
    checkingIssue(item) {
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
    pendingIssue(item) {
      this.loader = "loadPending";
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
    closedIssue(item) {
      this.loader = "loadClosed";
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

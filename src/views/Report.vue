<template>
  <v-container>
    <v-card>
      <v-toolbar dark flat>
        <v-toolbar-title class="mx-auto">Generate Report</v-toolbar-title>
      </v-toolbar>

      <v-card class="mx-auto" min-height="120px">
        <div class="text-center">
          <v-chip
            class="ma-2 px-4 py-4"
            color="blue"
            outlined
            @click="showTaskProgrammer"
          >
            <v-icon left>
              mdi-account-details
            </v-icon>
            Total Task Programmer
          </v-chip>

          <v-chip
            class="ma-2 px-4 py-4"
            color="grey"
            outlined
            @click="showTaskQA"
          >
            <v-icon left>
              mdi-account-details
            </v-icon>
            Total Task QA
          </v-chip>

          <v-chip
            class="ma-2 px-4 py-4"
            color="green"
            outlined
            @click="showReviewKinerja"
          >
            <v-icon left>
              mdi-human-male-board-poll
            </v-icon>
            Review Kinerja
          </v-chip>

          <v-chip
            class="ma-2 px-4 py-4"
            color="orange"
            outlined
            @click="showProgrammerActivity"
          >
            <v-icon left>
              mdi-human-male-board-poll
            </v-icon>
            Programmer Activity
          </v-chip>

          <v-chip
            class="ma-2 px-4 py-4"
            color="red"
            outlined
            @click="showQAActivity"
          >
            <v-icon left>
              mdi-human-male-board-poll
            </v-icon>
            QA Activity
          </v-chip>
        </div>

        <v-divider></v-divider>

        <div v-show="taskProgrammer">
          <v-toolbar flat color="transparent" class="black--text">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedUserTaskProgrammer"
                :items="listUserProgrammer"
                :item-text="(user) => `${user.name}`"
                :item-value="(user) => `${user.id}`"
                label="User"
                color="grey"
                placeholder="User"
                hide-details
                prepend-inner-icon="mdi-account"
                dense
                clearable
                solo-inverted
                flat
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog1"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Start Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog1.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="date2"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date2"
                    label="End Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date2" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog2.save(date2)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-toolbar>

          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <v-col cols="6" md="2">
              <v-btn
                outlined
                block
                color="blue"
                @click="generateTaskProgrammer"
              >
                GENERATE
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-col>
          </v-row>

          <div v-show="showDataTableTaskProgrammer">
            <v-data-table
              :headers="headersTaskProgrammer"
              :items="taskProgrammerList"
              item-key="id"
              class="elevation-1 mt-4"
            />
          </div>
        </div>

        <div v-show="taskQA">
          <v-toolbar flat color="transparent" class="black--text">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedUserTaskQA"
                :items="listUserQA"
                :item-text="(user) => `${user.name}`"
                :item-value="(user) => `${user.id}`"
                label="User"
                color="grey"
                placeholder="User"
                hide-details
                prepend-inner-icon="mdi-account"
                dense
                clearable
                solo-inverted
                flat
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog11"
                v-model="modal11"
                :return-value.sync="date11"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date11"
                    label="Start Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date11" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal11 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog11.save(date11)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog12"
                v-model="modal12"
                :return-value.sync="date12"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date12"
                    label="End Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date12" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal12 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog12.save(date12)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-toolbar>

          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <v-col cols="6" md="2">
              <v-btn
                outlined
                block
                color="grey"
                @click="generateTaskQA"
              >
                GENERATE
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-col>
          </v-row>

          <div v-show="showDataTableTaskQA">
            <v-data-table
              :headers="headersTaskQA"
              :items="taskQAList"
              item-key="id"
              class="elevation-1 mt-4"
            />
          </div>
        </div>

        <div v-show="reviewKinerja">
          <v-toolbar flat color="transparent" class="black--text">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedUserReviewKinerja"
                :items="listUsers"
                :item-text="(user) => `${user.name}`"
                :item-value="(user) => `${user.id}`"
                label="User"
                color="grey"
                placeholder="User"
                hide-details
                prepend-inner-icon="mdi-account"
                dense
                clearable
                solo-inverted
                flat
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog3"
                v-model="modal3"
                :return-value.sync="date3"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date3"
                    label="Start Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date3" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal3 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog3.save(date3)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog4"
                v-model="modal4"
                :return-value.sync="date4"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date4"
                    label="End Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date4" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal4 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog4.save(date4)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-toolbar>

          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <v-col cols="6" md="2">
              <v-btn
                outlined
                block
                color="green"
                @click="generateReviewKinerja"
              >
                GENERATE
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-col>
          </v-row>

          <div v-show="showDataTableReviewKinerja">
            <v-data-table
              :headers="headersReviewKinerja"
              :items="reviewKinerjaList"
              item-key="id"
              class="elevation-1 mt-4"
            >
              <template v-slot:item.workingTime="{ item }">
                <div>{{ generateWorkingTime(item) }}</div>
              </template>
            </v-data-table>
          </div>
        </div>

        <div v-show="programmerActivity">
          <v-toolbar flat color="transparent" class="black--text">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedUserProgrammerActivity"
                :items="listUserProgrammer"
                :item-text="(user) => `${user.name}`"
                :item-value="(user) => `${user.id}`"
                label="User"
                color="grey"
                placeholder="User"
                hide-details
                prepend-inner-icon="mdi-account"
                dense
                clearable
                solo-inverted
                flat
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog7"
                v-model="modal7"
                :return-value.sync="date7"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date7"
                    label="Start Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date7" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal7 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog7.save(date7)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog8"
                v-model="modal8"
                :return-value.sync="date8"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date8"
                    label="End Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date8" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal8 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog8.save(date8)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-toolbar>

          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <v-col cols="6" md="2">
              <v-btn
                outlined
                block
                color="orange"
                @click="generateProgrammerActivity"
              >
                GENERATE
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-col>
          </v-row>

          <div v-show="showDataTableProgrammerActivity">
            <v-data-table
              :headers="headersProgrammerActivity"
              :items="programmerActivityList"
              item-key="id"
              class="elevation-1 mt-4"
            >
              <template v-slot:item.dateTime="{ item }">
                <div>{{ formatDateTime(item.created_at) }}</div>
              </template>
              <template v-slot:item.startChecking="{ item }">
                <div>
                  {{
                    item.checking_at != null
                      ? formatDateTime(item.checking_at)
                      : "-"
                  }}
                </div>
              </template>
              <template v-slot:item.pending="{ item }">
                <div>
                  {{
                    item.pending_at != null
                      ? formatDateTime(item.pending_at)
                      : "-"
                  }}
                </div>
              </template>
              <template v-slot:item.testing="{ item }">
                <div>
                  {{
                    item.testing_at != null
                      ? formatDateTime(item.testing_at)
                      : "-"
                  }}
                </div>
              </template>
            </v-data-table>
          </div>
        </div>

        <div v-show="qaActivity">
          <v-toolbar flat color="transparent" class="black--text">
            <v-col cols="12" sm="4">
              <v-select
                v-model="selectedUserQAActivity"
                :items="listUserQA"
                :item-text="(user) => `${user.name}`"
                :item-value="(user) => `${user.id}`"
                label="User"
                color="grey"
                placeholder="User"
                hide-details
                prepend-inner-icon="mdi-account"
                dense
                clearable
                solo-inverted
                flat
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog9"
                v-model="modal9"
                :return-value.sync="date9"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date9"
                    label="Start Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date9" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal9 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog9.save(date9)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12" sm="4">
              <v-dialog
                ref="dialog10"
                v-model="modal10"
                :return-value.sync="date10"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date10"
                    label="End Date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                    dense
                    solo-inverted
                    flat
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date10" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal10 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog10.save(date10)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-toolbar>

          <v-row class="mx-3">
            <v-spacer></v-spacer>
            <v-col cols="6" md="2">
              <v-btn outlined block color="orange" @click="generateQAActivity">
                GENERATE
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-col>
          </v-row>

          <div v-show="showDataTableQAActivity">
            <v-data-table
              :headers="headersQAActivity"
              :items="qaActivityList"
              item-key="id"
              class="elevation-1 mt-4"
            >
              <template v-slot:item.userName="{ item }">
                <div>Fanny</div>
              </template>
              <template v-slot:item.dateTime="{ item }">
                <div>{{ formatDateTime(item.created_at) }}</div>
              </template>
              <template v-slot:item.assignedAt="{ item }">
                <div>
                  {{
                    item.assigned_at != null
                      ? formatDateTime(item.assigned_at)
                      : "-"
                  }}
                </div>
              </template>
              <template v-slot:item.reAssignedAt="{ item }">
                <div>
                  {{
                    item.re_assigned_at != null
                      ? formatDateTime(item.re_assigned_at)
                      : "-"
                  }}
                </div>
              </template>
              <template v-slot:item.closedAt="{ item }">
                <div>
                  {{
                    item.closed_at != null
                      ? formatDateTime(item.closed_at)
                      : "-"
                  }}
                </div>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      taskProgrammer: false,
      reviewKinerja: false,
      taskQA: false,
      programmerActivity: false,
      qaActivity: false,
      selectedUserTaskProgrammer: "",
      selectedUserTaskQA: "",
      selectedUserReviewKinerja: "",
      selectedUserProgrammerActivity: "",
      selectedUserQAActivity: "",
      // datepicker 1
      date: "",
      modal: false,
      // datepicker 2
      date2: "",
      modal2: false,
      showDataTableTaskProgrammer: false,
      taskProgrammerList: [],
      headersTaskProgrammer: [
        {
          text: "User",
          value: "user",
          align: "left",
        },
        {
          text: "Pending Bug",
          value: "pending_bug",
          align: "left",
        },
        {
          text: "Closed Bug",
          value: "closed_bug",
          align: "left",
        },
        {
          text: "Total",
          value: "total",
          align: "left",
        },
      ],
      // datepicker 3
      date3: "",
      modal3: false,
      // datepicker 4
      date4: "",
      modal4: false,
      showDataTableReviewKinerja: false,
      reviewKinerjaList: [],
      headersReviewKinerja: [
        {
          text: "User",
          value: "user.name",
          align: "left",
        },
        {
          text: "Issue Number",
          value: "id",
          align: "left",
        },
        {
          text: "Working Time",
          value: "workingTime",
          align: "left",
        },
      ],
      // datepicker 7
      date7: "",
      modal7: false,
      // datepicker 8
      date8: "",
      modal8: false,
      showDataTableProgrammerActivity: false,
      programmerActivityList: [],
      headersProgrammerActivity: [
        {
          text: "User",
          value: "user.name",
          align: "left",
        },
        {
          text: "Date",
          value: "dateTime",
          align: "left",
        },
        {
          text: "Issue Number",
          value: "id",
          align: "left",
        },
        {
          text: "Start Checking At",
          value: "startChecking",
          align: "left",
        },
        {
          text: "Pending At",
          value: "pending",
          align: "left",
        },
        {
          text: "Testing At",
          value: "testing",
          align: "left",
        },
      ],
      // datepicker 9
      date9: "",
      modal9: false,
      // datepicker 10
      date10: "",
      modal10: false,
      showDataTableQAActivity: false,
      qaActivityList: [],
      headersQAActivity: [
        {
          text: "User",
          value: "userName",
          align: "left",
        },
        {
          text: "Date",
          value: "dateTime",
          align: "left",
        },
        {
          text: "Issue Number",
          value: "id",
          align: "left",
        },
        {
          text: "Assigned At",
          value: "assignedAt",
          align: "left",
        },
        {
          text: "Re-Assigned At",
          value: "reAssignedAt",
          align: "left",
        },
        {
          text: "Closed At",
          value: "closedAt",
          align: "left",
        },
      ],
      userData: {},
      // datepicker 11
      date11: "",
      modal11: false,
      // datepicker 12
      date12: "",
      modal12: false,
      showDataTableTaskQA: false,
      taskQAList: [],
      headersTaskQA: [
        {
          text: "User",
          value: "user",
          align: "left",
        },
        {
          text: "Testing Bug",
          value: "testing_bug",
          align: "left",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("LOAD_GET_STATUS_DATA");
    this.$store.dispatch("LOAD_ACTIVE_ISSUE");
    this.$store.dispatch("LOAD_USERS_DATA");
  },
  computed: {
    listUsers() {
      let data = this.$store.getters.getUsers.filter((u) => u.role != "system");
      return [{ id: 999, name: "All" }, ...data];
    },
    listUserProgrammer() {
      let data = this.$store.getters.getUsers.filter(
        (u) => u.role != "QA" && u.role != "system"
      );
      return [{ id: 999, name: "All" }, ...data];
    },
    listUserQA() {
      return this.$store.getters.getUsers.filter((u) => u.role == "QA");
    },
    getDetailData() {
      const dataDetail = this.$store.getters.getActiveIssue;
      return dataDetail;
    },
    getHistoriesData() {
      const dataDetail = this.$store.getters.getStatus;
      return dataDetail;
    },
  },
  watch: {},
  methods: {
    showTaskProgrammer() {
      this.taskProgrammer = true;
      this.taskQA = false;
      this.reviewKinerja = false;
      this.programmerActivity = false;
      this.qaActivity = false;

      this.showDataTableTaskQA = false;
      this.taskQAList = [];
      this.showDataTableReviewKinerja = false;
      this.reviewKinerjaList = [];
      this.showDataTableProgrammerActivity = false;
      this.programmerActivityList = [];
      this.showDataTableQAActivity = false;
      this.qaActivityList = [];
    },
    generateTaskProgrammer() {
      let data = {
        start_date: this.date,
        end_date: this.date2,
      };

      if (this.selectedUserTaskProgrammer != 999) {
        data.user_id = this.selectedUserTaskProgrammer;
      }

      return axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/report_task`,
        crossdomain: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      }).then((response) => {
        if (response !== null) {
          this.showDataTableTaskProgrammer = true;
          this.taskProgrammerList = response.data;
        }
      });
    },
    showTaskQA() {
      this.taskProgrammer = false;
      this.taskQA = true;
      this.reviewKinerja = false;
      this.programmerActivity = false;
      this.qaActivity = false;

      this.showDataTableTaskProgrammer = false;
      this.taskProgrammerList = [];
      this.showDataTableReviewKinerja = false;
      this.reviewKinerjaList = [];
      this.showDataTableProgrammerActivity = false;
      this.programmerActivityList = [];
      this.showDataTableQAActivity = false;
      this.qaActivityList = [];
    },
    generateTaskQA() {
      let data = {
        start_date: this.date11,
        end_date: this.date12,
      };

      if (this.selectedUserTaskQA != 999) {
        data.user_id = this.selectedUserTaskQA;
      }

      return axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/report_task`,
        crossdomain: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      }).then((response) => {
        if (response !== null) {
          this.showDataTableTaskQA = true;
          this.taskQAList = response.data;
        }
      });
    },
    generateReviewKinerja() {
      let data = {
        start_date: this.date3,
        end_date: this.date4,
        status: [2, 3, 5],
      };
      if (this.selectedUserReviewKinerja != 999) {
        data.user_id = this.selectedUserReviewKinerja;
      }
      this.generateReportPerformanceActivity(data, 2);
    },
    durationAsString(start, end) {
      const duration = moment.duration(moment(end).diff(moment(start)));

      //Get Days
      const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
      const daysFormatted = days ? `${days} day, ` : "";

      //Get Hours
      const hours = duration.hours();
      const hoursFormatted = hours ? `${hours} hour, ` : "";

      //Get Minutes
      const minutes = duration.minutes();
      const minutesFormatted = minutes ? `${minutes} minute` : "";

      return [daysFormatted, hoursFormatted, minutesFormatted].join("");
    },
    generateWorkingTime(item) {
      return this.durationAsString(item.checking_at, item.testing_at);
    },
    generateProgrammerActivity() {
      let data = {
        start_date: this.date7,
        end_date: this.date8,
        status: ["1", "2", "5"],
      };
      if (this.selectedUserProgrammerActivity != 999) {
        data.user_id = this.selectedUserProgrammerActivity;
      }
      this.generateReportPerformanceActivity(data, 3);
    },
    formatDateTime(item) {
      return moment(item).format("DD MMMM YYYY");
    },
    generateQAActivity() {
      let data = {
        start_date: this.date9,
        end_date: this.date10,
      };
      this.generateReportPerformanceActivity(data, 4);
    },
    generateReportPerformanceActivity(data, status) {
      return axios({
        method: "post",
        url: `${process.env.VUE_APP_API_URL}/report_performance_activity`,
        crossdomain: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      }).then((response) => {
        if (response !== null) {
          if (status == 2) {
            let responseData = response.data.filter(
              (rk) => rk.checking_at != null || rk.testing_at != null
            );
            this.showDataTableReviewKinerja = true;
            this.reviewKinerjaList = responseData;
          }

          if (status == 3) {
            let responseData = response.data.filter(
              (pa) =>
                pa.checking_at != null ||
                pa.testing_at != null ||
                pa.pending_at != null
            );
            this.showDataTableProgrammerActivity = true;
            this.programmerActivityList = responseData;
          }

          if (status == 4) {
            let responseData = response.data.filter(
              (qa) =>
                qa.assigned_at != null ||
                qa.closed_at != null ||
                qa.re_assigned_at != null
            );
            this.showDataTableQAActivity = true;
            this.qaActivityList = responseData;
          }
        }
      });
    },
    showReviewKinerja() {
      this.taskProgrammer = false;
      this.taskQA = false;
      this.reviewKinerja = true;
      this.programmerActivity = false;
      this.qaActivity = false;

      this.showDataTableTaskQA = false;
      this.taskQAList = [];
      this.showDataTableTaskProgrammer = false;
      this.taskProgrammerList = [];
      this.showDataTableProgrammerActivity = false;
      this.programmerActivityList = [];
      this.showDataTableQAActivity = false;
      this.qaActivityList = [];
    },
    showProgrammerActivity() {
      this.taskProgrammer = false;
      this.taskQA = false;
      this.reviewKinerja = false;
      this.programmerActivity = true;
      this.qaActivity = false;

      this.showDataTableTaskProgrammer = false;
      this.taskProgrammerList = [];
      this.showDataTableTaskQA = false;
      this.taskQAList = [];
      this.showDataTableReviewKinerja = false;
      this.reviewKinerjaList = [];
      this.showDataTableQAActivity = false;
      this.qaActivityList = [];
    },
    showQAActivity() {
      this.taskProgrammer = false;
      this.taskQA = false;
      this.reviewKinerja = false;
      this.programmerActivity = false;
      this.qaActivity = true;

      this.showDataTableTaskProgrammer = false;
      this.taskProgrammerList = [];
      this.showDataTableTaskQA = false;
      this.taskQAList = [];
      this.showDataTableReviewKinerja = false;
      this.reviewKinerjaList = [];
      this.showDataTableProgrammerActivity = false;
      this.programmerActivityList = [];
    },
    getUserName(id) {
      let data = this.$store.getters.getUsers.find((user) => user.id == id);
      this.userData = data;
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

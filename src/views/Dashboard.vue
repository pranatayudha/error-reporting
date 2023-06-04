<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card
          class="mx-2"
          outlined
          shaped
          height="130px"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Current issue status</div>
              <v-list-item-title class="headline mb-1">Open</v-list-item-title>
              <v-list-item-subtitle>The error is still exist </v-list-item-subtitle>
            </v-list-item-content>
            <v-skeleton-loader
              type="avatar"
              v-if="isLoading"  
            >
            </v-skeleton-loader>
            <v-avatar color="blue" size="42" v-if="isFetched">
              <span class="white--text title font-weight-bold">{{countStatusOpen}}</span>
            </v-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-2"
          outlined
          shaped
          height="130px"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Current issue status</div>
              <v-list-item-title class="headline mb-1">Checking</v-list-item-title>
              <v-list-item-subtitle>Programmer is fixing an error</v-list-item-subtitle>
            </v-list-item-content>
            <v-skeleton-loader
              type="avatar"
              v-if="isLoading"
            >
            </v-skeleton-loader>
            <v-avatar color="purple" size="40" v-if="isFetched">
              <span class="white--text title font-weight-bold">{{countStatusChecking}}</span>
            </v-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-2"
          outlined
          shaped
          height="130px"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Current issue status</div>
              <v-list-item-title class="headline mb-1">Pending</v-list-item-title>
              <v-list-item-subtitle>Programmer will fix the error immediately</v-list-item-subtitle>
            </v-list-item-content>
            <v-skeleton-loader
              type="avatar"
              v-if="isLoading"
            >
            </v-skeleton-loader>
            <v-avatar color="warning" size="40" v-if="isFetched">
              <span class="white--text title font-weight-bold">{{countStatusPending}}</span>
            </v-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-card  
      style="border-radius:10px;"
      class="pa-3 ma-2 mt-3"
    >
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-card-title class="title font-weight-regular mt-n3">Error Messages API </v-card-title>
          <v-card
            class="mx-auto"
            color="green"
            dark
            max-width="400">
            <v-card-title>
              <flag iso="id" />
              <span class="title font-weight-bold mx-2">HAWK-ID</span>
            </v-card-title>

            <v-card-text class="subtitle-1 font-weight-regular white--text">
              GPS tracking application for Indonesia
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                >
                  <v-icon class="mr-1">mdi-tooltip-text</v-icon>
                  <span class="subheading mr-2">{{countHawkID}}</span>
                  <span class="mr-1">errors</span>
                </v-row>
                <v-btn color="white" outlined to="/detail/hawk-id">SEE DETAIL</v-btn>

              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-card
            class="mx-auto my-3"
            color="orange"
            dark
            max-width="400">
            <v-card-title>
              <flag iso="au" />
              <span class="title font-weight-bold mx-2">HAWK-AU</span>
            </v-card-title>

            <v-card-text class="subtitle-1 font-weight-regular white--text">
               GPS tracking application for Australia
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row
                >
                  <v-icon class="mr-1">mdi-tooltip-text</v-icon>
                  <span class="subheading mr-2">{{countHawkAU}}</span>
                  <span class="mr-1">errors</span>
                </v-row>
                <v-btn color="white" outlined to="/detail/hawk-au">SEE DETAIL</v-btn>

              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="7">
          <v-card
            class="mt-4"
            style="border-radius:10px;"
            v-if="isFetched"
          >
              <v-sheet
                class="v-sheet--offset mx-auto my-1"
                elevation="6"
                color="indigo"
                max-width="calc(100% - 32px)"
                tile
              >
                <GChart
                  type="ColumnChart"
                  :data="setChartData"
                />    
              </v-sheet>

              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2"><b>Server used chart list</b></div>
                <v-data-table
                  :headers="headers"
                  :items="getServerData"
                  sort-desc
                  class="font-weight-light"
                >
                </v-data-table>
                <!-- <v-divider class="my-2"></v-divider>
                <v-icon
                  class="mr-2"
                  small
                >
                  mdi-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">last update 6 minutes ago</span> -->
              </v-card-text>
          </v-card>
          <v-card v-if="isLoading">
            <v-skeleton-loader
              type="card, table-tbody"
            >
            </v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts"
import { uniqBy } from 'lodash'


export default {
  components: {
    GChart
  },
  data: () => ({
    responsive: false,
    getAllMessages: null,
    getServerList: [],
    headers: [
      {
        text: 'ID',
        align: 'left',
        sortable: false,
        value: 'id',
      },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Percent', value: 'check.all_hdds.max.percentage' },
      { text: 'Status', value: 'check.all_servers.status' },
    ],
  }),
  created () {
    this.$store.dispatch('LOAD_DETAIL_DATA')
    this.$store.dispatch('LOAD_SERVER_DATA')
    this.$store.dispatch('LOAD_ACTIVE_ISSUE')

  },
  computed: {
    getDetailData() {
      const dataDetail = this.$store.getters.getActiveIssue;
      return dataDetail.filter(data => data.project == 'Hawk-ID' || data.project == 'Hawk-AU')
    },
    getServerData() {
      const dataServer = this.$store.getters.getServer;
      return dataServer.filter(data => data.name == 'ID-12' || data.name == 'AU-19')
    },
    setChartData() {
      const serverName = this.getServerData.map(o => o.name)
      const serverPercent = this.getServerData.map(o => parseInt(o.check.all_hdds.max.percentage))
      serverPercent.unshift("Used percentage (%)")
      const listServer = uniqBy(serverName)
      listServer.unshift("Server Name")
      const chartData = []
      chartData.push(listServer)
      chartData.push(serverPercent)

      return chartData
    },
    loadDetail() {
      return this.$store.getters.loadDetail
    },
    isLoading() {
      return this.loadDetail == 'LOADING'
    },
    isFetched() {
      return this.loadDetail == 'LOADED'
    },
    countHawkID() {
      return this.getDetailData.filter(data => data.project == 'Hawk-ID').length;
    },
    countStatusOpen() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return (data.status == 0 && data.content_type == "json" && title[0] != "E_WARNING:")
      }).length;
    },
    countStatusPending() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return (data.status == 1 && data.content_type == "json" && title[0] != "E_WARNING:")
      }).length;
    },
    countStatusChecking() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return (data.status == 2 && data.content_type == "json" && title[0] != "E_WARNING:")
      }).length;
    },
    countStatusClosed() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return (data.status == 3 && data.content_type == "json" && title[0] != "E_WARNING:")
      }).length;
    },
    countStatuIgnored() {
      return this.getDetailData.filter((data) => {
        let title = data.title.split(" ");
        return (data.status == 4 && data.content_type == "json" && title[0] != "E_WARNING:")
      }).length;
    },
    countHawkAU() {
      return this.getDetailData.filter(data => data.project == 'Hawk-AU').length;
    },
    countHawkCC() {
      return this.getDetailData.filter(data => data.project == 'Hawk-CC').length;
    },
    countHawkQCS() {
      return this.getDetailData.filter(data => data.project == 'Hawk-QCS').length;
    },
    countHawkSNTR() {
      return this.getDetailData.filter(data => data.project == 'Hawk-SNTR').length;
    },
    countTMSAU() {
      return this.getDetailData.filter(data => data.project == 'TMS-AU').length;
    },
    chartDatas() {
      return this.chartData
    },
  },

}
</script>
<style lang="css" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
    border-radius: 14px;
  }
  .text-class{
    top: -10px;
  }
  .text-offset{
    bottom: -24px;
  }
  .icon-clas{
    top: -15px;
  }
</style>
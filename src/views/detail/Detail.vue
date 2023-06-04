<template>
  <v-container>
    <v-card>
      <v-toolbar
        dark
        flat
      >
        <v-toolbar-title class="mx-auto">Messages Error List</v-toolbar-title>
          <template v-slot:extension>
            <v-tabs
              v-model="activeTab"
              centered
              slider-color="orange"
              background-color="transparent"
            >
              <v-tab
                v-for="title in tabs"
                :key="title.id"
                :to="title.route" 
                exact
              >
                  {{ title.name }}

                <span v-if="title.name == 'ALL Issue'" v-text="countAll" /> 
                <span v-if="title.name == 'HAWK-ID'" v-text="countHawkID" /> 
                <span v-if="title.name == 'HAWK-AU'" v-text="countHawkAU" /> 
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
          <router-view></router-view>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
const qs = require('qs')
const store = require('store')

import moment from 'moment'

  export default {
    data () {
      return {
        tab: null,
        tabs: [
          { id: 1, name: "ALL Issue", route: `/detail` },
          { id: 2, name: "HAWK-ID", route: `/detail/hawk-id` },
          { id: 3, name: "HAWK-AU", route: `/detail/hawk-au` },
        ],
        activeTab: null,
        loader: null,
        icon: true,
        right: true,
      }
    },
    computed: {
      getDetailData() {
        const dataDetail = this.$store.getters.getActiveIssue;
        return dataDetail;
      },
      listHawkID() {
        return this.getDetailData.filter((data) => {
        let title = data.title.split(' ')
        return data.project == "Hawk-ID" && data.content_type == "json" && title[0] != "E_WARNING:"
      });
      },
      listHawkAU() {
        return this.getDetailData.filter((data) => {
          let title = data.title.split(' ')
          return data.project == "Hawk-AU" && data.content_type == "json" && title[0] != "E_WARNING:"
        });
      },
      listHawkCC() {
        return this.getDetailData.filter(data => data.project == 'Hawk-CC');
      },
      listHawkQCS() {
        return this.getDetailData.filter(data => data.project == 'Hawk-QCS');
      },
      listHawkSNTR() {
        return this.getDetailData.filter(data => data.project == 'Hawk-SNTR');
      },
      listTMSAu() {
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
      countHawkAU() {
        const datas = this.listHawkAU.length;
        const data = " (" + datas + ")"
        return data
      },
      countHawkID() {
        const datas = this.listHawkID.length;
        const data = " (" + datas + ")"
        return data
      },
      countHawkCC() {
        const datas = this.listHawkCC.length;
        const data = " (" + datas + ")"
        return data
      },
      countHawkSNTR() {
        const datas = this.listHawkSNTR.length;
        const data = " (" + datas + ")"
        return data
      },
      countHawkQCS() {
        const datas = this.listHawkQCS.length;
        const data = " (" + datas + ")"
        return data
      },
      countTMSAU() {
        const datas = this.listTMSAu.length;
        const data = " (" + datas + ")"
        return data
      },
      countAll() {
        const datas = this.listHawkAU.length + this.listHawkID.length;
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
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 2000)

        this.loader = null
      },
    },
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

<template>
  <v-container>
    <v-card shaped>
        <v-card-text> Server Information</v-card-text>
        <v-container fluid>
            <v-row v-if="isLoading">
                <v-col
                    v-for="i in itemsPerPage"
                    :key="i"
                    cols="12"
                    sm="6"
                    md="6"
                    lg="6"
                    color="blue"
                    class="px-4"
                >
                    <v-skeleton-loader
                        type="image, article"   
                    >
                </v-skeleton-loader>
                </v-col>
            </v-row>
            <v-data-iterator
                :items="getServerData"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :search="search"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
                v-if="isFetched"
            >
                <template v-slot:header >
                    <v-toolbar
                        color="white"
                        shaped
                        class="mb-1 mx-r pa-0 pad"
                        elevation="0"
                    >
                    <v-text-field
                        v-model="search"
                        clearable
                        outlined
                        hide-details
                        color="purple"
                        class="mr-1 pa-0"
                        prepend-inner-icon="mdi-file-document-box-search-outline"
                        label="Search"
                    ></v-text-field>
                    <template>
                        <v-select
                            v-model="sortBy"
                            outlined
                            color="purple"
                            prepend-inner-icon="mdi-file-document-box-search-outline"
                            hide-details
                            :items="keys"
                            label="Sort by"
                        >
                        </v-select>
                        <v-spacer></v-spacer>
                        <v-btn-toggle
                            v-model="sortDesc"
                            mandatory
                        >
                        <v-btn
                            large
                            depressed
                            color="purple lighten-5"
                            dark
                            class="purple--text"
                            :value="false"
                        >
                            <v-icon color="purple">mdi-chevron-up</v-icon>
                        </v-btn>
                        <v-btn
                            large
                            depressed
                            color="purple lighten-5"
                            dark
                            class="purple--text"
                            :value="true"
                        >
                            <v-icon color="purple">mdi-chevron-down</v-icon>
                        </v-btn>
                        </v-btn-toggle>
                    </template>
                    </v-toolbar>
                </template>

                <template v-slot:default="props">
                    <v-row>
                    <v-col
                        v-for="item in props.items"
                        :key="item.name"
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        color="blue"
                        class="px-4"
                    >
                        <v-card color="purple lighten-2" dark>
                        <v-card-title class="body-1 font-weight-regular" color="purple">{{ item.name }} - {{ item.description }}</v-card-title>

                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>Server Status:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.check.all_servers.status }}</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>All Process:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.check.all_process.status }}</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>Hdds Status:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.check.all_hdds.status }}</v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>Hdds Percentage:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.check.all_hdds.max.percentage }}</v-list-item-content>
                            </v-list-item>
                        </v-list>
                        </v-card>
                    </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="mt-2 mx-2" align="center" justify="center">
                        <span class="grey--text">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                            <v-btn
                                dark
                                text
                                color="purple"
                                class="ml-2"
                                v-on="on"
                            >
                                {{ itemsPerPage }}
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                            </template>
                            <v-list>
                            <v-list-item
                                v-for="(number, index) in itemsPerPageArray"
                                :key="index"
                                @click="updateItemsPerPage(number)"
                            >
                                <v-list-item-title>{{ number }}</v-list-item-title>
                            </v-list-item>
                            </v-list>
                        </v-menu>

                        <v-spacer></v-spacer>

                        <span
                            class="mr-4
                            grey--text"
                        >
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn
                            fab
                            dark
                            color="purple lighten-5"
                            elevation="0"
                            class="mr-1 purple--text"
                            @click="formerPage"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            color="purple lighten-5"
                            elevation="0"
                            class="ml-1 purple--text"
                            @click="nextPage"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 6, 8],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        sortBy: 'name',
        keys: [
          'Name',
          'ID',
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.getServerData.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
      getServerData() {
        const dataServer = this.$store.getters.getServer;
        return dataServer.filter(data => data.name == 'ID-12' || data.name == 'AU-19')
      },
      loadServer () {
        return this.$store.getters.loadServer
      },
      isLoading () {
        return this.loadServer == 'LOADING'
      },
      isFetched () {
        return this.loadServer == 'LOADED'
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
    created() {
      this.$store.dispatch('LOAD_SERVER_DATA')
    },
  }
</script>
<style scoped>
.v-toolbar__content{
    padding: 0;
}
</style>
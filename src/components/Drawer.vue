<template>
  <div>
    <v-navigation-drawer
        fixed
        class="v-navv"
        dark
        app
        persistent
        :src="image"
        color="black"
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
    >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>
        <v-list-item two-line>

        <v-list-item-title class="white--text title roboto" style="text-transform: capitalize" >
          <v-chip outlined color="orange" class="pa-4 mr-3">
            {{userRole}}
          </v-chip>
            {{ userLogin }} !
        </v-list-item-title>

        </v-list-item>

        <v-divider />

        <v-list nav v-if="userRole != 'system'">
        <v-list-item
          router
          dark
          class="body-4 mx-2 mt-2"
          :to="item.to"
          :key="i"
          :disabled="item.disabled"
          v-for="(item, i) in items"
          active-class="purple-active"
          :class="item.to === $route.matched[1].path ? 'purple-active' : ''"
          exact
        >
            <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>

        <v-list nav v-if="userRole == 'system'">
        <v-list-item
          router
          dark
          class="body-4 mx-2 mt-2"
          :to="item.to"
          :key="i"
          :disabled="item.disabled"
          v-for="(item, i) in system_items"
          active-class="purple-active"
          :class="item.to === $route.matched[1].path ? 'purple-active' : ''"
          exact
        >
            <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
      id="core-app-bar"
      app
      flat
      color="transparent"
      absolute
      elevate-on-scroll
      :clipped-left="clipped"
    >
      <v-toolbar-title class="tertiary--text font-weight-light align-self-center mx-0">
        <v-btn
          dark
          icon
          color="purple"
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        Dashboard For Error Reporting
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-row
          align="center"
          class="mr-4"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="purple"
                dark
                fab
                small
                text
                v-on="on"
              >
                <v-icon>
                  mdi-account
                </v-icon>
              </v-btn>
            </template>
            <v-list 
              width="150"
            >
              <v-list-item
                @click="logout"
              >
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
var store = require('store')
export default {
  data () {
    return {
      items: [
        { icon: 'mdi-view-dashboard-variant', title: 'Dashboard', to: '/dashboard' },
        { icon: 'mdi-file-eye-outline', title: 'Active Issue', to: '/detail' },
        { icon: 'mdi-server', title: 'Server', to: '/server' },
        { icon: 'mdi-history', title: 'Histories', to: '/histories' },
        { icon: 'mdi-account-details', title: 'My Task', to: '/todo' },
      ],
      system_items: [
        { icon: 'mdi-view-dashboard-variant', title: 'Dashboard', to: '/dashboard' },
        { icon: 'mdi-account-details', title: 'Report', to: '/report' },
      ],
      username: 'INTIMAP',
      title: null,
      responsive: false,
      drawer: true,
      clipped: false,
      image: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg'
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  computed: {
    userLogin() {
      return store.get('userData').name
    },
    userRole() {
      const dataUser = this.$store.getters.getUsers.find(user => user.id == store.get('userData').id)
      if(dataUser) {
        return dataUser.role
      }
    }
  },
  created() {
    this.$store.dispatch('LOAD_USERS_DATA')
  },
  methods: {
    logout () {
      store.clearAll()
      this.$router.push({path:'/login'})
      window.location.reload()
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>
<style>
.v-navv{
  border-left-color: 2px green;
}
.roboto{
  font-family: Roboto,sans-serif;
  line-height: 1.5;

}
.purple-active{
    background-color: #9c27b0 !important;
    border-color: #9c27b0 !important;
}
</style>
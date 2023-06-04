<template>
  <v-app>
    <Drawer />
    <Views />
    <Footer />
  </v-app>
</template>

<script>
import Drawer from '../components/Drawer'
import Views from '../components/Views'
import Footer from '../components/Footer'

export default {
  components: {
    Drawer,
    Views,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>

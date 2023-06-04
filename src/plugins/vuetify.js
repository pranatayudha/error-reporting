import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(Vuetify);

const opts = {};
if (process.env.VUE_APP_MAP_CLIENT) {
  opts.client = process.env.VUE_APP_MAP_CLIENT;
} 
// else if (process.env.VUE_APP_MAP_KEY) {
//   opts.key = process.env.VUE_APP_MAP_KEY;
// }

Vue.use(VueGoogleMaps, {
  load: opts
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});

import App from './App.vue'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import $ from 'jquery'
import VueRouter from 'vue-router'

import Accueil from './components/accueil.vue'
import Template_selection from './components/template_select.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const router = new VueRouter({

  routes : [
    {
      path: "",
      component: Accueil,
      props: {
        background_acc: true
      },
    },
    {
      path: "/new_screen",
      component: Template_selection,
      props:{
        modif: false //SCREEN CREATION, template_select.vue normal 
      }
    },
    {
      name: "modif_screen",
      path: "/mod_screen",
      component: Template_selection,
      props(route) {
        return{
          screen : route.query.screen
        } 
      }
    }
  ],
  mode: 'history'  
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
<template>
  <div class="content_welc">
      <div class="head_logo">
        <img src="../images/U IRIS blanc - logo.png" alt="Logo U IRIS" class="logo">
      </div>

      <div class="entity">
            <h3 id="title_e"> Entité </h3>
            <button type="button" :class="button_1" value="u_log" id="b-entity" v-on:click="select_ent('u_log')">U_Log</button>
            <button type="button" :class="button_2" value="iris" id="b-entity" v-on:click="select_ent('iris')" >IRIS</button>
            <button type="button" :class="button_3" value="u_enseigne" id="b-entity" v-on:click="select_ent('u_enseigne')">U-Enseigne</button>
      </div>

      <div class="site">
        <h3 id="title_s"> Site </h3>

        <select v-if="entity_selected != null" class="custom-select custom-select-lg mb-3 w-25" 
            v-model="site_selected" 
            v-on:change="site_changed(site_selected)">
            <option selected value="default"> Choisir le site </option>
            <option v-for="(site, index) in sites" :key="index"  :value="site.nom" :id="site.id" > {{site.nom }} </option>
        </select>
        <select v-else class="custom-select custom-select-lg mb-3 w-25" disabled>
            <option selected> Choisir l'entité  </option>
        </select>
        <b-button size="sm" class="mb-2" variant="outline-success" id="site_plus" v-b-modal.modal_modif v-on:click="add_s('site')" 
        v-if="entity_selected != null">
            <b-icon icon="plus" scale="2.5"></b-icon>
        </b-button>
        <b-button size="sm" class="mb-2" variant="outline-success" id="site_plus" v-b-modal.modal_modif v-on:click="add_s('site')" 
        v-else disabled>
            <b-icon icon="plus" scale="2.5"></b-icon>
        </b-button>

        <b-button size="sm" class="mb-2" :variant="button_modif_site" id="site_modify" v-on:click="modif('site')" 
            v-b-modal.modal_modif  v-if="site_selected != null">
            <b-icon icon="pencil" scale="2"></b-icon>
        </b-button>
        <b-button size="sm" class="mb-2" :variant="button_modif_site" id="site_modify" v-on:click="modif('site')" v-else disabled>
            <b-icon icon="pencil" scale="2"></b-icon>
        </b-button>

        <b-button size="sm" class="mb-2" variant="outline-danger" id="site_delete" v-b-modal.modal_delete v-if="site_selected != null" 
                v-on:click="delete_s('site')">
            <b-icon icon="trash" scale="2"></b-icon>
        </b-button>
        <b-button size="sm" class="mb-2" variant="outline-danger" id="site_delete" v-b-modal.modal_delete v-else disabled>
            <b-icon icon="trash" scale="2"></b-icon>
        </b-button>


        </div>
      <div class="screen">
        <h3 id="title_e"> Ecran </h3>

        <select v-if="site_selected != null" class="custom-select custom-select-lg mb-3 w-25" v-model="screen_selected"
         v-on:change="screen_changed(screen_selected)">>
            <option value="default" selected v-if="screens_found != null"> Choisir l'écran </option>
            <option value="default" selected v-else > Aucun écran trouvé </option>
            <option v-for="screen in screens_found" :key="screen.nom" :id="screen.nom"> {{screen.nom }} </option>
        </select>
        <select v-else class="custom-select custom-select-lg mb-3 w-25" disabled>
            <option selected> Choisir le site  </option>
        </select>

        <a href="/new_screen">
        <b-button size="sm" class="mb-2" variant="outline-success" id="screen_plus" v-if="site_selected != null ">
            <b-icon icon="plus" scale="2.5"></b-icon>
        </b-button>
        </a> 
        <b-button size="sm" class="mb-2" variant="outline-success" id="screen_plus" v-if="site_selected == null" disabled="">
            <b-icon icon="plus" scale="2.5"></b-icon>
        </b-button>
           

        <router-link :to="{query: {screen: screen_selected,inf:screen_inf},name:'modif_screen',props:true} ">
        <b-button size="sm" class="mb-2" :variant="button_modif_screen" id="screen_modify" v-on:click="modif('screen')" 
         v-if="screen_selected != null && screen_selected != 'default'">
            <b-icon icon="pencil" scale="2"></b-icon>
        </b-button>
        </router-link>
        <b-button size="sm" class="mb-2" :variant="button_modif_screen" id="screen_modify" v-on:click="modif('screen')"  
        v-if="screen_selected == null || screen_selected == 'default'" disabled>
            <b-icon icon="pencil" scale="2"></b-icon>
        </b-button>

        <b-button size="sm" class="mb-2" variant="outline-danger" id="screen_delete" v-if="screen_selected != null && screen_selected != 'default' " 
            v-on:click="delete_s('screen')" v-b-modal.modal_delete> 
            <b-icon icon="trash" scale="2"></b-icon>
        </b-button>
        <b-button size="sm" class="mb-2" variant="outline-danger" id="screen_delete" v-else disabled>
            <b-icon icon="trash" scale="2"></b-icon>
        </b-button>        
      </div>

      <div class="modal_mod">
         <b-modal id="modal_modif" size="lg" :title="title_modal" cancel-title="Annuler" ok-title="Valider"
                 v-on:close="on_modal_close" 
                 v-on:cancel="on_modal_close">
            <div class="site_name">

               <!-- NAME INPUT -->
               <b-form inline>
                <span  v-if="modif_site || create_site " style="margin-right:2%;margin-left:10%"> Nom du site</span>

                <label class="sr-only" for="inline-form-input-name">Name</label>
                <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                v-if="site_selected == null || site_selected == 'default' || create_site == true "
                placeholder="Saisir un Nom"
                ></b-input>
                <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                v-if="site_selected != null && site_selected != 'default' && create_site == false"
                placeholder="Saisir un Nom"
                :value="site_selected"
                ></b-input>
               </b-form>
                <br>

                <!-- EMAIL INPUT  -->
                <b-form inline>
                <span v-if="modif_site || create_site" style="margin-right:2%;margin-left:10%"> Email</span>

                <label class="sr-only" for="inline-form-input-mail">Email</label>
                <b-input
                id="inline-form-input-mail"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Saisir un Mail"
                style="margin-left:6.5%"
                ></b-input>
               </b-form>
               <br>

               <!-- IP MASK INPUT  -->
               <b-form inline>
                <span v-if="modif_site || create_site" style="margin-right:2%;margin-left:10%"> Masque IP </span>
                <span v-if="modif_screen == true" style="margin-right:4.5%;margin-left:10%"> Masque IP </span>

                <label class="sr-only" for="inline-form-input-mail">ip_mask</label>
                <b-input
                id="inline-form-input-ip_mask"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Saisir un Masque IP"
                style="margin-left: 2%"
                ></b-input>
               </b-form>
            </div>
        </b-modal>
      </div>

    <div class="modal_delete">
         <b-modal id="modal_delete" :title="title_delete" button-size="sm" cancel-title="Annuler" ok-title="Confirmer">
            <p class="my-2" v-if="title_delete == 'Suppression Site'"> Voulez vous vraiment supprimer le site {{ site_selected }} ? </p>
            <p class="my-2" v-if="title_delete == 'Suppression Ecran'"> Voulez vous vraiment supprimer l'écran {{ screen_selected }} ? </p>
        </b-modal>
    </div>

  </div>
</template>

<script>
import sites from '../json/sites.json'

export default {
    name: 'accueil',
    data(){
        return{
            
            sites : sites.liste,
            id_site : null,
            id_screen: null,
            screens_found : null,
            screen_inf: null,

            entity_selected : null,
            site_selected: null,
            screen_selected: null,

            button_1: "btn btn-outline-info btn-lg",
            button_2:"btn btn-outline-info btn-lg",
            button_3:"btn btn-outline-info btn-lg",
            button_modif_site: "outline-secondary",
            button_modif_screen: "outline-secondary",

            modal_modif: false,
            title_modal : null,
            title_delete: null,
            create_site: false,
            create_screen:false,
            modif_site: false,
            modif_screen:false
        }
    },

    props: {
        background_acc: Boolean
    },

    methods : {
        select_ent(entity){
            this.entity_selected =entity;
            
            if(entity == "u_log"){
                this.button_1 = "btn btn-info btn-lg"
                this.button_2 = "btn btn-outline-info btn-lg"
                this.button_3 = "btn btn-outline-info btn-lg"
            }
            else if(entity == "iris"){
                this.button_1 = "btn btn-outline-info btn-lg"
                this.button_2 = "btn btn-info btn-lg"
                this.button_3 = "btn btn-outline-info btn-lg"
            }
            else if(entity == "u_enseigne"){
                this.button_1 = "btn btn-outline-info btn-lg"
                this.button_2 = "btn btn-outline-info btn-lg"
                this.button_3 = "btn btn-info btn-lg"
            }
            
        },

        add_s(type){
            this.modal_modif = true

            if(type == 'site'){
                this.create_site = true
                this.title_modal = "Ajout Site"
            }
        },

        modif(type){
            this.modal_modif = true;
            this.create_site = false;

            if(type=='site'){
                this.modif_site = true;
                this.modif_screen=false;
                this.title_modal = "Modification Site"

                if(this.button_modif_site == "outline-secondary"){

                    this.button_modif_site = "secondary"
                }
                else{
                    this.button_modif_site = "outline-secondary"
                }
            }

            if(type == 'screen'){
                this.modif_site = false;
                this.modif_screen = true;
                this.title_modal = "Modification Ecran"

                if(this.button_modif_screen == "outline-secondary"){

                    this.button_modif_screen = "secondary"
                }
                else{
                    this.button_modif_screen = "outline-secondary"
                }
            }            
        },

        delete_s(type){
            if(type == "site"){
                this.title_delete = "Suppression Site"
            }
            else if(type == "screen"){
                this.title_delete = "Suppression Ecran"
            }
        },

        on_modal_close(){
            this.button_modif_screen = 'outline-secondary'
            this.button_modif_site = 'outline-secondary'
        },

        site_changed(site_name){
            if(this.site_selected == "default"){
                
                this.site_selected = null
                this.screen_selected = null
            }
    
            this.sites.forEach(element => {

                if(element.nom == site_name){
                    this.id_site = element.id;
                    this.screens_found = element.liste_screen;
                   
                    console.log("Site selected: " + this.site_selected)
                    console.log("id: " + element.id)
                }

            });
        },

        screen_changed(screen_name){

            if(this.screens_found != null){

                this.screens_found.forEach(element => {

                if(element.nom == screen_name){
                    this.id_screen = element.id;
                    this.screen_selected = element.nom
                    this.screen_inf = element
               
                    console.log("Screen selected : " + this.screen_selected)
                    console.log("id: " + element.id)
                }

            });
            }
        }
    }
}
</script>

<style>

.content_welc{
    margin-top: -30px;
    background-image:  url('../images/accueil_fond.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
}

/* Logo Part */
.logo{

    width: 9%;
}

/* Entity part (top) */ 
.entity{
    margin-top: 3%;
    margin-left: 10%;
}

#title_e{
    float: left;
    margin-right: 4%;
}

#b-entity{
    margin-right: 2%;
}


/* Site part (mid) */
.site,.screen{
    margin-top: 6%;
    margin-left: 10%;
}

#title_s{
    float: left;
    margin-right: 4%;
    margin-top: 1%;
}

#site_plus,#screen_plus{
    margin-left: 3%;
    margin-top: 1%;
}

#site_modify,#site_delete,#screen_modify,#screen_delete{
    margin-left: 1.5%;
    margin-top: 1%;
}

/* screen part (bottom) */

#title_e    {
    float: left;
    margin-right: 2.5%;
    margin-top: 1%;
}

</style>
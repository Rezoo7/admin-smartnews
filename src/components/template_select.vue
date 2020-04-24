<template>
  <div class="selection">

        <!-- BACK BUTTON  -->
    <menu_template />
    <div class="title">
        <div class="form-inline">
            <label for="title_screen" style="margin-right: 3%;margin-left:3%"> Nom de l'Ecran</label>
            <input type="text" class="form-control" id="title_screen" placeholder="screen" :value="screen" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
        </div>
    </div>
    

    <div class="form" style="">
        <div class="box" v-for="temp in templates" v-bind:key="temp.id" :id="temp.id" style="width:40%;margin-bottom:8%;display:flex" v-on:click="setSelected(temp.id,false)">
            <div class="text" style="float:left;margin-top: 8%;margin-right:10%">
                <input class="form-check-input"  type="radio" name="template" :value="temp.id" v-model="selected" v-on:click="test_temp">
                <label class="form-check-label" for="template" id="label_temp" style="margin-left:7%;width:400px">
                    <h5 class="h5"> {{ temp.name }} </h5> 
                </label>
            </div>
            <div class="image" style="text-align:right;">
                <img :src="temp.img" style="height:100px;width:200px;vertical-align:middle;" />  
            </div>
        </div>
    </div>
    <div class="infos" style="display:inline" v-if="temp_selected != null">

         <!-- TOP ZONE  -->
        <table v-if="top != 0" class="table table-striped">
            <tbody v-if="top != 0">
                <div class="forTop" v-for="t in top" v-bind:key="t" style="margin-top:5%;">
                    <div class="titleTop" v-if="t == 1">
                        <thead> 
                            <th>
                                <h5> Zone Bandeau Haut </h5>
                            </th>
                        </thead>
                    </div>
                    
                    <form action="" class="was-validated">
                        <div class="form-check form-check-inline w-75" >
                            <tr>
                                <td>
                                    <input class="form-check-input"  type="radio" :name="nameTop[t]" value="drive" v-model="typeTop[t]" style="margin-left:5%" required>
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:5%">
                                        <h6 class="text-justify"> Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameTop[t]" value="nouveau drive" v-model="typeTop[t]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> Nouveau Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameTop[t]" value="url" v-model="typeTop[t]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> URL </h6> 
                                    </label>
                                </td>
                            </tr>
                        </div>
                    </form>

                    <div class="resTop" v-if="typeTop[t] != null">
                        <div class="input_link" v-if="typeTop[t] == 'drive'">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien du Drive" aria-label="Lien du Drive" aria-describedby="Drive Link">
                                <div class="input-group-append">
                                    <img src="../assets/drive_logo.png" class="img-fluid" alt="logo google drive" style="height:40px;margin-left:10%;">
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeTop[t] == 'url' ">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien Frame" aria-label="Lien Frame" aria-describedby="Lien Frame">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" disabled> URL </button>
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeTop[t] == 'nouveau drive' ">
                            <div>  </div>    
                        </div>
                    </div>
                </div>
            </tbody>
        </table>


        <!-- LEFT ZONE  -->
        <table v-if="left != 0" class="table table-striped">
            <tbody v-if="left != 0">
                <div class="forLeft" v-for="l in left" v-bind:key="l" style="margin-top:5%;">
                    <div class="titleLeft" v-if="l == 1">
                        <thead> 
                            <th v-if="right > 0 ">
                                <h5> Zone Gauche </h5>
                            </th>
                            <th v-else>
                                <h5> Zone Principale </h5>
                            </th>
                        </thead>
                    </div>

                    <form action="" class="was-validated">
                        <div class="form-check form-check-inline w-75">
                            <tr>
                                <td>
                                    <input class="form-check-input"  type="radio" :name="nameLeft[l]" value="drive" v-model="typeLeft[l]" style="margin-left:5%" required>
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:5%">
                                        <h6 class="text-justify"> Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameLeft[l]" value="nouveau drive" v-model="typeLeft[l]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> Nouveau Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameLeft[l]" value="url" v-model="typeLeft[l]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> URL </h6> 
                                    </label>
                                </td>
                            </tr>
                        </div>
                    </form>
                    <div class="resLeft" v-if="typeLeft[l] != null">
                        <div class="input_link" v-if="typeLeft[l] == 'drive'">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien du Drive" aria-label="Lien du Drive" aria-describedby="Drive Link">
                                <div class="input-group-append">
                                    <img src="../assets/drive_logo.png" class="img-fluid" alt="logo google drive" style="height:40px;margin-left:10%;">
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeLeft[l] == 'url' ">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien Frame" aria-label="Lien Frame" aria-describedby="Lien Frame">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" disabled> URL </button>
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeLeft[l] == 'nouveau drive' ">
                            <div> </div>    
                        </div>
                    </div>
                </div>
            </tbody>
        </table>    

        <!-- RIGHT ZONE  -->
        <table v-if="right != 0" class="table table-striped">
            <tbody v-if="right != 0">
                <div class="forRight" v-for="r in right" v-bind:key="r" style="margin-top:5%;">
                    <div class="titleTop" v-if="r == 1">
                        <thead> 
                            <th>
                                <h5> Zone Droite </h5>
                            </th>
                        </thead>
                    </div>

                    <form action="" class="was-validated">
                        <div class="form-check form-check-inline w-75">
                            <tr>
                                <td>
                                    <input class="form-check-input"  type="radio" :name="nameRight[r]" value="drive" v-model="typeRight[r]" style="margin-left:5%" required>
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:5%">
                                        <h6 class="text-justify"> Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameRight[r]" value="nouveau drive" v-model="typeRight[r]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> Nouveau Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameRight[r]" value="url" v-model="typeRight[r]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> URL </h6> 
                                    </label>
                                </td>
                            </tr>
                        </div>
                    </form>
                    <div class="resRight" v-if="typeRight[r] != null">
                        <div class="input_link" v-if="typeRight[r] == 'drive'">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien du Drive" aria-label="Lien du Drive" aria-describedby="Drive Link">
                                <div class="input-group-append">
                                    <img src="../assets/drive_logo.png" class="img-fluid" alt="logo google drive" style="height:40px;margin-left:10%;">
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeRight[r] == 'url' ">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien Frame" aria-label="Lien Frame" aria-describedby="Lien Frame">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" disabled> URL </button>
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeRight[r] == 'nouveau drive' ">
                            <div>  </div>    
                        </div>
                    </div>
                </div>
            </tbody>
        </table>


        <!-- BOT ZONE  -->
        <table v-if="bot != 0" class="table table-striped">
            <tbody v-if="bot != 0">
                <div class="forTop" v-for="b in bot" v-bind:key="b" style="margin-top:5%;">
                    <div class="titleTop" v-if="b == 1">
                        <thead> 
                            <th>
                                <h5> Zone Bandeau Bas </h5>
                            </th>
                        </thead>
                    </div>
                    <form action="" class="was-validated">
                        <div class="form-check form-check-inline w-75">
                            <tr>
                                <td>
                                    <input class="form-check-input"  type="radio" :name="nameBot[b]" value="drive" v-model="typeBot[b]" style="margin-left:5%" required>
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:5%">
                                        <h6 class="text-justify"> Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameBot[b]" value="nouveau drive" v-model="typeBot[b]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> Nouveau Drive </h6> 
                                    </label>

                                    <input class="form-check-input"  type="radio" :name="nameBot[b]" value="url" v-model="typeBot[b]" style="margin-left:10%;">
                                    <label class="form-check-label" for="template" id="label_temp" style="margin-left:4%">
                                        <h6 class="text-justify"> URL </h6> 
                                    </label>
                                </td>
                            </tr>
                        </div>
                    </form>
                    <div class="resBot" v-if="typeBot[b] != null">
                        <div class="input_link" v-if="typeBot[b] == 'drive'">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien du Drive" aria-label="Lien du Drive" aria-describedby="Drive Link">
                                <div class="input-group-append">
                                    <img src="../assets/drive_logo.png" class="img-fluid" alt="logo google drive" style="height:40px;margin-left:10%;">
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeBot[b] == 'url' ">
                            <div class="input-group w-75">
                                <input type="text" class="form-control" placeholder="Lien Frame" aria-label="Lien Frame" aria-describedby="Lien Frame">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" disabled> URL </button>
                                </div>
                            </div>    
                        </div>
                        <div class="input_link" v-if="typeBot[b] == 'nouveau drive' ">
                            <div>  </div>    
                        </div>
                    </div>
                </div>
            </tbody>
        </table>

        <button type="button" class="btn btn-secondary btn-lg btn-block w-75"> Valider </button>

    </div>
  </div>
</template>

<script>
import json from '../json/templates.json'
import menu_template from './menu.vue'

export default {
    name: 'template_selection',
    components: {
        menu_template
    },
    props:{
        screen : String,
        inf: Object
    },

    data(){

     return {
            templates : json.templates,
            selected : null,
            temp_selected : null,
            top:null,
            left:null,
            right:null,
            bot:null,
        
            nameTop: null,
            nameLeft: null,
            nameRight: null,
            nameBot: null,

            typeTop: null,
            typeLeft: null,
            typeRight: null,
            typeBot: null,

        }
    },

    created:function(){
        
        console.log(this.inf)
        console.log-("ecran : "+ this.screen)
        //this.setSelected(this.inf.id,true)
    },
    methods: {

        test_temp(){
            console.log(this.temp_selected)
        },

        setSelected(name,load){
           

            console.log("euh")

           
           if(!load){
                this.selected = name; 
                this.temp_selected = this.templates[this.selected];
                this.top =  this.templates[this.selected].divs[0];
                this.left =  this.templates[this.selected].divs[1];
                this.right =  this.templates[this.selected].divs[2];
                this.bot =  this.templates[this.selected].divs[3]

           }

            this.nameTop = [""];
            this.nameLeft = [""];
            this.nameRight = [""];
            this.nameBot = [""];

            this.typeTop = [];
            this.typeLeft = [];
            this.typeRight = [];
            this.typeBot = [];

            //model top 

            if(this.top > 1){
                for(let i = 1; i < this.top;i++){
                    this.nameTop.push("modeltop_"+i)
                }
            }else if(this.top == 1){
                this.nameTop.push("modeltop_1");
            }

             //model left 

            if(this.left > 1){
                for(let i = 1; i < this.left;i++){
                    this.nameLeft.push("modelleft_"+i)
                }
            }else if(this.left == 1){
                this.nameLeft.push("modelleft_1");
            }


            //model right

            if(this.right > 1){
                for(let i = 1; i <= this.right;i++){
                    this.nameRight.push("modelright_"+i)
                }
            }else if(this.right == 1){
                this.nameRight.push("modelright_1");
            }


            //model bot

            if(this.bot > 1){
                for(let i = 1; i <= this.bot;i++){
                    this.nameBot.push("modelbot_"+i)
                }
            }else if(this.bot == 1){
                this.nameBot.push("modelbot_1");
            }

    
        },

        showTypes(){
            console.log(this.typeRight);
            console.log(this.typeRight[1],this.typeRight[2]);
        }
    }
}
</script>

<style>

.box{
    text-align: left;
}
.selection{
    margin-top: 4%;
    
}

.infos{
    width: 40%;
    height: 800px;
    float: right;
    margin-top: -65%;
    position: relative;
    
}

.form{
    margin-left: 4%;
    margin-top:2%;
    padding-left: 3%;
    width:50%;
}

input[type=radio]{
  transform:scale(1);
}

tr{
    width: 100%;
}

td{
    width: 800px;
}

</style>
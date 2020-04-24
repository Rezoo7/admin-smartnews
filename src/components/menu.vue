<template>
  <div class="menu">
    <a href="/">
    <button type="button" class="btn btn-outline-secondary btn-sm" id="backB"> 
        <h4 class="">  &#8617;&nbsp;Retour </h4> 
    </button>
    </a>

    <img src="../images/U IRIS blanc - logo.png" alt="logo u iris" id="logo_u">
  </div>
</template>

<script>
export default {
    name: 'menu_template'
}
</script>

<style>
.menu {
    width: 100%;
    margin-top:-4%;
    margin-bottom:2% ;
    background-image: 
        linear-gradient(
            to right,
            #E9F5F7,  #2081AB
        );
    height: 100px;
}

#backB{
    margin-top: 10px;
    margin-left: 10px;
}

#logo_u{
      height: 80px; 
      margin-left: 35%;
}
</style>
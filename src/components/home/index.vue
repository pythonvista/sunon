<template>
  <div class="wrap px-4 py-6 flex flex-col justify-end">
    <div class="btns  w-full flex flex-col items-center justify-center gap-4">
      <img width="150" src="@/assets/img/logo-white.png" alt=""> 
      <p class="ma-0 pa-0 text-lg text-white">Solar/Inverter Recomendation App</p>    
      <v-btn :to="{path: '/dashboard'}" small tile>Get Started</v-btn>  
    </div>

  </div>
</template>

<script>
export default {
    name: 'index'

}
</script>

<style scoped>
.wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #000418 93.75%), url('@/assets/img/bg.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

</style>
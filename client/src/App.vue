<template>
  <div id="main" style="height: 100%">
    <chatRoom style="height: 90%"></chatRoom>
  </div>
</template>
<script>
  import chatRoom from "@/components/chatRoom/chatRoom";
  export default {
    name: 'App',
    data(){
      return{
         loading: false
      }
    },
    components: {
      chatRoom,
    }
  }
</script>
<style>

</style>

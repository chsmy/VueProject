<template>
  <div class="hello">
    <h1 v-text="msg" class="title"></h1>
        
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '我是头部',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
	font-size: 1.4rem;
}
</style>

<template>
  <div>
    {{msg}}
    <Home :items="items"></Home>
  </div>
</template>

<script>
import Home from './components/home'
export default {
  components: { Home },
  data() {
    return {
      msg: 'hello vue1',
      items: [
        {
          id: 1,
          name: 'a'
        },
        {
          id: 2,
          name: 'b'
        },
        {
          id: 3,
          name: 'c'
        },{
          id: 4,
          name: 'd'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.items = [
        {
          id: 1,
          name: 'e'
        },
        {
          id: 2,
          name: 'f'
        },
        {
          id: 3,
          name: 'g'
        },{
          id: 4,
          name: 'h'
        }
      ]
    }, 10000);
  }
}
</script>

<style>

</style>
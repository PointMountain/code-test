<template>
  <div>
    <span v-for="i in list" :key="i.id">
      {{i.name}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      list: this.items
    }
  },
  watch: {
    items(val) {
      console.log('items发生变化', val)
    },
    list(val) {
      console.log('list发生变化', val)
    }
  }
}
</script>

<style>

</style>
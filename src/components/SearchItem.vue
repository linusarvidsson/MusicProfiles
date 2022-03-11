<template>
  <div class="container" @click="selectItem()">
    <img class="image" :src="image" alt="" />
    <div
      v-if="this.item.type == 'track' || this.item.type == 'album'"
      class="artist"
    >
      {{ item.artists[0].name }}
    </div>
    <div class="title">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      image: ''
    }
  },
  created() {
    if (this.item.type == 'track') {
      this.image = this.item.album.images[2].url
    } else if (this.item.images[2]) {
      this.image = this.item.images[2].url
    }
  },
  methods: {
    selectItem() {
      this.$emit('itemSelected')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background-color: rgb(40, 39, 39);
  padding: 8px;
  border-radius: 5px;
  margin-top: 8px;
  text-align: left;
  height: 65px;

  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: rgb(51, 50, 50);
  }
  .image {
    height: 65px;
    width: 65px;
  }
  .title {
    position: absolute;
    top: 30px;
    left: 85px;
    width: 300px;
    height: 45px;
    overflow: hidden;

    font-weight: bold;
    font-size: 16px;
  }
  .artist {
    position: absolute;
    top: 12px;
    left: 85px;
    color: #42b983;

    font-weight: bold;
    font-size: 13px;
  }
}
</style>

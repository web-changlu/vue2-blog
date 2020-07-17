<template>
  <div id="music_container" v-if="musicbox" v-movemusic>
    <p><i class="fa fa-music" aria-hidden="true"></i>音乐鉴赏
      <i class="fa fa-times closemusic" aria-hidden="true" @click="closemusic"></i>
    </p>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      class="musicBox"
      :src="music_link"
    ></iframe>
    <i @click="getMusic(--music_index)" class="prev_Button fa fa-step-backward" aria-hidden="true"></i>
    <i @click="getMusic(++music_index)" class="next_Button fa fa-step-forward" aria-hidden="true"></i>
  </div>
</template>
<script>
export default {
  name: 'music',
  data () {
    return {
      music_link: '',
      music_index: 9,
      musicbox: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getMusic(this.music_index)
    })
  },

  methods: {
    async getMusic (id) {
      const { data: res } = await this.$http.get(`/music/getmusic/${id}`)
      if (res.meta.status === 200) {
        console.log(res)
        this.music_link = `//music.163.com/outchain/player?type=2&id=${res.data[0].music_id}&auto=0&height=66`
        this.music_index = res.data[0].id
      } else {
        this.$Message.error(res.meta.msg)
      }
    },
    closemusic () {
      this.musicbox = !this.musicbox
    }
  },
  directives: {
    movemusic (el) {
      const box = el
      box.onmousedown = (e) => {
        // 算出鼠标相对元素的位置
        const disX = e.clientX - box.offsetLeft
        const disY = e.clientY - box.offsetTop
        document.onmousemove = (e) => {
          const left = e.clientX - disX
          const top = e.clientY - disY
          // 移动元素
          box.style.left = left + 'px'
          box.style.top = top + 'px'
        }
        document.onmouseup = (e) => {
          // 鼠标弹起停止移动
          document.onmousemove = null
          // 防止弹起后再次循环
          document.onmouseup = null
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
#music_container {
  width: 280px;
  margin-bottom: 1rem;
  background: #eeeeee90;
  padding:.2rem;
  border: 1px solid #ccc;
  position: fixed;
  // color: #fff;
  font-size: 13px;
  border-radius: 8px!important;
  border-bottom-left-radius: 0!important;
  border-bottom-right-radius: 0!important;
  right: 200px;
  top:500px;
  z-index: 999;
  cursor: move;
  p {
      font-size: 14px;
      padding:0.2rem;
      border-bottom:1.5px solid #409EFF;
  }
  .musicBox {
    height: 7.2rem;
    width: 100%;
    border-radius: 8px;
  }
  i.prev_Button,i.next_Button {
    font-size: 1rem;
    margin: 0 0.5rem;
    position: absolute;
    bottom: 0.5rem;
    color: #333;
    cursor: pointer;
    font-weight: bold;
  }
  .prev_Button {
    left: 40%;
  }
  .next_Button {
    right: 40%;
  }
}
i:hover {
  color: red !important;
}
.closemusic{
  position: absolute;
  right: 5px;
  cursor: pointer;
}
</style>

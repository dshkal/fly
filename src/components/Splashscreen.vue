<template>
  <div id="splash" :style="`visibility: ${splash ? 'visible' : 'hidden'}`">
    <div id="left-part" class="animation-bg"></div>
    <div id="right-part" class="animation-bg"></div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { TimelineLite } from 'gsap'

export default {
  name: 'splash',
  data () {
    return {
      animation: null
    }
  },
  computed: {
    splash () {
      return this.$store.state.splash
    }
  },
  watch: {
    splash (newValue) {
      if (newValue) {
        this.animation.play()
      }
    }
  },
  methods: {
    onAnimationComplete () {
      let splash = document.querySelector('#splash')
      let leftPart = document.querySelector('#left-part')
      let rightPart = document.querySelector('#right-part')
      let tl = new TimelineLite({paused: false})
      tl
        .set(leftPart, { css: { backgroundColor: '#1976D2' } }, 'bg')
        .set(rightPart, { css: { backgroundColor: '#1976D2' } }, 'bg')
        .to(leftPart, 1, { left: 0, width: '100%' }, 'bg')
        .to(rightPart, 1, { right: 0, width: '100%' }, 'bg')
        .set(splash, { css: { backgroundColor: '#1976D2' } })
        .to(splash, .25, { css: { opacity: 0, display: 'none' } })
    },
    init () {
      this.animation = lottie.loadAnimation({
        container: document.querySelector('#splash'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../../public/animation-w414-h812.json'
      })
      this.animation.onComplete = this.onAnimationComplete
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>

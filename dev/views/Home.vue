<template>
  <div :class="[$style.container]">
    <div :class="[$style.header]">
      <span></span>
      <button class="button" @click="onLogout">退出</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {

  onLogout () {
    this.$auth.logout().then(() => {
      this.$router.push('/login')
    })
  }
}
</script>

<style lang="scss" module>
.container {
  height: 100vh;
}

.header {
  height: 80px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>

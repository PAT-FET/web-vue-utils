<template>
  <div :class="[$style.container]">
   <form :class="[$style.box]">
     <div class="mt-5">
       <label :class="[$style.label]">用户名：</label>
       <input type="text" class="input" style="width: 240px;">
     </div>
     <div class="mt-3">
       <label :class="[$style.label]">密码：</label>
       <input type="password" class="input" style="width: 240px;">
     </div>
     <div class="mt-5">
      <button class="button" style="width: 240px;">登录</button>
     </div>
   </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {

}
</script>
<style lang="scss" module>
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.box {
  width: 420px;
  height: 360px;
  border: #e2e2e2 solid 1px;
  border-radius: 4px;
}

.label {
  display: inline-block;
  width: 80px;
}
</style>

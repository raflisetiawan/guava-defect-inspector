<template>
  <div id="home-page">
    <div class="container home-page-content">
      <div class="text-h5 text-center">Guava Inspector</div>
      <div class="row justify-center items-center full-height">
        <div class="wrapper">
          <div class="row justify-center">
            <TakePicture />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TakePicture from 'src/components/TakePicture.vue';
</script>

<style scoped>
.home-page-content {
  height: 100vh;
}
</style>

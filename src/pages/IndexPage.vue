<template>
  <div id="home-page">
    <div class="container home-page-content">
      <q-header elevated>
        <q-toolbar>

          <q-toolbar-title class="text-center">Guava Inspector</q-toolbar-title>

        </q-toolbar>
      </q-header>
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

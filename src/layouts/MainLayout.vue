<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white text-black">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" v-model="tab">
        <q-route-tab exact :to="{ name: 'HomePage' }" name="images" icon="home" />
        <q-tab exact name="videos" icon="add_a_photo" />
        <q-route-tab exact name="articles" icon="settings" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref();
</script>

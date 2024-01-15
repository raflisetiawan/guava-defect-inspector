<template>
  <div class="text-center q-mt-lg">
    <q-img v-show="imageURL" :src="$state.image" class="q-ma-sm" width="300px"></q-img>
    <q-img v-show="grayscaleURL" :src="grayscaleURL" class="q-ma-sm" width="300px"></q-img>
    <q-img v-show="threshURL" :src="threshURL" class="q-ma-sm" width="300px"></q-img>
    <q-img v-show="medianURL" :src="medianURL" class="q-ma-sm" width="300px"></q-img>
    <q-img v-show="edgesURL" :src="edgesURL" class="q-ma-sm" width="300px"></q-img>
    <q-img v-show="imageURL" :src="imageURL" class="q-ma-sm" width="300px"></q-img>
    <div class="text-h5">{{ $state.result.isDefected ? 'Buah Terdeteksi cacat' : 'Buah Terdeteksi masih segar' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';

const { $state } = useImageStore();

const imageURL = ref<string | undefined>();
const grayscaleURL = ref<string | undefined>();
const threshURL = ref<string | undefined>();
const medianURL = ref<string | undefined>();
const edgesURL = ref<string | undefined>();

// Membuat URL sementara dari blob saat komponen dipasang
onMounted(() => {
  if ($state.result.imageOutput) {
    imageURL.value = URL.createObjectURL($state.result.imageOutput);
  }
  if ($state.result.grayscaleOutput) {
    grayscaleURL.value = URL.createObjectURL($state.result.grayscaleOutput);
  }
  if ($state.result.threshOutput) {
    threshURL.value = URL.createObjectURL($state.result.threshOutput);
  }
  if ($state.result.medianOutput) {
    medianURL.value = URL.createObjectURL($state.result.medianOutput);
  }
  if ($state.result.edgesOutput) {
    edgesURL.value = URL.createObjectURL($state.result.edgesOutput);
  }
});

watchEffect(() => {
  if ($state.result.imageOutput) {

    imageURL.value = URL.createObjectURL($state.result.imageOutput);
  }
  if ($state.result.grayscaleOutput) {
    grayscaleURL.value = URL.createObjectURL($state.result.grayscaleOutput);
  }

  if ($state.result.threshOutput) {
    threshURL.value = URL.createObjectURL($state.result.threshOutput);
  }
  if ($state.result.medianOutput) {
    medianURL.value = URL.createObjectURL($state.result.medianOutput);
  }
  if ($state.result.edgesOutput) {
    edgesURL.value = URL.createObjectURL($state.result.edgesOutput);
  }
})


// Membersihkan URL sementara saat komponen dihancurkan(opsional)
onUnmounted(() => {
  if (imageURL.value) {
    URL.revokeObjectURL(imageURL.value);
  }
  if (grayscaleURL.value) {
    URL.revokeObjectURL(grayscaleURL.value);
  }
  if (threshURL.value) {
    URL.revokeObjectURL(threshURL.value);
  }
  if (medianURL.value) {
    URL.revokeObjectURL(medianURL.value);
  }
  if (edgesURL.value) {
    URL.revokeObjectURL(edgesURL.value);
  }

});
</script>

<style scoped></style>

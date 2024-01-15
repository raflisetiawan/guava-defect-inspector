<template>
  <div class="text-center q-mt-lg">
    <q-img v-show="imageURL" :src="imageURL" width="300px"></q-img>
    <div class="text-h5">{{ $state.result.isDefected ? 'Buah Terdeteksi cacat' : 'Buah Terdeteksi masih segar' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';

const { $state } = useImageStore();

const imageURL = ref<string | undefined>();

// Membuat URL sementara dari blob saat komponen dipasang
onMounted(() => {
  if ($state.result.imageOutput) {
    console.log($state.result.imageOutput);

    imageURL.value = URL.createObjectURL($state.result.imageOutput);
  }
});

watchEffect(() => {
  if ($state.result.imageOutput) {
    console.log($state.result.imageOutput);

    imageURL.value = URL.createObjectURL($state.result.imageOutput);
  }
})


// Membersihkan URL sementara saat komponen dihancurkan(opsional)
onUnmounted(() => {
  if (imageURL.value) {
    URL.revokeObjectURL(imageURL.value);
  }
});
</script>

<style scoped></style>

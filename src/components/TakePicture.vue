<template>
  <div>
    <div class="row justify-center q-mb-md">
      <img :src="$state.image" width="100px">
    </div>
    <div class="row">
      <q-btn icon-right="add_a_photo" label="Ambil Gambar" color="primary" @click="captureImage"></q-btn>
    </div>
    <div class="row justify-center q-mt-md" v-show="$state.image">
      <q-btn label="Lanjut" color="primary" @click="processImage"></q-btn>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Camera, CameraResultType } from '@capacitor/camera';
import { useImageStore } from 'src/stores/image';
import { useDefectDetection } from 'src/composables/fruitDefectDetection';
import { useLoadImage } from 'src/composables/loadImage';
import { QSpinnerGrid, useQuasar } from 'quasar';

/**
 * TakePicture component for capturing and processing images.
 *
 * @component
 * @example
 * <take-picture></take-picture>
 */

const { $state } = useImageStore();
const { loading } = useQuasar();

/**
 * Capture an image using the device camera.
 *
 * @async
 * @function
 * @name captureImage
 * @memberof TakePicture
 * @returns {Promise<void>} A Promise that resolves after capturing the image.
 */
async function captureImage() {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Base64, // Change resultType to Base64
  });

  const base64Data = `data:image/jpeg;base64,${image.base64String}`;
  $state.image = base64Data;

  // You can use the base64Data directly, or fetch the image file if needed
  const imageFile = await fetch(base64Data).then((res) => res.blob());
  // Perform additional actions if needed
  $state.imageFile = imageFile
}


/**
 * Process the captured image using defect detection.
 *
 * @async
 * @function
 * @name processImage
 * @memberof TakePicture
 * @returns {Promise<void>} A Promise that resolves after processing the image.
 */

const processImage = async (): Promise<void> => {
  try {
    loading.show({
      spinner: QSpinnerGrid,
      spinnerColor: 'primary',
      message: 'Memproses Gambar'
    })
    $state.result.imageOutput = null
    $state.result.isDefected = false
    const originalImage = await useLoadImage($state.imageFile);
    useDefectDetection(originalImage);
  } catch (error) {
    loading.hide()
    throw error
  } finally {
    loading.hide()
  }
}
</script>

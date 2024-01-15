// stores/image.ts
import { defineStore } from 'pinia';

export const useImageStore = defineStore('image', {
  state: () => ({
    image: '' as string | undefined,
    imageFile: '' as string | Blob,
    outputImage: '' as string | undefined, // Add a state for the output image
    result: {
      isDefected: false,
      imageOutput: null as Blob | null,
      grayscaleOutput: null as Blob | null,
      threshOutput: null as Blob | null,
      medianOutput: null as Blob | null,
      edgesOutput: null as Blob | null,
    },
  }),
  actions: {
    routeToSecondPage() {
      return this.router.push({ name: 'SecondPage' });
    },
  },
});

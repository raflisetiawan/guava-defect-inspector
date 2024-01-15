import * as cv from '@techstark/opencv-js';

/**
 * Loads an image file and returns it as a cv.Mat object.
 *
 * @param imageFile - The image file to load.
 * @returns A Promise that resolves to a cv.Mat object representing the loaded image.
 * @throws An error if the image file fails to load.
 */
export async function useLoadImage(
  imageFile: File | undefined | any
): Promise<cv.Mat> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const img = new Image();
        img.onload = () => {
          // Create a canvas element and draw the image on it
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0, img.width, img.height);

          // Convert the canvas to a cv.Mat
          const mat = cv.imread(canvas);
          resolve(mat);
        };
        img.src = event.target.result as string;
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.readAsDataURL(imageFile);
  });
}

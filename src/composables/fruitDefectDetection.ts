import * as cv from '@techstark/opencv-js';
import { useImageStore } from 'src/stores/image';

/**
 * Performs defect detection on an input image.
 *
 * @param image - The input image to perform defect detection on.
 * @returns A Promise that resolves to void.
 */
export const useDefectDetection = async (image: cv.Mat) => {
  const { $state, routeToSecondPage } = useImageStore();

  // Step 1: Input image
  const input = image;

  // Step 2: Preprocess
  const grayscale = new cv.Mat();
  cv.cvtColor(input, grayscale, cv.COLOR_RGBA2GRAY);

  const thresh = new cv.Mat();
  cv.threshold(grayscale, thresh, 100, 255, cv.THRESH_BINARY);

  const median = new cv.Mat();
  cv.medianBlur(thresh, median, 5);

  // Step 3: Background subtraction
  const bg = new cv.Mat();
  cv.bitwise_not(median, bg);

  // Step 4: Edge detection
  const edges = new cv.Mat();
  cv.Canny(bg, edges, 30, 90);

  // Step 5: Fill edges
  const kernel = cv.Mat.ones(5, 5, cv.CV_8U);
  cv.dilate(edges, edges, kernel);

  // Step 6: Calculate area
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    edges,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );

  let area = 0;

  for (let i = 0; i < contours.size(); ++i) {
    area += cv.contourArea(contours.get(i));
  }

  const total = input.cols * input.rows;
  const ratio = area / total;

  const output = image.clone();

  // Gambar kontur pada gambar keluaran
  for (let i = 0; i < contours.size(); ++i) {
    cv.drawContours(output, contours, i, new cv.Scalar(0, 255, 0), 2);
  }

  // Step 7: Classify
  console.log(ratio);

  if (ratio > 0.2) {
    // console.log('Defected');
    $state.result.isDefected = true;
  } else {
    console.log('Fresh');
    $state.result.isDefected = false;
  }

  const canvas = document.createElement('canvas');
  cv.imshow(canvas, output);

  // Mengonversi kanvas menjadi blob
  canvas.toBlob((blob) => {
    if (blob) {
      // Menyimpan blob ke state atau melakukan aksi lainnya
      // Contoh menyimpan blob ke state
      $state.result.imageOutput = blob;
    }
  }, 'image/png');

  cv.imshow(canvas, grayscale);
  canvas.toBlob((blob) => {
    if (blob) {
      // Menyimpan blob ke state atau melakukan aksi lainnya
      // Contoh menyimpan blob ke state
      $state.result.grayscaleOutput = blob;
    }
  }, 'image/png');

  cv.imshow(canvas, thresh);
  canvas.toBlob((blob) => {
    if (blob) {
      // Menyimpan blob ke state atau melakukan aksi lainnya
      // Contoh menyimpan blob ke state
      $state.result.threshOutput = blob;
    }
  }, 'image/png');

  cv.imshow(canvas, median);
  canvas.toBlob((blob) => {
    if (blob) {
      // Menyimpan blob ke state atau melakukan aksi lainnya
      // Contoh menyimpan blob ke state
      $state.result.medianOutput = blob;
    }
  }, 'image/png');

  cv.imshow(canvas, edges);
  canvas.toBlob((blob) => {
    if (blob) {
      // Menyimpan blob ke state atau melakukan aksi lainnya
      // Contoh menyimpan blob ke state
      $state.result.edgesOutput = blob;
    }
  }, 'image/png');

  // Membersihkan sumber daya
  output.delete();
  // Clean up
  input.delete();
  grayscale.delete();
  thresh.delete();
  median.delete();
  bg.delete();
  edges.delete();
  kernel.delete();
  contours.delete();
  hierarchy.delete();

  routeToSecondPage();
};

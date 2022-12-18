import org.opencv.core.Core;
import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {

        // Loading the OpenCV library
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Lab 1
//        Lab1 lab1 = new Lab1(); // Creating class object
//        lab1.runTestCode(); // Exc 1 - Running method from class object
//        lab1.readAndWriteImage(); // Exc 2 - Reading and writing an image
//        lab1.displayImage(); // Exc 3 - Displaying image within JFrame window
//        lab1.displayGrayscaleImage(); // Exc 4 - Displaying image in grayscale
//        lab1.testLoadingOtherFormats(); // Exc 5 - Loading different file formats
//        lab1.addTextToImage(); // Exc 6 - Adding text to image and displaying it in another window
//        lab1.addShapeToImage(); // Exc 7 - Adding geometrical shapes and lines to the image

        // Lab 2
        Lab2 lab2 = new Lab2();
//        lab2.shiftImage(100, 100); // Exc 1 - Translate image based on user input
//        lab2.mirrorImage('v'); // Exc 2 - Mirror source image [v] vertically, [h] horizontally or test the [0] parameter
//        lab2.rotateImage(90); // Exc 3 - Rotate image by a set amount of degrees
        lab2.cropImage(0, 100, 300, 200, 2); // Exc 4 - Crop selected area of the image
        /* Input Method [1]: [startPointX], [startPointY], [width], [height]
           Input Method [2]: [startPointY], [startPointX], [endPointY], [endPointX] */
//        lab2.enlargeImage(2.0f, 4.0f); // Exc 5 - Compare methods of enlarging the image
//        lab2.shrinkImage(0.5f, 0.25f); // Exc 6 - Compare methods of shrinking the image

        // Lab 3
//        Lab3 lab3 = new Lab3();
//        lab3.changeImageContrast(2); // Exc 1 - Change contrast of the image
//        lab3.changeImageBrightness(128); // Exc 2 - Change brightness of the image
//        lab3.overlayImages(); // Exc 3 - Overlay two images
    }

}

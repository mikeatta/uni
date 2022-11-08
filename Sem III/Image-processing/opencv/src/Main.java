import org.opencv.core.Core;
import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {

        // Loading the OpenCV library
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Lab 1
        Lab1 lab1 = new Lab1(); // Creating class object
//        lab1.runTestCode(); // Exc 1 - Running method from class object
//        lab1.readAndWriteImage(); // Exc 2 - Reading and writing an image
//        lab1.displayImage(); // Exc 3 - Displaying image within JFrame window
//        lab1.displayGrayscaleImage(); // Exc 4 - Displaying image in grayscale
//        lab1.testLoadingOtherFormats(); // Exc 5 - Loading different file formats
//        lab1.addTextToImage(); // Exc 6 - Adding text to image and displaying it in another window
//        lab1.addShapeToImage(); // Exc 7 - Adding geometrical shapes and lines to the image

        // Lab 2
        Lab2 lab2 = new Lab2();
        lab2.translateImage(100,100, "up"); // Exc 1 - Translate image based on user input
    }

}

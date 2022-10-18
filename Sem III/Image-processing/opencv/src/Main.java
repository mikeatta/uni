import org.opencv.core.Core;
import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {

        // Loading the OpenCV library
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Lab 1
        // Creating class object
        Lab1 lab1 = new Lab1(); // Creating class object
//        lab1.runTestCode(); // Running method from class object
//        lab1.readAndWriteImage(); // Reading and writing an image
//        lab1.displayImage(); // Displaying image within JFrame window
        lab1.displayGrayscaleImage(); // Displaying image in grayscale
    }

}
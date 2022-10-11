import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.imgcodecs.Imgcodecs;

public class OpenCV {
    public static void main(String[] args){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Installing the library
        Imgcodecs imgcodecs = new Imgcodecs();

        // Image path
        String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
        String imgWrite = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/output.jpg";

        // Loading the image
        Mat matrix = imgcodecs.imread(imgPath);
        System.out.println("Image successfully loaded");

        // Writing the image
        imgcodecs.imwrite(imgWrite, matrix);
        System.out.println("Image successfully written");
    }
}
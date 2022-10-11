import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void displayImage() throws IOException {
        // Loading the OpenCV library
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Reading file and storing it in a Matrix object
        String imagePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
        Mat image = Imgcodecs.imread(imagePath);

        // Encoding the image
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);

        // Storing the encoded matrix in a byte array
        byte[] byteArray = matOfByte.toArray();

        // Preparing the buffered image
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);

        // Instantiate JFrame
        JFrame frame = new JFrame();

        // Set content to JFrame
        frame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) throws IOException {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        // Installing the library
        Imgcodecs imgcodecs = new Imgcodecs();

        // Image path
        String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
        String imgWrite = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/output.jpg";

        // Exc 2 - Loading and writing the image
        System.out.println("Exc 2 - Loading and writing images:");
        // Loading the image
        Mat matrix = imgcodecs.imread(imgPath);
        System.out.println("Image successfully loaded");

        // Writing the image
        imgcodecs.imwrite(imgWrite, matrix);
        System.out.println("Image successfully written\n");

        // Exc 3 - Displaying the image
        System.out.println("Exc 3 - Displaying image with JFrame...\n");
        displayImage();
    }
}
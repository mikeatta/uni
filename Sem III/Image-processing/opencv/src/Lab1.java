import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Lab1 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
    String imgWritePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/output.jpg";

    // Exc 1 - Run OpenCV import test
    public void runTestCode() {
        System.out.println("Exc 1 - Run OpenCV Test");
        Mat img = new Mat(3, 3, CvType.CV_8U);
        int row = 0, col = 0;
        img.put(row, col, 1,2,3,4,5,6,7,8);
        System.out.println(img.dump() + "\n");
    }

    // Exc 2 - Read and write the image
    public void readAndWriteImage() {
        System.out.println("Exc 2 - Loading and writing an image");

        // Loading the image
        Mat matrix = Imgcodecs.imread(imgPath);
        System.out.println("Image successfully loaded");

        // Writing the image
        Imgcodecs.imwrite(imgWritePath, matrix);
        System.out.println("Image successfully written\n");
    }

    // Exc 3 - Display the image
    public void displayImage() throws IOException {
        System.out.println("Exc 3 - Displaying an image");

        // Reading the file and storing it in a matrix object
        Mat image = Imgcodecs.imread(imgPath);

        // Encoding the image
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);

        // Storing the encoded matrix in a byte array
        byte[] byteArray = matOfByte.toArray();

        // Preparing the buffered image
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);

        // Initiate JFrame
        JFrame jFrame = new JFrame();

        // Set content to JFrame
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);
        System.out.println("Displaying image with JFrame...\n");

        // End program on window close
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

}

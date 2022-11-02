import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.Buffer;

public class Lab1 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
    String testImgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/";
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

    // Exc 4 - Display the image in grayscale
    public void displayGrayscaleImage() throws IOException {
        System.out.println("Exc 4 - Display the image in grayscale");

        Mat image = Imgcodecs.imread(imgPath);
        Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY); // Turning image to grayscale
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);

        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    // Exc 5 - Loading .BMPs, .JPGs, .PNGs and .GIFs
    public void testLoadingOtherFormats() throws IOException {
        System.out.println("Exc 5 - Try loading different formats");

        // Creating file paths for different formats
        String loadBMP = testImgPath + "SAMPLE.bmp"; // .BMP Path
        String loadJPG = testImgPath + "IMG_2116.jpg"; // .JPG Path
        String loadPNG = testImgPath + "SAMPLE.png"; // .PNG Path
        String loadGIF = testImgPath + "SAMPLE.gif"; // .GIF Path

        Mat image = Imgcodecs.imread(loadBMP);
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);

        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    // Exc 6 - Add text to image and display in new window
    public void addTextToImage() throws IOException {
        System.out.println("Exc 6 - Add text to image and display it");

        // Adding text properties
        String textToInsert = "Hello World!";
        Point point = new Point(100, 100);
        Scalar color = new Scalar(255,255,255);
        int font = Imgproc.FONT_HERSHEY_PLAIN;
        double scale = 1.5;
        int thickness = 3;

        // Loading first image
        Mat image = Imgcodecs.imread(imgPath);
        Imgproc.putText(image, textToInsert, point, font, scale, color, thickness);
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);
        System.out.println("Displaying fist image...");

        // Displaying first image
        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        // Changing text properties
        textToInsert = "New text!";
        point = new Point(50,150);
        color = new Scalar(225,225,225);
        font = Imgproc.FONT_HERSHEY_COMPLEX;
        scale = 2;
        thickness = 2;

        // Loading second image
        image = Imgcodecs.imread(imgPath);
        Imgproc.putText(image, textToInsert, point, font, scale, color, thickness);
        matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byteArray = matOfByte.toArray();
        in = new ByteArrayInputStream(byteArray);
        bufferedImage = ImageIO.read(in);
        System.out.println("Displaying second image...");

        // Displaying second image
        JFrame jFrameNew = new JFrame();
        jFrameNew.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrameNew.pack();
        jFrameNew.setVisible(true);

        // Closing program on window exit
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        jFrameNew.setDefaultCloseOperation((WindowConstants.EXIT_ON_CLOSE));
    }

    // Exc 7 - Drawing geometrical shapes & lines on the image
    public void addShapeToImage() throws IOException {
        System.out.println("Exc 7 - Adding shapes to the image");

        // Loading the image
        Mat image = Imgcodecs.imread(imgPath);

        // Adding shapes to the image
        Imgproc.rectangle(image, new Point(100,250), new Point(200,350), new Scalar(255,255,255)); // Drawing a rectangle
        int thickness = Imgproc.FILLED; // Filling the circle
        Imgproc.circle(image, new Point(50,50), 25, new Scalar(225,225,225), thickness); // Drawing a circle
        Imgproc.line(image, new Point(200, 100), new Point(400, 225), new Scalar(255,255,255), 25); // Drawing a line

        // Loading the image continued
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        BufferedImage bufferedImage = ImageIO.read(in);
        System.out.println("Displaying modified image...");

        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        // Closing program on window exit
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

}

import org.opencv.core.*;
import org.opencv.core.Point;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Lab2 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
    String imgWritePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/";

    // Load image from path
    Mat src = Imgcodecs.imread(imgPath);

    private BufferedImage createImage(Mat image) throws IOException {
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        return ImageIO.read(in);
    }

    private void makeJFrame(BufferedImage image) {
        // Initiate JFrame
        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(image)));
        jFrame.pack();
        jFrame.setVisible(true);

        // Exit program on window close
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    // Exc 1 - Translate the image based on user input
    public void shiftImage(int shiftX, int shiftY) throws IOException {
        // Create destination matrix to store warp output
        Mat dest = new Mat();

        // Create warp matrix
        Mat warpMat = new Mat(2, 3, CvType.CV_64FC1);
        int row = 0, col = 0;
        warpMat.put(row, col, 1, 0, shiftX, 0, 1, shiftY);

        // Warp the image
        Imgproc.warpAffine(src, dest, warpMat, new Size());

        // Convert the matrix to an image
        BufferedImage bufferedImage = createImage(dest);

        // Display shifted image
        makeJFrame(bufferedImage);
    }

    // Exc 2 - Mirror image vertically or horizontally
    public void mirrorImage(char mirrorAxis) throws IOException {
        // Destination matrix
        Mat dest = new Mat();

        // Flip the image
        switch (mirrorAxis) {
            // Flip vertically
            case 'v' -> Core.flip(src, dest, 1);

            // Flip horizontally
            case 'h' -> Core.flip(src, dest, -1);

            // Test flip with '0' parameter
            case '0' -> Core.flip(src, dest, 0);

            // Handle incorrect input
            default -> System.out.println("@Lab2: mirrorImage ERROR -> Incorrect input");
        }

        // Display result
        BufferedImage bufferedImage = createImage(dest);
        makeJFrame(bufferedImage);
    }

    // Exc 3 - Rotate the image by a set degree
    public void rotateImage(float degrees) throws IOException {
        // Destination matrix
        Mat dest = new Mat(src.rows(), src.cols(), src.type());

        // Add rotation point at the center of src image
        Point point = new Point(src.width() / 2.0, src.width() / 2.0);

        // Create rotation matrix
        Mat rotationMatrix = Imgproc.getRotationMatrix2D(point, degrees, 1);

        // Set size
        Size size = new Size(src.rows(), src.cols());

        // Rotate the matrix
        Imgproc.warpAffine(src, dest, rotationMatrix, size);

        // Display result
        BufferedImage bufferedImage = createImage(dest);
        makeJFrame(bufferedImage);
    }

    // Exc 4 - Crop selected region of the image
    private Boolean validateInput(int pointX, int pointY, int width, int height, int method) {
        switch (method) {
            // Validate method 1 input
            case 1:
                if (pointX > src.width() || width > src.width()) return true;
                else if (pointY > src.height() || height > src.height()) return true;
                else return false;

            // Validate method 2 input
            case 2:
                if (pointX > src.height() || width > src.height()) return true;
                else if (pointY > src.width() || height > src.width()) return true;
                else return false;

            // Return true on incorrect method input
            default: return true;
        }
    }

    public void cropImage(int pointX, int pointY, int width, int height, int method) throws IOException {
        // Initialize destination matrix
        Mat dest = new Mat();

        // Validate cropImage input
        if (validateInput(pointX, pointY, width, height, method))
            System.out.println("Error: Input exceeds image width, height or method index");
        else {
            if (method == 1) {
                // Create the crop area
                Rect cropArea = new Rect(pointX, pointY, width, height);

                // Crop the image
                dest = new Mat(src, cropArea);
            } else if (method == 2) {
                // Submat selected area into dest matrix
                dest = src.submat(pointX, width, pointY, height);
            } else System.out.println("Error: Unexpected input in method parameter");

            // Display result
            BufferedImage bufferedImage = createImage(dest);
            makeJFrame(bufferedImage);
        }
    }

    // Exc 5 - Compare OpenCV methods of enlarging images
    public void enlargeImage(float scaleOne, float scaleTwo) {
        // Create matrix for the processed image
        Mat dest = new Mat();

        // Set first scale
        Size scale = new Size(src.cols() * scaleOne, src.rows() * scaleOne);

        // Enlarge src image
        Imgproc.resize(src, dest, scale);

        // Save processed image on the drive
        Imgcodecs.imwrite(imgWritePath + "resizeX" + scaleOne + ".jpg", dest);

        // Change scale
        scale = new Size(src.cols() * scaleTwo, src.rows() * scaleTwo);
        Imgproc.resize(src, dest, scale);
        Imgcodecs.imwrite(imgWritePath + "resizeX" + scaleTwo + ".jpg", dest);
        System.out.println("Done enlarging image with resize");

        // Enlarge image using pyrUp
        Imgproc.pyrUp(src, dest, new Size(src.cols() * scaleOne, src.rows() * scaleOne), Core.BORDER_DEFAULT);
        Imgcodecs.imwrite(imgWritePath + "pyrUpX" + scaleOne + ".jpg", dest);

        // Change scale
        Imgproc.pyrUp(src, dest, new Size(src.cols() * scaleTwo, src.rows() * scaleTwo), Core.BORDER_DEFAULT);
        Imgcodecs.imwrite(imgWritePath + "pyrUpX" + scaleTwo + ".jpg", dest);
        System.out.println("Done enlarging image with pyrUp");
    }

    // Exc 6 - Compare OpenCV methods of shrinking images
    public void shrinkImage(float scaleOne, float scaleTwo) {
        // Create the destination matrix
        Mat dest = new Mat();

        // Set first scale
        Size scale = new Size(src.cols() * scaleOne, src.rows() * scaleOne);

        // Shrink src image
        Imgproc.resize(src, dest, scale);
        Imgcodecs.imwrite(imgWritePath + "resizeX" + scaleOne + ".jpg", dest);

        // Change scale
        scale = new Size(src.cols() * scaleTwo, src.rows() * scaleTwo);
        Imgproc.resize(src, dest, scale);
        Imgcodecs.imwrite(imgWritePath + "resizeX" + scaleTwo + ".jpg", dest);
        System.out.println("Done shrinking image with resize");

        // Shrink image using pyrDown
        Imgproc.pyrDown(src, dest, new Size(src.cols() * scaleOne, src.rows() * scaleOne), Core.BORDER_DEFAULT);
        Imgcodecs.imwrite(imgWritePath + "pyrDownX" + scaleOne + ".jpg", dest);

        // Shrink image with second scale
        Imgproc.pyrDown(src, dest, new Size(src.cols() * scaleTwo, src.rows() * scaleTwo), Core.BORDER_DEFAULT);
        Imgcodecs.imwrite(imgWritePath + "pyrDownX" + scaleTwo + ".jpg", dest);
        System.out.println("Done shrinking image with pyrDown");
    }

}
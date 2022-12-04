import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Lab2 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";

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
    public void cropImage(int pointX, int pointY, int width, int height) throws IOException {
        // Create the crop area
        Rect cropArea = new Rect(pointX, pointY, width, height);

        // Crop the image
        Mat dest = new Mat(src, cropArea);

        // Display result
        BufferedImage bufferedImage = createImage(dest);
        makeJFrame(bufferedImage);
    }
}
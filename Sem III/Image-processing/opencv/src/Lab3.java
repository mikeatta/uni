import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class Lab3 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
    String imgWritePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/";

    // Load image from path, add reading color.
    Mat src = Imgcodecs.imread(imgPath, Imgcodecs.IMREAD_COLOR);

    // Create destination matrix
    Mat dest = new Mat(src.cols(), src.rows(), src.type());

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

    // Exc 1 - Change image contrast
    public void changeImageContrast(int setAlpha) throws IOException {
        // Alter image alpha to change the contrast
        src.convertTo(dest, -1, 2, 0);

        // Display processed image
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

    // Exc 2 - Change image brightness
    public void changeImageBrightness(int setBeta) throws IOException {
        // Alter image beta to change the brightness
        src.convertTo(dest, -1, 1, setBeta);

        // Display processed image
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

    // Exc 3 - Overlay images
    public void overlayImages() throws IOException {
        // Create image paths
        String baseImage = imgPath;
        String stackImage = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/overlay.jpg";

        // Create image matrices
        Mat base = Imgcodecs.imread(baseImage);
        Mat stack = Imgcodecs.imread(stackImage);

        // Overlay the images
        Core.addWeighted(base, 0.8, stack, 0.8, 0.0, dest);

        // Display results
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

    // Exc 4 - Read min / max pixel values & normalize the image
    public void normalizeImage() {
        // Create image path
        String normalizationImgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/normalizacja.png";
        String normalizationImgWritePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/normalizacja-out.png";

        // Create image matrices
        Mat mat = Imgcodecs.imread(normalizationImgPath, Imgcodecs.IMREAD_GRAYSCALE);

        // Create minMaxResult object
        Core.MinMaxLocResult mmr = Core.minMaxLoc(mat);

        // Get initial min & max values
        System.out.println("Min val : " + mmr.minVal + " @ point : " + mmr.minLoc);
        System.out.println("Max val : " + mmr.maxVal + " @ point : " + mmr.maxLoc + "\n");

        // Perform image normalization
        Core.normalize(mat, mat, 0, 255, Core.NORM_MINMAX);

        // Get post-normalization mix & max values
        mmr = Core.minMaxLoc(mat);

        System.out.println("New min : " + mmr.minVal + " @ point : " +mmr.minLoc);
        System.out.println("New min : " + mmr.maxVal + " @ point : " +mmr.maxLoc + "\n");

        // Write the image
        Imgcodecs.imwrite(normalizationImgWritePath, mat);
        System.out.println("Image successfully written\n");
    }

    // Exc 5 - Extract color channels from the image & save results on drive
    public void splitColorChannels() {
        // Define image path
        String channelImagePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/shapes.png";

        // Create image matrices
        Mat channelImgMat = Imgcodecs.imread(channelImagePath);
        Mat dest = new Mat(channelImgMat.cols(), channelImgMat.rows(), channelImgMat.type());

        // Extract blue channel
        Core.extractChannel(channelImgMat, dest, 0);
        Imgcodecs.imwrite(imgWritePath + "channel-blue.jpg", dest);

        // Extract green channel
        Core.extractChannel(channelImgMat, dest, 1);
        Imgcodecs.imwrite(imgWritePath + "channel-green.jpg", dest);

        // Extract blue channel
        Core.extractChannel(channelImgMat, dest, 2);
        Imgcodecs.imwrite(imgWritePath + "channel-red.jpg", dest);
    }

    // Exc 6 - Read image with HSV color space
    public void readImageAsHSV() throws IOException {
        // Create dest HSV color space matrix
        dest = new Mat();

        // Change color space to HSV
        Imgproc.cvtColor(src, dest, Imgproc.COLOR_RGB2HSV);

        // Display the image
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

    // Exc 7 - Apply different methods of thresholding to the image
    public void applyThresholding() throws IOException {
        // Create dest image matrices
        Mat method1 = new Mat();
        Mat method2 = new Mat();
        Mat method3 = new Mat();

        // Read image in grayscale
        Mat srcGrayscale = Imgcodecs.imread(imgPath, Imgcodecs.IMREAD_GRAYSCALE);

        // Apply thresholding
        Imgproc.threshold(srcGrayscale, method1, 1, 255, Imgproc.THRESH_BINARY + Imgproc.THRESH_OTSU);
        Imgproc.adaptiveThreshold(srcGrayscale, method2, 255, Imgproc.ADAPTIVE_THRESH_GAUSSIAN_C, Imgproc.THRESH_BINARY, 7, 5);
        Imgproc.adaptiveThreshold(srcGrayscale, method3, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 15, 20);

        // Save results on drive
        ArrayList<Mat> methods = new ArrayList<>();

        methods.add(method1);
        methods.add(method2);
        methods.add(method3);

        methods.forEach((method) -> {
            Imgcodecs.imwrite(imgWritePath + method + ".jpg", method);
        });
    }
}
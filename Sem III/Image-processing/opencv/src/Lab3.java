import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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
    public void changeImageContrast(float setAlpha) throws IOException {
        // Alter image alpha to change the contrast
        src.convertTo(dest, -1, setAlpha, 0);

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
    public void applyThresholding() {
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

    // Exc 8 - Perform operations on matrices
    public void matrixOperations() {
        // Create 2nd matrix image
        String newSrcPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/overlay.jpg";
        Mat newSrc = Imgcodecs.imread(newSrcPath);

        // Create matrices for storing results
        Mat addition = new Mat();
        Mat subtraction = new Mat();
        Mat subtraction2 = new Mat();
        Mat multiplication = new Mat();
        Mat division = new Mat();
        Mat division2 = new Mat();

        // Perform matrix operations
        // Addition: A + B
        Core.add(src, newSrc, addition);

        // Subtraction: A - B and B - A
        Core.subtract(src, newSrc, subtraction);
        Core.subtract(newSrc, src, subtraction2);

        // Multiplication: A * B
        Core.multiply(src, newSrc, multiplication);

        // Division: A / B and B / A
        Core.divide(src, newSrc, division);
        Core.divide(newSrc, src, division2);

        // Save results on drive
        ArrayList<Mat> results = new ArrayList<>();

        results.add(addition);
        results.add(subtraction);
        results.add(subtraction2);
        results.add(multiplication);
        results.add(division);
        results.add(division2);

        results.forEach((matrix) -> Imgcodecs.imwrite(imgWritePath + matrix + ".jpg", matrix));
    }

    // Exc 9 - Create an image histogram
    public void createHistogram() throws IOException {
        // Create array list of background planes
        List<Mat> bgrPlanes = new ArrayList<>();
        Core.split(src, bgrPlanes);

        // Configure the histogram
        int histSize = 256;

        float[] range = {0, 256};
        MatOfFloat histRange = new MatOfFloat(range);

        boolean accumulate = false;

        // Calculate histograms
        Mat bHist = new Mat(), gHist = new Mat(), rHist = new Mat();
        Imgproc.calcHist(bgrPlanes, new MatOfInt(0), new Mat(), bHist, new MatOfInt(histSize), histRange, accumulate);
        Imgproc.calcHist(bgrPlanes, new MatOfInt(1), new Mat(), gHist, new MatOfInt(histSize), histRange, accumulate);
        Imgproc.calcHist(bgrPlanes, new MatOfInt(2), new Mat(), rHist, new MatOfInt(histSize), histRange, accumulate);

        // Create an image for the histogram
        int histWidth = 512, histHeight = 400;
        int binWidth = (int) Math.round((double) histWidth / histSize);

        Mat histImage = new Mat(histHeight, histWidth, CvType.CV_8UC3, new Scalar(0, 0, 0));

        // Normalize the histogram
        Core.normalize(bHist, bHist, 0, histImage.rows(), Core.NORM_MINMAX);
        Core.normalize(gHist, gHist, 0, histImage.rows(), Core.NORM_MINMAX);
        Core.normalize(rHist, rHist, 0, histImage.rows(), Core.NORM_MINMAX);

        float[] bHistData = new float[(int) bHist.total() * bHist.channels()];
        bHist.get(0, 0, bHistData);
        float[] gHistData = new float[(int) gHist.total() * gHist.channels()];
        gHist.get(0, 0, gHistData);
        float[] rHistData = new float[(int) rHist.total() * rHist.channels()];
        rHist.get(0, 0, rHistData);

        for (int i=1; i<histSize; i++) {
            Imgproc.line(histImage, new Point(binWidth * (i - 1), histHeight - Math.round(bHistData[i - 1])),
                    new Point(binWidth * (i), histHeight - Math.round(bHistData[i])), new Scalar(255, 0, 0), 1);
            Imgproc.line(histImage, new Point(binWidth * (i - 1), histHeight - Math.round(gHistData[i - 1])),
                    new Point(binWidth * (i), histHeight - Math.round(gHistData[i])), new Scalar(0, 255, 0), 1);
            Imgproc.line(histImage, new Point(binWidth * (i -1), histHeight - Math.round(rHistData[i - 1])),
                    new Point(binWidth * (i), histHeight - Math.round(rHistData[i])), new Scalar(0, 0, 255), 1);
        }

        // Display results
        BufferedImage buf = createImage(histImage);
        makeJFrame(buf);
    }

}
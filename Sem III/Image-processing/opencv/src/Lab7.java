import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Lab7 {

    // Image paths
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/";

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

    // Exc 1 - Load image and replace the greenscreen background
    public void changeBackground() throws IOException {
        // Define image paths
        String background = imgPath + "overlay.jpg";
        String greenscreen = imgPath + "greenscreen-scaled.jpeg";

        // Create image matrices
        Mat bgMat = Imgcodecs.imread(background, Imgcodecs.IMREAD_COLOR);
        Mat gsMat = Imgcodecs.imread(greenscreen, Imgcodecs.IMREAD_COLOR);
        Mat mask = new Mat();
        Mat dest = new Mat();

        // Resize images
        Imgproc.resize(bgMat, bgMat, new Size(300, 400));
        Imgproc.resize(gsMat, gsMat, new Size(300, 400));

        // Convert greenscreen image to HSV
        Imgproc.cvtColor(gsMat, gsMat, Imgproc.COLOR_RGB2HSV);

        // Create the mask
        Scalar lower = new Scalar(40, 40, 100);
        Scalar higher = new Scalar(80, 255, 255);

        Core.inRange(gsMat, lower, higher, mask);

        // Perform bitwise_and & addition operations
        Core.bitwise_and(gsMat, bgMat, dest, mask);
        Core.add(gsMat, bgMat, dest, mask);

        // Display results
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

}

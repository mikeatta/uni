import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.Buffer;

public class Lab3 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";

    // Load image from path
    Mat src = Imgcodecs.imread(imgPath);

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
    public void changeImageContrast() throws IOException {
        // Read color from image at imgPath
        src = Imgcodecs.imread(imgPath, Imgcodecs.IMREAD_COLOR);

        // Alter image alpha to change the contrast
        src.convertTo(dest, -1, 2, 0);

        // Display processed image
        BufferedImage buf = createImage(dest);
        makeJFrame(buf);
    }

}
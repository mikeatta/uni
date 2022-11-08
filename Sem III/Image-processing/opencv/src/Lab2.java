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

public class Lab2 {

    // Image path
    String imgPath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/img/IMG_2116.jpg";
    String imgWritePath = "/home/zorin/Documents/git/uni/Sem III/Image-processing/processed-imgs/output.jpg";

    // Loading the image into memory
    private static BufferedImage loadImgIntoMemory(String imgPath) throws IOException {
        Mat image = Imgcodecs.imread(imgPath);
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        return ImageIO.read(in);
    }

    // Exc 1 - Translate the image based on user input
    public void translateImage(int translateX, int translateY, String direction) throws IOException {
        // Loading the image from path
        BufferedImage bufferedImage = loadImgIntoMemory(imgPath);


        // Initiate JFrame
        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        // End program on window close
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

}

import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.Size;
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

    private BufferedImage createImage(Mat image) throws IOException {
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", image, matOfByte);
        byte[] byteArray = matOfByte.toArray();
        InputStream in = new ByteArrayInputStream(byteArray);
        return ImageIO.read(in);
    }

    // Exc 1 - Translate the image based on user input
    public void shiftImage(int shiftX, int shiftY, String direction) throws IOException {
        // Loading the image from path
        Mat src = Imgcodecs.imread(imgPath);

        // Create destination matrix to store warp output
        Mat dest = new Mat();

        // Create warp matrix
        Mat warpMat = new Mat(2, 3, CvType.CV_64FC1);
        int row = 0, col = 0;
        warpMat.put(row, col, 1, 0, 100, 0, 1, 100);

        // Warp the image
        Imgproc.warpAffine(src, dest, warpMat, new Size());

        // Convert the matrix to an image
        BufferedImage bufferedImage = createImage(dest);

        // Initiate JFrame
        JFrame jFrame = new JFrame();
        jFrame.getContentPane().add(new JLabel(new ImageIcon(bufferedImage)));
        jFrame.pack();
        jFrame.setVisible(true);

        // End program on window close
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

}
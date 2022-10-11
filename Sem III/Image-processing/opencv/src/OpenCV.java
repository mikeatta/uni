import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;

public class OpenCV {
    public static void main(String[] args){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        Mat img = new Mat(3, 3, CvType.CV_8U);
        int row = 0, col = 0;
        img.put(row, col, 1, 2, 3, 4, 5, 6, 7, 8);
        System.out.println(img.dump());
    }
}

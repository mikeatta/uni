package com.example.imageviewer;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.util.ArrayList;

public class HelloController {
    @FXML
    private Label imageCounter;
    @FXML
    private Button nextImgButton;
    @FXML
    private ImageView imageView;

    // Program variables
    String imgDirectoryPath = "/home/zorin/Documents/git/uni/Sem III/Object-oriented-programming/image-viewer/img/";
    ArrayList<String> images = new ArrayList<>();
    int imageCount = 0;

    @FXML
    protected void loadImage() {
        // Load images into array list
        if (imageCount == 0) {
            images.add(imgDirectoryPath + "img-1.jpg");
            images.add(imgDirectoryPath + "img-2.jpg");
            images.add(imgDirectoryPath + "img-3.jpg");
            images.add(imgDirectoryPath + "img-4.jpg");
        }

        // Increment image counter
        imageCount++;

        // Load the image
        Image image = new Image("file:" + images.get(imageCount - 1));

        // Display the image via Image View
        imageView.setImage(image);
        imageView.setFitWidth(300);
        imageView.setFitHeight(400);
        imageView.setPreserveRatio(true);
        imageView.setSmooth(true);
        imageView.setCache(true);

        // Change label text
        imageCounter.setText("Image " + imageCount + " of 4");

        // Change button text
        nextImgButton.setText("Next image");

        // Reset image counter
        if (imageCount >= 4) imageCount = 0;
    }
}
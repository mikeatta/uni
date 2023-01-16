package com.example.imageviewer;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

public class HelloController {
    @FXML
    private Label imageCounter;
    @FXML
    private Button nextImgButton;
    @FXML
    private ImageView imageView;

    int imageCount = 0;

    @FXML
    protected void loadImage() {
        // Increment image counter
        imageCount++;

        // Load the image
        Image image = new Image("");

        // Display the image via Image View
        imageView.setImage(image);
        imageView.setFitWidth(100);
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
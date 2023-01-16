package com.example.imageviewer;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

public class HelloController {
    @FXML
    private Label imageCounter;
    @FXML
    private Button nextImgButton;

    int imageCount = 0;

    @FXML
    protected void loadImage() {
        // Increment image counter
        imageCount++;

        // Change label text
        imageCounter.setText("Image " + imageCount + " of 4");

        // Change button text
        nextImgButton.setText("Next image");

        // Reset image counter
        if (imageCount >= 4) imageCount = 0;
    }
}
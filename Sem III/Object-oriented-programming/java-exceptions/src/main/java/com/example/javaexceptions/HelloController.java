package com.example.javaexceptions;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class HelloController {
    @FXML
    private Label errorMessage;

    @FXML
    protected void errorMessagePopup() {
        errorMessage.setText("Error: Something went wrong.");
    }
}
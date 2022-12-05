package com.example.rwtofile;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;

public class HelloController {
    @FXML
    private Label welcomeText;
    @FXML
    public TextArea textArea;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    @FXML
    private void getTextAreaValue() {
        String text = textArea.getText();
        System.out.println(text);
    }
}
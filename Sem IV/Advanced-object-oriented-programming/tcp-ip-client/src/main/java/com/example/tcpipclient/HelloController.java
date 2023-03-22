package com.example.tcpipclient;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class HelloController {
    @FXML
    private Label answerLabel;
    @FXML
    private TextField answerTextField;
    @FXML
    private Label nickLabel;
    @FXML
    private TextField nickTextField;

    @FXML
    protected void onHelloButtonClick() {
        System.out.println("Your answer: " + answerTextField.getText());
    }
}
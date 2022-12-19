package com.example.patientlist;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;

import java.util.ResourceBundle;
import java.net.URL;

public class HelloController implements Initializable {
    public Label formName;
    public Button printDataButton;
    @FXML
    private ChoiceBox<String> myChoiceBox;
    
    private String[] values = {"Patient1", "Patient2", "Patient3"};

    @Override
    public void initialize(URL arg0, ResourceBundle arg1) {
        myChoiceBox.getItems().addAll(values);
    }

    @FXML
    protected void onPrintDataButton() {
        System.out.println((myChoiceBox.getValue()));
    }
}
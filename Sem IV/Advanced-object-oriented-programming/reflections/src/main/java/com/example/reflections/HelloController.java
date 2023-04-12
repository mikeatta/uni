package com.example.reflections;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

import java.lang.reflect.Field;

public class HelloController {
    @FXML
    private Label welcomeText;
    @FXML
    private TextField classNameField;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    @FXML
    protected String getClassName() {

        String className = null;

        if (classNameField != null) {
            className = classNameField.getText();
        }

        return className;
    }

    @FXML
    private void createClassObject() {

        String className = getClassName();

        Song song = new Song(".", "", ".", ".", ".", ".");
        Field[] fields = song.getClass().getDeclaredFields();

        for (Field field : fields) {
            System.out.println(field.getName());
        }
    }

    @FXML
    private void saveChanges() {}

}
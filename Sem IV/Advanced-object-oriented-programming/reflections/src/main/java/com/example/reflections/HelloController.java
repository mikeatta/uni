package com.example.reflections;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

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
    private void createClassObject() throws ClassNotFoundException, NoSuchMethodException,
            InvocationTargetException, InstantiationException, IllegalAccessException {

        String className = getClassName();

        Class<?> reflectionClass = Class.forName(className);
        Constructor<?> constructor = reflectionClass.getDeclaredConstructor(String.class,
                String.class, String.class, String.class, String.class, String.class);

        Object reflectionObject = constructor.newInstance("Title", "Tempo", "Rhythm", "Album", "Performer", "Lyrics");

        Field[] fields = reflectionObject.getClass().getDeclaredFields();

        for (Field field : fields) {
            System.out.println(field.getName());
        }
    }

    @FXML
    private void saveChanges() {}

}
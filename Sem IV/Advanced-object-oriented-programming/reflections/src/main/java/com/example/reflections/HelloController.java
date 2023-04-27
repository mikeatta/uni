package com.example.reflections;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.SplitPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class HelloController {
    @FXML
    private Label welcomeText;
    @FXML
    private TextField classNameField;
    @FXML
    private VBox objectPropertyMenu;

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

        Object reflectionObject = constructor.newInstance("Test Title", "Test Tempo",
                "Test Rhythm", "Test Album", "Test Performer", "Test Lyrics");

        createObjectPropertiesMenu(reflectionObject);
    }

    @FXML
    private void saveChanges() {}

    // TODO: Add and format TextArea and a Label
    @FXML
    private void createObjectPropertiesMenu(Object reflectObject) {

        Field[] fields = reflectObject.getClass().getDeclaredFields();
        Method[] methods = reflectObject.getClass().getDeclaredMethods();

        for (Field field : fields) {

            TextField value = new TextField();
            TextArea valueLong = new TextArea();
            Label description = new Label();

            value.setMaxWidth(300);
            valueLong.setMaxWidth(300);
            description.setMaxWidth(100);

            for (Method method : methods) {
                if (formatMethodName(method.getName()).equals(field.getName())) {
                    value.setText(method.getName());
                    valueLong.setText(method.getName());
                    description.setText("<-- " + field.getName());
                }
            }

            if (!field.getName().equals("lyrics")) {
                objectPropertyMenu.getChildren().add(new SplitPane(value, description));
            } else {
                objectPropertyMenu.getChildren().add(new SplitPane(valueLong, description));
            }
        }
    }

    private String formatMethodName(String methodName) {
        return methodName.substring(3).toLowerCase();
    }
}
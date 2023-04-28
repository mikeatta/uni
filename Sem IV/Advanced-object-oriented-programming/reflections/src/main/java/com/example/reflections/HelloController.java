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

    private Object reflectionObject = null;

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

        reflectionObject = constructor.newInstance("Default Title", "Default Tempo",
                "Default Rhythm", "Default Album", "Default Performer", "Default Lyrics");

        createObjectPropertiesMenu();
    }

    @FXML
    private void saveChanges() throws ClassNotFoundException,
            InvocationTargetException, IllegalAccessException {

        String className = getClassName();

        Class<?> reflectionClass = Class.forName(className);
        Field[] fields = reflectionClass.getDeclaredFields();
        Method[] methods = reflectionClass.getDeclaredMethods();

        for (Field field : fields) {
            for (Method method : methods) {

                // Set new property value
                if (formatMethodName("set", field.getName()).equals(method.getName())) {
                    method.invoke(reflectionObject, "New value");
                }

                // Get new property
                if (formatMethodName("get", field.getName()).equals(method.getName())) {
                    System.out.println(method.getName() + " --> "
                            + method.invoke(reflectionObject));
                }
            }
        }
    }

    @FXML
    private void createObjectPropertiesMenu()
            throws InvocationTargetException, IllegalAccessException {

        Field[] fields = reflectionObject.getClass().getDeclaredFields();
        Method[] methods = reflectionObject.getClass().getDeclaredMethods();

        for (Field field : fields) {

            TextField value = new TextField();
            TextArea valueLong = new TextArea();
            Label description = new Label();

            value.setMaxWidth(300);
            valueLong.setMaxWidth(300);
            description.setMaxWidth(100);

            for (Method method : methods) {
                if (formatMethodName("get", field.getName()).equals(method.getName())) {
                    value.setText((String)method.invoke(reflectionObject));
                    valueLong.setText((String)method.invoke(reflectionObject));
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

    private String formatMethodName(String prefix, String fieldName) {

        // Capitalize first character of the field name
        String formattedMethodName = fieldName.substring(0, 1).toUpperCase()
                + fieldName.substring(1);

        formattedMethodName = prefix + formattedMethodName;
        return formattedMethodName;
    }
}
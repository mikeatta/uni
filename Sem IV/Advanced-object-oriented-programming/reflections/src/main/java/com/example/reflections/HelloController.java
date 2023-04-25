package com.example.reflections;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.SplitPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

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

        Object reflectionObject = constructor.newInstance("Title", "Tempo", "Rhythm", "Album", "Performer", "Lyrics");

        Field[] fields = reflectionObject.getClass().getDeclaredFields();

        for (Field field : fields) {
            System.out.println(field.getName());
        }

        createObjectPropertiesMenu();
    }

    @FXML
    private void saveChanges() {}

    // TODO: Add and format TextArea and a Label
    @FXML
    private void createObjectPropertiesMenu() {

        TextField value = new TextField();
        Label description = new Label();

        value.setMaxWidth(300);

        objectPropertyMenu.getChildren().add(new SplitPane(value, description));
    }

    private void displayObjectProperties() {}
}
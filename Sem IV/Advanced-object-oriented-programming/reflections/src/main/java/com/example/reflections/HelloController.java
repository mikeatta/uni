package com.example.reflections;

import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class HelloController {
    @FXML
    private TextField classNameField;
    @FXML
    private VBox objectPropertyMenu;
    @FXML
    private TextArea objectPropertyInfo;

    private Object reflectionObject = null;

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
                Integer.class, String.class, String.class, String.class, String.class);

        reflectionObject = constructor.newInstance("Default Title", 80,
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

        objectPropertyInfo.clear();

        for (Field field : fields) {
            for (Method method : methods) {

                // Set new property value
                if (formatMethodName("set", field.getName()).equals(method.getName())) {

                    TextInputControl child;

                    if (!field.getName().equals("lyrics")) {
                        child = (TextField) objectPropertyMenu.lookup("#" + field.getName());
                    } else {
                        child = (TextArea) objectPropertyMenu.lookup("#" + field.getName());
                    }

                    // Try setting new property type
                    String fieldType = field.getType().getSimpleName();

                    try {
                        Object childContent = convertFieldType(fieldType, child.getText());
                        method.invoke(reflectionObject, childContent);
                    } catch (IllegalArgumentException e) {
                        objectPropertyInfo.setText("New value of "
                                + field.getName() + " couldn't be set\n");
                    }
                }
            }
        }

        displayObjectProperties(fields, methods);
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

            value.setId(field.getName());
            valueLong.setId(field.getName());

            for (Method method : methods) {
                if (formatMethodName("get", field.getName()).equals(method.getName())) {
                    value.setText(String.valueOf(method.invoke(reflectionObject)));
                    valueLong.setText(String.valueOf(method.invoke(reflectionObject)));
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

    private Object convertFieldType(String simpleTypeName, String convertedElement) {

        return switch (simpleTypeName) {
            case "Boolean", "boolean" -> Boolean.valueOf(convertedElement);
            case "Byte", "byte" -> Byte.valueOf(convertedElement);
            case "Short", "short" -> Short.valueOf(convertedElement);
            case "Integer", "int" -> Integer.valueOf(convertedElement);
            case "Long", "long" -> Long.valueOf(convertedElement);
            case "Float", "float" -> Float.valueOf(convertedElement);
            case "Double", "double" -> Double.valueOf(convertedElement);
            case "String", "string" -> String.valueOf(convertedElement);
            case "Character", "char" -> convertedElement.charAt(0);
            default -> convertedElement;
        };
    }

    private void displayObjectProperties(Field[] objectFields, Method[] objectMethods)
            throws InvocationTargetException, IllegalAccessException {

        StringBuilder objectProperties = new StringBuilder();
        objectProperties.append(reflectionObject.getClass()
                .getSimpleName()).append("\n");

        for (Field field : objectFields) {
            for (Method method : objectMethods) {
                if (formatMethodName("get", field.getName())
                        .equals(method.getName())) {
                    objectProperties.append(field.getName()).append(" = ")
                            .append(method.invoke(reflectionObject)).append("\n");
                }
            }
        }

        objectPropertyInfo.appendText(objectProperties.toString());
    }
}
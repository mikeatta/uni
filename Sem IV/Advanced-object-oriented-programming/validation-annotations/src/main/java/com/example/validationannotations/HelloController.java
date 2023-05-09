package com.example.validationannotations;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.TextInputControl;

public class HelloController {

    @FXML
    private Label welcomeText;
    @FXML
    @MyPattern(regex = "correct value")
    private TextField validatedText;

    MyPatternValidator myPatternValidator = new MyPatternValidator();
    VinputText vinputText = new VinputText();

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    @FXML
    protected void validateField() {

        vinputText.registerValidator(myPatternValidator);

        TextInputControl inputControl = validatedText;
        myPatternValidator.validate(inputControl.getText());

        if (myPatternValidator.isValid()) {
            System.out.println("OK");
        } else {
            System.out.println(myPatternValidator.getMessage());
        }
    }
}
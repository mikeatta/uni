package com.example.validationannotations;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

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
        vinputText.setInputControl(validatedText);
        vinputText.validateFieldContent();
    }
}
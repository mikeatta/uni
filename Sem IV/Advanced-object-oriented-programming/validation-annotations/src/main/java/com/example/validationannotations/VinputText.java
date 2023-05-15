package com.example.validationannotations;

import javafx.scene.control.TextInputControl;
import javafx.scene.layout.HBox;

public class VinputText extends HBox {

    private TextInputControl inputControl;
    private Validator patternValidator;

    public void registerValidator(Validator validator) {
        this.patternValidator = validator;
    }

    public void setInputControl(TextInputControl field) {
        inputControl = field;
    }

    public void validateFieldContent() {

        patternValidator.validate(inputControl.getText());

        if (patternValidator.isValid()) {
            System.out.println("OK");
        } else {
            System.out.println(patternValidator.getMessage());
        }
    }
}

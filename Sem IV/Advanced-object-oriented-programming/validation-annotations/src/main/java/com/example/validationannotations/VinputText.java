package com.example.validationannotations;

import javafx.scene.control.TextInputControl;
import javafx.scene.layout.HBox;

public class VinputText extends HBox {

    private TextInputControl inputControl;
    private Validator patternValidator;
    private final HelloController helloController;

    public VinputText(HelloController helloController) {
        this.helloController = helloController;
    }

    public void registerValidator(Validator validator) {
        this.patternValidator = validator;
    }

    public void setInputControl(TextInputControl field) {
        inputControl = field;
    }

    public void validateFieldContent() {

        patternValidator.validate(inputControl.getText());

        if (patternValidator.isValid()) {
            confirmValidation();
        } else {
            rejectValidation();
        }
    }

    private void confirmValidation() {
        helloController.getConfirmButton().setDisable(false);
        System.out.println("Field content valid");
    }

    private void rejectValidation() {
        helloController.getConfirmButton().setDisable(true);
        System.out.println("Field content invalid");
    }
}

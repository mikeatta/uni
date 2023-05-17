package com.example.validationannotations;

import javafx.scene.control.TextInputControl;
import javafx.scene.control.Tooltip;
import javafx.scene.image.Image;
import javafx.scene.layout.HBox;
import javafx.util.Duration;

import java.util.Objects;

public class VinputText extends HBox {

    private TextInputControl inputControl;
    private Validator patternValidator;
    private final HelloController helloController;
    private final Tooltip tooltip = new Tooltip();

    Image checkmark = new Image(Objects.requireNonNull(getClass()
            .getResourceAsStream("/icons/checkmark.png")));
    Image cross = new Image(Objects.requireNonNull(getClass()
            .getResourceAsStream("/icons/cross.png")));

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
        Tooltip.uninstall(helloController.getImageView(), tooltip);
        helloController.getImageView().setImage(checkmark);
        helloController.getConfirmButton().setDisable(false);
    }

    private void rejectValidation() {
        Tooltip.install(helloController.getImageView(), tooltip);
        tooltip.setShowDelay(new Duration(0.3));
        tooltip.setText(patternValidator.getMessage());
        helloController.getImageView().setImage(cross);
        helloController.getConfirmButton().setDisable(true);
    }
}

package com.example.validationannotations;

import javafx.scene.control.TextInputControl;
import javafx.scene.layout.HBox;

import java.util.ArrayList;
import java.util.List;

public class VinputText extends HBox {

    private TextInputControl inputControl;
    private List<Validator> validators = new ArrayList<>();

    public void registerValidator(Validator validator) {
        validators.add(validator);
    }
}

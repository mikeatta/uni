package com.example.validationannotations;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;

import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {

    @FXML
    private Label welcomeText;
    @FXML
    private ImageView imageView;
    @FXML
    @MyPattern(regex = "correct value", message = "The value is incorrect!")
    private TextField validatedText;
    @FXML
    private Button confirmButton;

    MyPatternValidator myPatternValidator = new MyPatternValidator();
    VinputText vinputText = new VinputText(this);

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

    public ImageView getImageView() {
        return this.imageView;
    }

    public Button getConfirmButton() {
        return this.confirmButton;
    }

    private void startListener() {
        validatedText.textProperty().addListener(
                (observable, oldValue, newValue) -> validateField());
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        startListener();
    }
}
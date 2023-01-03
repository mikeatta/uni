package com.example.javaexceptions;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;

public class HelloController {
    @FXML
    private TextField cardNumberField;
    @FXML
    private TextField expiryDateField;
    @FXML
    private TextField cvvCodeField;

    // Declare the alert
    Alert a = new Alert(Alert.AlertType.NONE);

    private void displayAlertWindow(ExceptionHandler ex) {
        // Create alert messages
        String exceptionClassName = "Exception: " + ex.getClass().getSimpleName();
        String exceptionErrorMessage = ex.storeMessage;

        // Display alert pop-up
        a.setAlertType(Alert.AlertType.ERROR);
        a.setContentText(exceptionClassName + " : " + exceptionErrorMessage);
        a.show();
    }

    @FXML
    protected void submitCardInformation() {
        try {
            String cc = checkCardNumber();
            String expDt = checkExpiryDate();
            String cvv = checkCvv();

            System.out.println("Card number : " + cc);
            System.out.println("Exp. date : " + expDt);
            System.out.println("CVV code : " + cvv);
        }
        catch (CardNumberEmpty | ExpiryDateEmpty | CvvEmpty ex) {
            displayAlertWindow(ex);
        }
        catch (IncorrectCardLength | IncorrectDateLength | IncorrectCvvLength ex) {
            displayAlertWindow(ex);
        }
    }

    private String checkCardNumber() throws CardNumberEmpty, IncorrectCardLength {
        String cardNumber = cardNumberField.getText();
        if(cardNumber.isEmpty()) {
            throw new CardNumberEmpty("Card number field cannot be empty!");
        }
        if(cardNumber.length() != 12) {
            throw new IncorrectCardLength("Card number field has to be 12 characters long!");
        }
        return cardNumber;
    }

    private String checkExpiryDate() throws ExpiryDateEmpty, IncorrectDateLength {
        String expiryDate = expiryDateField.getText();
        if(expiryDate.isEmpty()) {
            throw new ExpiryDateEmpty("Expiry date field cannot be empty!");
        }
        if(expiryDate.length() != 5) {
            throw new IncorrectDateLength("Expiry date field has to 5 characters long!");
        }
        return expiryDate;
    }

    private String checkCvv() throws CvvEmpty, IncorrectCvvLength {
        String cvvCode = cvvCodeField.getText();
        if(cvvCode.isEmpty()) {
            throw new CvvEmpty("Cvv code field cannot be empty!");
        }
        if(cvvCode.length() != 3) {
            throw new IncorrectCvvLength("Cvv code field has to be 3 characters long!");
        }
        return cvvCode;
    }
}
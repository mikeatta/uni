package com.example.javaexceptions;

import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;

public class HelloController {
    @FXML
    private TextField cardNumberField;
    @FXML
    private TextField expiryDateField;
    @FXML
    private TextField cvvCodeField;

    @FXML
    protected void submitCardInformation() {
        try {
            String cc = checkCardNumber();
            String expDt = checkExpiryDate();
            String cvv = checkCvv();

            System.out.println("Card number : " + cc);
            System.out.println("Exp. date : " + expDt);
            System.out.println("CVV code : " + cvv);
        } catch (CardNumberEmpty | ExpiryDateEmpty | CvvEmpty ex) {
            System.out.println(ex.getMessage().toString());
        }
    }

    protected String checkCardNumber() throws CardNumberEmpty {
        String cardNumber = cardNumberField.getText();
        if(cardNumber.isEmpty()) {
            throw new CardNumberEmpty("Card number field cannot be empty!");
        }
        return cardNumber;
    }

    protected String checkExpiryDate() throws ExpiryDateEmpty {
        String expiryDate = expiryDateField.getText();
        if(expiryDate.isEmpty()) {
            throw new ExpiryDateEmpty("Expiry date field cannot be empty!");
        }
        return expiryDate;
    }

    protected String checkCvv() throws CvvEmpty {
        String cvvCode = cvvCodeField.getText();
        if(cvvCode.isEmpty()) {
            throw new CvvEmpty("Cvv code field cannot be empty!");
        }
        return cvvCode;
    }
}
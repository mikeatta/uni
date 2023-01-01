package com.example.javaexceptions;

import javafx.fxml.FXML;
import javafx.scene.control.TextField;

public class HelloController {
    @FXML
    private TextField cardNumberField;

    @FXML
    protected void getCardNumber() {
        try {
            String cc = checkCardNumber();
            System.out.println("Card number:" + cc);
        } catch (CardNumberEmpty ex) {
            System.out.println(ex.getMessage().toString());
        }
    }

    @FXML
    protected String checkCardNumber() throws CardNumberEmpty {
        String cardNumber = cardNumberField.getText();
        if(cardNumber.isEmpty()) {
            throw new CardNumberEmpty("Card number field cannot be empty!");
        }
        return cardNumber;
    }
}
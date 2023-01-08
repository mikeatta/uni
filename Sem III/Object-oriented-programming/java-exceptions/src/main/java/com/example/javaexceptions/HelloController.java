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
        catch (InvalidCardFieldFormat | InvalidDateFieldFormat | InvalidCvvFieldFormat ex) {
            displayAlertWindow(ex);
        }
        catch (InvalidDateFieldMonth | InvalidDateFieldYear ex) {
            displayAlertWindow(ex);
        }
    }

    private String checkCardNumber() throws CardNumberEmpty, InvalidCardFieldFormat, IncorrectCardLength {
        String cardNumber = cardNumberField.getText();
        if(cardNumber.isEmpty()) {
            throw new CardNumberEmpty("Card number field cannot be empty!");
        }
        if(cardNumber.length() != 19) {
            throw new IncorrectCardLength("Card number field has to be 19 characters long!");
        }
        String regex = "^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$";
        if(!cardNumber.matches(regex)) {
            throw new InvalidCardFieldFormat("Card number field has to follow the 'XXXX-XXXX-XXXX-XXXX' format!");
        }
        return cardNumber;
    }

    private String checkExpiryDate() throws ExpiryDateEmpty, InvalidDateFieldFormat, IncorrectDateLength, InvalidDateFieldMonth, InvalidDateFieldYear {
        String expiryDate = expiryDateField.getText();
        if(expiryDate.isEmpty()) {
            throw new ExpiryDateEmpty("Expiry date field cannot be empty!");
        }
        if(expiryDate.length() != 7) {
            throw new IncorrectDateLength("Expiry date field has to 7 characters long!");
        }
        String regex = "^[0-9]{2}/[0-9]{4}$";
        if(!expiryDate.matches(regex)) {
            throw new InvalidDateFieldFormat("Expiry date filed has to follow the 'MM/YYYY' format!");
        }
        String firstMonthCharacter = String.valueOf(expiryDate.charAt(0));
        String secondMonthCharacter = String.valueOf(expiryDate.charAt(1));
        String validateCharOne = "^[0-1]$";
        String validateCharTwo = "^[1-9]$";
        String validateCharTwoAfterTen = "^[0-2]$";
        if(!firstMonthCharacter.matches(validateCharOne)) {
            throw new InvalidDateFieldMonth("Incorrect first character in month field!");
        }
        if(firstMonthCharacter.equals("0") && !secondMonthCharacter.matches(validateCharTwo)) {
            throw new InvalidDateFieldMonth("Incorrect second character in month field!");
        }
        if(firstMonthCharacter.equals("1") && !secondMonthCharacter.matches(validateCharTwoAfterTen)) {
            throw new InvalidDateFieldMonth("Incorrect second character in month field!");
        }
        return expiryDate;
    }

    private String checkCvv() throws CvvEmpty, InvalidCvvFieldFormat, IncorrectCvvLength {
        String cvvCode = cvvCodeField.getText();
        if(cvvCode.isEmpty()) {
            throw new CvvEmpty("Cvv code field cannot be empty!");
        }
        if(cvvCode.length() != 3) {
            throw new IncorrectCvvLength("Cvv code field has to be 3 characters long!");
        }
        String regex = "^[0-9]{3}$";
        if(!cvvCode.matches(regex)) {
            throw new InvalidCvvFieldFormat("Expiry date field has to follow the 'XXX' format!");
        }
        return cvvCode;
    }
}
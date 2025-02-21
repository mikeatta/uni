package com.example.javaexceptions;

import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class HelloController {
    @FXML
    private TextField cardNumberField;
    @FXML
    private TextField expiryDateField;
    @FXML
    private TextField cvvCodeField;

    // Declare the alert
    Alert a = new Alert(Alert.AlertType.NONE);

    private void displayAlertWindow(CardExceptions ex) {
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
        catch (CardNumberEmptyException | ExpiryDateEmptyException | CvvEmptyException ex) {
            displayAlertWindow(ex);
        }
        catch (IncorrectCardLengthException | IncorrectDateLengthException | IncorrectCvvLengthException ex) {
            displayAlertWindow(ex);
        }
        catch (InvalidCardFieldFormatException | InvalidDateFieldFormatException | InvalidCvvFieldFormatException ex) {
            displayAlertWindow(ex);
        }
        catch (InvalidDateFieldMonthException | InvalidDateFieldYearException | ExpiryDateDueException ex) {
            displayAlertWindow(ex);
        }
        catch (ParseException ex) {
            ex.printStackTrace();
        }
    }

    private String checkCardNumber() throws CardNumberEmptyException, InvalidCardFieldFormatException, IncorrectCardLengthException {
        String cardNumber = cardNumberField.getText();
        if(cardNumber.isEmpty()) {
            throw new CardNumberEmptyException("Card number field cannot be empty!");
        }
        if(cardNumber.length() != 19) {
            throw new IncorrectCardLengthException("Card number field has to be 19 characters long!");
        }
        String regex = "^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$";
        if(!cardNumber.matches(regex)) {
            throw new InvalidCardFieldFormatException("Card number field has to follow the 'XXXX-XXXX-XXXX-XXXX' format!");
        }
        return cardNumber;
    }

    private String checkExpiryDate() throws ExpiryDateEmptyException, InvalidDateFieldFormatException, IncorrectDateLengthException, InvalidDateFieldMonthException, InvalidDateFieldYearException, ExpiryDateDueException, ParseException {
        String expiryDate = expiryDateField.getText();
        if(expiryDate.isEmpty()) {
            throw new ExpiryDateEmptyException("Expiry date field cannot be empty!");
        }
        if(expiryDate.length() != 7) {
            throw new IncorrectDateLengthException("Expiry date field has to 7 characters long!");
        }
        String regex = "^[0-9]{2}/[0-9]{4}$";
        if(!expiryDate.matches(regex)) {
            throw new InvalidDateFieldFormatException("Expiry date filed has to follow the 'MM/YYYY' format!");
        }
        String firstMonthCharacter = String.valueOf(expiryDate.charAt(0));
        String secondMonthCharacter = String.valueOf(expiryDate.charAt(1));
        String validateCharOne = "^[0-1]$";
        String validateCharTwo = "^[1-9]$";
        String validateCharTwoAfterTen = "^[0-2]$";
        if(!firstMonthCharacter.matches(validateCharOne)) {
            throw new InvalidDateFieldMonthException("Incorrect first character in month field!");
        }
        if(firstMonthCharacter.equals("0") && !secondMonthCharacter.matches(validateCharTwo)) {
            throw new InvalidDateFieldMonthException("Incorrect second character in month field!");
        }
        if(firstMonthCharacter.equals("1") && !secondMonthCharacter.matches(validateCharTwoAfterTen)) {
            throw new InvalidDateFieldMonthException("Incorrect second character in month field!");
        }
        StringBuilder expiryYearStr = new StringBuilder();
        for(int i=3; i<7; i++) {
            expiryYearStr.append(expiryDate.charAt(i));
        }
        int expiryYearInt = Integer.parseInt(expiryYearStr.toString());
        if(expiryYearInt>2099 || expiryYearInt<1928) {
            throw new InvalidDateFieldYearException("Invalid input in card expiry year field!");
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/yyyy");
        simpleDateFormat.setLenient(false);
        Date expiry = simpleDateFormat.parse(expiryDate);
        boolean cardExpired = expiry.before(new Date());
        if(cardExpired) {
            throw new ExpiryDateDueException("Card expiry date is due!");
        }
        return expiryDate;
    }

    private String checkCvv() throws CvvEmptyException, InvalidCvvFieldFormatException, IncorrectCvvLengthException {
        String cvvCode = cvvCodeField.getText();
        if(cvvCode.isEmpty()) {
            throw new CvvEmptyException("Cvv code field cannot be empty!");
        }
        if(cvvCode.length() != 3) {
            throw new IncorrectCvvLengthException("Cvv code field has to be 3 characters long!");
        }
        String regex = "^[0-9]{3}$";
        if(!cvvCode.matches(regex)) {
            throw new InvalidCvvFieldFormatException("Expiry date field has to follow the 'XXX' format!");
        }
        return cvvCode;
    }
}
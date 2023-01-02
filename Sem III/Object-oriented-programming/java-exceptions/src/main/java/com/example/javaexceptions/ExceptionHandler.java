package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    String storeMessage;

    public ExceptionHandler(String message) {
        storeMessage = message;
    }
}

class CardNumberEmpty extends ExceptionHandler {
    public CardNumberEmpty(String message) {
        super(message);
    }
}

class ExpiryDateEmpty extends ExceptionHandler {
    public ExpiryDateEmpty(String message) {
        super(message);
    }
}

class CvvEmpty extends ExceptionHandler {
    public CvvEmpty(String message) {
        super(message);
    }
}
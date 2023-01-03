package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    String storeMessage;

    public ExceptionHandler(String message) {
        storeMessage = message;
    }
}

// Card number TextField exceptions
class CardNumberEmpty extends ExceptionHandler {
    public CardNumberEmpty(String message) {
        super(message);
    }
}
class IncorrectCardLength extends ExceptionHandler {
    public IncorrectCardLength(String message) {
        super(message);
    }
}

// Expiry date TextField exceptions
class ExpiryDateEmpty extends ExceptionHandler {
    public ExpiryDateEmpty(String message) {
        super(message);
    }
}
class IncorrectDateLength extends ExceptionHandler {
    public IncorrectDateLength(String message) {
        super(message);
    }
}

// Cvv code TextField exceptions
class CvvEmpty extends ExceptionHandler {
    public CvvEmpty(String message) {
        super(message);
    }
}
class IncorrectCvvLength extends ExceptionHandler {
    public IncorrectCvvLength(String message) {
        super(message);
    }
}
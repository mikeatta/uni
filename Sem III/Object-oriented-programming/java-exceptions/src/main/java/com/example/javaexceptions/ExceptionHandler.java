package com.example.javaexceptions;

public class ExceptionHandler extends Exception {

    String storeMessage;

    public ExceptionHandler(String message) {
        storeMessage = message;
    }
}

// Card number TextField exceptions
class CardNumberEmptyException extends ExceptionHandler {
    public CardNumberEmptyException(String message) {
        super(message);
    }
}
class IncorrectCardLengthException extends ExceptionHandler {
    public IncorrectCardLengthException(String message) {
        super(message);
    }
}
class InvalidCardFieldFormatException extends ExceptionHandler {
    public InvalidCardFieldFormatException(String message) {
        super(message);
    }
}

// Expiry date TextField exceptions
class ExpiryDateEmptyException extends ExceptionHandler {
    public ExpiryDateEmptyException(String message) {
        super(message);
    }
}
class IncorrectDateLengthException extends ExceptionHandler {
    public IncorrectDateLengthException(String message) {
        super(message);
    }
}
class InvalidDateFieldFormatException extends ExceptionHandler {
    public InvalidDateFieldFormatException(String message) {
        super(message);
    }
}
class InvalidDateFieldMonthException extends ExceptionHandler {
    public InvalidDateFieldMonthException(String message) {
        super(message);
    }
}
class InvalidDateFieldYearException extends ExceptionHandler {
    public InvalidDateFieldYearException(String message) {
        super(message);
    }
}
class ExpiryDateDueException extends ExceptionHandler {
    public ExpiryDateDueException(String message) {
        super(message);
    }
}

// Cvv code TextField exceptions
class CvvEmptyException extends ExceptionHandler {
    public CvvEmptyException(String message) {
        super(message);
    }
}
class IncorrectCvvLengthException extends ExceptionHandler {
    public IncorrectCvvLengthException(String message) {
        super(message);
    }
}
class InvalidCvvFieldFormatException extends ExceptionHandler {
    public InvalidCvvFieldFormatException(String message) {
        super(message);
    }
}
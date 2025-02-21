package com.example.javaexceptions;

public class CardExceptions extends Exception {

    String storeMessage;

    public CardExceptions(String message) {
        storeMessage = message;
    }
}

// Card number TextField exceptions
class CardNumberEmptyException extends CardExceptions {
    public CardNumberEmptyException(String message) {
        super(message);
    }
}
class IncorrectCardLengthException extends CardExceptions {
    public IncorrectCardLengthException(String message) {
        super(message);
    }
}
class InvalidCardFieldFormatException extends CardExceptions {
    public InvalidCardFieldFormatException(String message) {
        super(message);
    }
}

// Expiry date TextField exceptions
class ExpiryDateEmptyException extends CardExceptions {
    public ExpiryDateEmptyException(String message) {
        super(message);
    }
}
class IncorrectDateLengthException extends CardExceptions {
    public IncorrectDateLengthException(String message) {
        super(message);
    }
}
class InvalidDateFieldFormatException extends CardExceptions {
    public InvalidDateFieldFormatException(String message) {
        super(message);
    }
}
class InvalidDateFieldMonthException extends CardExceptions {
    public InvalidDateFieldMonthException(String message) {
        super(message);
    }
}
class InvalidDateFieldYearException extends CardExceptions {
    public InvalidDateFieldYearException(String message) {
        super(message);
    }
}
class ExpiryDateDueException extends CardExceptions {
    public ExpiryDateDueException(String message) {
        super(message);
    }
}

// Cvv code TextField exceptions
class CvvEmptyException extends CardExceptions {
    public CvvEmptyException(String message) {
        super(message);
    }
}
class IncorrectCvvLengthException extends CardExceptions {
    public IncorrectCvvLengthException(String message) {
        super(message);
    }
}
class InvalidCvvFieldFormatException extends CardExceptions {
    public InvalidCvvFieldFormatException(String message) {
        super(message);
    }
}
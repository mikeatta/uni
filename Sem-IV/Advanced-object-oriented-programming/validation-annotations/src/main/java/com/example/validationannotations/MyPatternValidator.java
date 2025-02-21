package com.example.validationannotations;

import java.lang.reflect.Field;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MyPatternValidator implements Validator {

    private boolean valid;
    private String message;

    Field[] fields = HelloController.class.getDeclaredFields();

    @Override
    public void validate(String value) {

        MyPattern annotation;
        String regex = null;

        for (Field field : fields) {
            if (field.isAnnotationPresent(MyPattern.class)) {
                annotation = field.getAnnotation(MyPattern.class);
                regex = annotation.regex();
                this.message = annotation.message();
            }
        }

        Pattern pattern = Pattern.compile(Objects.requireNonNull(regex));
        Matcher matcher = pattern.matcher(value);

        this.valid = matcher.matches();
    }

    @Override
    public boolean isValid() {
        return this.valid;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}

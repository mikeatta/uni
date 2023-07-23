package com.example.inpost.converters;

import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.data.binder.ValueContext;
import com.vaadin.flow.data.converter.Converter;

public class StringToDoubleConverter implements Converter<Double, String> {

    @Override
    public Result<String> convertToModel(Double aDouble, ValueContext valueContext) {
        if (aDouble == null) {
            return Result.ok(null);
        }
        return Result.ok(aDouble.toString());
    }

    @Override
    public Double convertToPresentation(String s, ValueContext valueContext) {
        return Double.parseDouble(s);
    }

}

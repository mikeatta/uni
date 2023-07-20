package com.example.inpost.converters;

import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.data.binder.ValueContext;
import com.vaadin.flow.data.converter.Converter;

public class LongToDoubleConverter implements Converter<Double, Long> {

    @Override
    public Result<Long> convertToModel(Double aDouble, ValueContext valueContext) {
        if (aDouble == null) {
            return Result.ok(null);
        }
        return Result.ok(aDouble.longValue());
    }

    @Override
    public Double convertToPresentation(Long aLong, ValueContext valueContext) {
        if (aLong == null) {
            return null;
        }
        return aLong.doubleValue();
    }

}

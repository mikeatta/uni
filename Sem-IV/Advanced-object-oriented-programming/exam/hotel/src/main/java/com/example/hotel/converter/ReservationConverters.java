package com.example.hotel.converter;

import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.data.binder.ValueContext;
import com.vaadin.flow.data.converter.Converter;

import java.sql.Date;
import java.time.LocalDate;

public class ReservationConverters  {

    public static class LocalDateToDateConverter implements Converter<LocalDate, Date> {
        @Override
        public Result<Date> convertToModel(LocalDate localDate, ValueContext valueContext) {
            if (localDate != null) {
                Date date = Date.valueOf(localDate);
                return Result.ok(date);
            }
            return Result.ok(null);
        }

        @Override
        public LocalDate convertToPresentation(Date date, ValueContext valueContext) {
            if (date != null) {
                return date.toLocalDate();
            }
            return null;
        }
    }

    public static class IntegerToIntConverter implements Converter<Integer, Integer> {
        @Override
        public Result<Integer> convertToModel(Integer integer, ValueContext valueContext) {
            return Result.ok(integer);
        }

        @Override
        public Integer convertToPresentation(Integer integer, ValueContext valueContext) {
            return integer;
        }
    }
}

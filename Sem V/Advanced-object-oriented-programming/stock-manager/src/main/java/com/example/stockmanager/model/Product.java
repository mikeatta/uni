package com.example.stockmanager.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("id")
    private UUID id;

    @Column
    private String name;

    @Column
    private String size;

    @Column
    private String sku;

    @Column
    private BigDecimal purchasePrice;

    @Column
    private BigDecimal marketPrice;

    @Column
    private BigDecimal amountMade;

    private BigDecimal calculateAmountMade() {
        try {
            return marketPrice.subtract(purchasePrice);
        } catch (ArithmeticException e) {
            e.printStackTrace();
            // Set a fallback 0 value in case of an exception
            return BigDecimal.ZERO;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public BigDecimal getAmountMade() {
        return calculateAmountMade();
    }

    public void setAmountMade(BigDecimal amountMade) {
        this.amountMade = amountMade;
    }
}

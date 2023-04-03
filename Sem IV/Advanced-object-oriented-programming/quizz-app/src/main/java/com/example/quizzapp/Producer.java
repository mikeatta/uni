package com.example.quizzapp;

import java.util.concurrent.BlockingQueue;

public class Producer implements Runnable {

    private BlockingQueue<Product> queue;
    private Product product;
//    protected StringCarrier stringCarrier;

    Producer(BlockingQueue<Product> queue) {
        this.queue = queue;
    }

    public void run() {
        StringCarrier stringCarrier = new StringCarrier();
        String productName = stringCarrier.getProductName();
        System.out.println("Product Name: " + productName);
        product = new Product(productName);
        try {
            Thread.sleep(500);
            queue.put(product);
            System.out.println("Added: " + product.getProduct());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

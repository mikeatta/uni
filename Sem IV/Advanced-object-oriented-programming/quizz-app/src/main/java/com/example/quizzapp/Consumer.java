package com.example.quizzapp;

import java.util.concurrent.BlockingQueue;

public class Consumer implements Runnable {

    private BlockingQueue<Product> queue;
    private StringCarrier stringCarrier = new StringCarrier();
    private Product product = new Product(stringCarrier.getProductName());

    Consumer(BlockingQueue<Product> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            while(!(product = queue.take()).getProduct().equals("end")) {
                Thread.sleep(1500);
                System.out.println("Consumer received: " + product.getProduct() + "*");
            }
        } catch (InterruptedException e) {
            System.out.println("Production ended.");
        }
    }
}

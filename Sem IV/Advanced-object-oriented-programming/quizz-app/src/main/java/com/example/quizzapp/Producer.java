package com.example.quizzapp;

import java.util.concurrent.BlockingQueue;

public class Producer implements Runnable {

    protected BlockingQueue<Product> queue;
    private Product product;

    Producer(BlockingQueue<Product> queue) {
        this.queue = queue;
    }

    public void run() {
        product = new Product("123");
        try {
            Thread.sleep(500);
            queue.put(product);
            System.out.println("Added: " + product.getProduct());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

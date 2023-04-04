package com.example.quizzapp;

import javafx.scene.control.TextArea;
import javafx.scene.layout.VBox;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class Server {

    private ServerSocket serverSocket;
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;

    private BlockingQueue<Product> queue = new ArrayBlockingQueue<>(2);
    Consumer consumer = new Consumer(queue);

    public Server(ServerSocket serverSocket) {
        try {
            this.serverSocket = serverSocket;
            this.socket = serverSocket.accept();
            this.bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            new Thread(consumer).start();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error starting server");
            closeConnections(socket, bufferedReader, bufferedWriter);
        }
    }

    private StringBuilder concatenateTextArea = new StringBuilder("");

    public void receiveAnswerFromUser(TextArea textArea) {
        new Thread(new Runnable() {

            HelloController hc = new HelloController();

            @Override
            public void run() {
                while (socket.isConnected()) {
                    try {
                        String answerFromClient = bufferedReader.readLine();
//                        System.out.println("@ Server | Received: " + answerFromClient);
                        Producer producer = new Producer(queue, new Product(answerFromClient));
                        new Thread(producer).start();
//                        hc.setProductName(answerFromClient);
//                        HelloController.addLabel(answerFromClient, textArea, concatenateTextArea);
                    } catch (IOException e) {
                        e.printStackTrace();
                        closeConnections(socket, bufferedReader, bufferedWriter);
                        break;
                    }
                }
            }
        }).start();
    }

    public void closeConnections(Socket socket, BufferedReader bufferedReader, BufferedWriter bufferedWriter) {
        try {
            if (socket != null) {
                socket.close();
            }
            if (bufferedReader != null) {
                bufferedReader.close();
            }
            if (bufferedWriter != null) {
                bufferedWriter.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class Producer implements Runnable {

    private BlockingQueue<Product> queue;
    private Product product;
    private HelloController hc = new HelloController();

    Producer(BlockingQueue<Product> queue, Product product) {
        this.queue = queue;
        this.product = product;
    }

    @Override
    public void run() {
//        product = new Product();
        try {
            Thread.sleep(500);
            queue.put(product);
            System.out.println("New product: " + product.getProduct());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class Consumer implements Runnable {

    private BlockingQueue<Product> queue;
    private Product product;

    Consumer(BlockingQueue<Product> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            while(!(product = queue.take()).getProduct().equals("null")) {
                Thread.sleep(1500);
                System.out.println("Received: " + product.getProduct());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

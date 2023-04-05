package com.example.quizzapp;

import javafx.scene.control.TextArea;

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

    public Server(ServerSocket serverSocket) {
        try {
            this.serverSocket = serverSocket;
            this.socket = serverSocket.accept();
            this.bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error starting server");
            closeConnections(socket, bufferedReader, bufferedWriter);
        }
    }

    public void receiveAnswerFromUser(TextArea textArea) {

        Consumer consumer = new Consumer(queue, textArea);
        new Thread(consumer).start();

        new Thread(new Runnable() {

            HelloController hc = new HelloController();

            @Override
            public void run() {
                while (socket.isConnected()) {
                    try {
                        String clientMessage = bufferedReader.readLine();
                        Producer producer = new Producer(queue, new Product(clientMessage));
//                        System.out.println("nick: " + clientNick);
//                        product = new Product(clientNick);

//                        String clientAnswer = bufferedReader.readLine();
//                        System.out.println("answer: " + clientAnswer);
////                        product = new Product(clientAnswer);
//                        producer = new Producer(queue, new Product(clientAnswer));

                        new Thread(producer).start();

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

    Producer(BlockingQueue<Product> queue, Product product) {
        this.queue = queue;
        this.product = product;
    }

    @Override
    public void run() {
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
    private TextArea textArea;

    Consumer(BlockingQueue<Product> queue, TextArea textArea) {
        this.queue = queue;
        this.textArea = textArea;
    }

    @Override
    public void run() {

        StringBuilder clientMessage = new StringBuilder();

        try {
            while((product = queue.take()).getProduct() != null) {
                Thread.sleep(1000);
                clientMessage.append(product.getProduct());
                HelloController.displayClientAnswer(clientMessage, textArea);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

package com.example.quizzapp;

import javafx.application.Platform;
import javafx.scene.control.TextArea;
import javafx.util.Pair;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.MessageFormat;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class Server {

    private ServerSocket serverSocket;
    private Socket socket;
    private BufferedReader bufferedReader;
    private BufferedWriter bufferedWriter;

    private BlockingQueue<Product> queue = new ArrayBlockingQueue<>(2);
    protected static String questionFilePath = "src/main/java/com/example/quizzapp/questions.txt";
    protected static int amountOfLines;

    static {
        try {
            amountOfLines = (int) Files.lines(Path.of(questionFilePath)).count();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    protected static int line = 0;

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

    public void loadQuestion(TextArea questionSheet) throws IOException {

        String question = Files.readAllLines(Path.of(questionFilePath)).get(line);
        System.out.println("Reading line: " + line);

        Platform.runLater(() -> questionSheet.appendText(question + "\n"));
    }

    public void receiveAnswerFromUser(TextArea textArea) {

        Consumer consumer = new Consumer(queue, textArea);
        new Thread(consumer).start();

        new Thread(new Runnable() {

            @Override
            public void run() {
                while (socket.isConnected()) {
                    try {
                        String clientNick = bufferedReader.readLine();
                        String clientAnswer = bufferedReader.readLine();

                        Pair<String, String> nickAnswerPair = new Pair<>(clientNick, clientAnswer);

                        Producer producer = new Producer(queue, new Product(nickAnswerPair));

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

    private void displayGameEndMessage() {

        textArea.appendText("""
                All questions have been answered!
                Thanks for playing!
                """);
    }

    private String loadAnswer() throws IOException {

        String answer = Files.readAllLines(Path.of(Server.questionFilePath)).get(Server.line);

        return answer.substring(answer.indexOf("|") + 1);
    }

    @Override
    public void run() {

        StringBuilder clientMessage;

        try {

            while((product = queue.take()).getProduct() != null) {

                Thread.sleep(1000);

                if (Server.line < Server.amountOfLines) {

                    if (product.getProduct().getValue().equals(loadAnswer())) {

                        clientMessage = new StringBuilder(MessageFormat.format(
                                "Client ''{0}'' answered: {1}",
                                product.getProduct().getKey(),
                                product.getProduct().getValue()
                        ));

                        queue.clear();
                        Server.line += 1;

                        HelloController.displayClientAnswer(clientMessage, textArea);

                        if (Server.line == Server.amountOfLines) {
                            displayGameEndMessage();
                        }
                    } else {
                        textArea.appendText("Incorrect answer received!\n");
                    }
                }
            }
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}

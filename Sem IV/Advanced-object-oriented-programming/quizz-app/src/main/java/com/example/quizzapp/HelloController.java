package com.example.quizzapp;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.scene.text.TextFlow;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class HelloController implements Initializable {
    @FXML
    private Label welcomeText;
    @FXML
    private VBox vBox;
    @FXML
    private TextArea serverLogs;

    private Product product;
    private Server server;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            System.out.println("Server started. Waiting for client to connect ...");
            server = new Server(new ServerSocket(5000));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error launching server");
        }

        server.receiveAnswerFromUser(serverLogs);
    }

    public static void addLabel(String answerFromClient, TextArea textArea, StringBuilder stringBuilder) {
//        HBox hBox = new HBox();
//        hBox.setAlignment(Pos.CENTER_LEFT);
//
//        Text text = new Text(answerFromClient);
//        TextFlow textFlow = new TextFlow(text);
//        hBox.getChildren().add(textFlow);
        stringBuilder.append("\n" + answerFromClient);

        BlockingQueue<Product> queue = new ArrayBlockingQueue<>(2);
        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        new Thread(producer).start();
        new Thread(consumer).start();

        Platform.runLater(new Runnable() {
            @Override
            public void run() {
//                vBox.getChildren().add(hBox);
                textArea.setText(stringBuilder.toString());
            }
        });
    }
}

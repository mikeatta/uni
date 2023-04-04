package com.example.quizzapp;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class HelloApplication extends Application {

//    BlockingQueue<Product> queue = new ArrayBlockingQueue<>(2);
//    Producer producer = new Producer(queue);
//    Consumer consumer = new Consumer(queue);

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Server");
        stage.setScene(scene);
        stage.show();

//        new Thread(producer).start();
//        new Thread(consumer).start();
    }

    public static void main(String[] args) {
        launch();
    }
}
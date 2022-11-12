package com.example.tictactoe;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import java.util.Random;

public class HelloController {

    public Button btn_R0_C0;
    public Button btn_R0_C1;
    public Button btn_R0_C2;
    public Button btn_R1_C0;
    public Button btn_R1_C1;
    public Button btn_R1_C2;
    public Button btn_R2_C0;
    public Button btn_R2_C1;
    public Button btn_R2_C2;

    Random random = new Random();

    @FXML
    private Label welcomeText;

    @FXML
    protected Label playerMove;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    //
    @FXML
    protected String drawTurn() {
        String playerTurn;
        boolean drawMove = random.nextBoolean();
        if (drawMove) playerTurn = "circle";
        else playerTurn = "cross";
        playerMove.setText("It's " + playerTurn +"'s turn");
        return playerTurn;
    }

    @FXML
    protected void buttonAction(ActionEvent actionEvent) {
        Button buttonID = (Button) actionEvent.getTarget();
        welcomeText.setText("ID: " + buttonID);
    }
}
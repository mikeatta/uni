package com.example.tictactoe;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

import java.util.Random;

public class HelloController {

    public Label countMoves;
    public Button btn_R0_C0;
    public Button btn_R0_C1;
    public Button btn_R0_C2;
    public Button btn_R1_C0;
    public Button btn_R1_C1;
    public Button btn_R1_C2;
    public Button btn_R2_C0;
    public Button btn_R2_C1;
    public Button btn_R2_C2;

    @FXML
    private Label welcomeText;

    @FXML
    protected Label playerMove;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    // Program methods
    Random random = new Random();

    // Game variables
    String currentMove = null; // Draw first player to make a move
    String nextMove = null; // Store next player's move
    int turns = 0; // Count amount of turns taken

    // Decide which player makes the first move
    protected void drawTurn() {
        String drawnTurn;
        boolean drawMove = random.nextBoolean();
        if (drawMove) drawnTurn = "circle";
        else drawnTurn = "cross";
        this.currentMove = drawnTurn;
    }

    protected void setNextMove() {
        if (currentMove.equals("circle")) nextMove = "cross";
        else nextMove = "circle";
        this.currentMove = nextMove;
    }

    @FXML
    protected void setTurnPermissions() {
        // Set first player to make a move
        if (turns == 0) {
            drawTurn();
            playerMove.setText("Player move: " + this.currentMove);
        }
        else if (turns <= 8) {
            setNextMove();
            playerMove.setText("Player move: " + this.currentMove);
        }
        else playerMove.setText("Turn limit reached. (" + turns + ")");
        countMoves.setText("Moves: " + this.turns);
        turns++;
    }

}
import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class WindowApp extends JFrame {

    JButton btnOne = new JButton("Button one");
    JButton btnTwo = new JButton("Button two");
    JLabel jLabel = new JLabel("Miner Game - Click either button to start");
    JTextArea jTextArea = new JTextArea();
    Random random = new Random();

    // Counter variables
    int gameAttempts = 0;
    int diamondsGotten = 0;

    public WindowApp(String userName) {
        // Setting window title
        this.setTitle("Hello, " + userName);

        // Setting window dimensions
        setSize(new Dimension(600, 600));
        setLayout(new GridLayout(2, 2, 15, 15));

        // Adding buttons and labels
        this.add(btnOne);
        this.add(btnTwo);
        this.add(jLabel);
        this.add(jTextArea);

        // Event buttons
        btnOne.addActionListener( actionEvent -> gameLogic(getRand(false)) );
        btnTwo.addActionListener( actionEvent -> gameLogic(getRand(true)) );

        // Window settings
        this.setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    // Game logic method
    private void gameLogic(boolean isDiamond) {
        // Counting tries and diamonds found
        if (isDiamond) {
            this.jTextArea.setText("Bravo! You got a diamond!"); // Display message on jTextArea
            diamondsGotten++; // Increment count if a diamond was found
        } else this.jTextArea.setText("You've hit a bomb!");
        gameAttempts++; // Increment game attempts with every guess

        // Changing labels based on attempt & diamond count
        this.jLabel.setText("Attempts: " + gameAttempts + " Diamonds: " + diamondsGotten);

        // Reset the counters at 20 plays & display message
        if (gameAttempts >= 20) {
            this.jTextArea.setText("The end. Click either button to play again...");
            this.jLabel.setText("RESULT: " + diamondsGotten + " diamonds found out of " + gameAttempts + " tries");
            gameAttempts = 0;
            diamondsGotten = 0;
        }
    }

    // Swap results, pass result to gameLogic()
    private boolean getRand(boolean swapResults) {
        if (!swapResults) return random.nextBoolean();
        else return !random.nextBoolean();
    }

}

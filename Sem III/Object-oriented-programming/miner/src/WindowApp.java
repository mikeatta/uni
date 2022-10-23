import javax.swing.*;
import java.awt.*;
import java.util.Random;

public class WindowApp extends JFrame {

    JButton btnOne = new JButton("Button one");
    JButton btnTwo = new JButton("Button two");
    JLabel jLabel = new JLabel("Sample text");
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

        // Game logic
        btnOne.addActionListener(actionEvent -> {
            boolean isDiamond = random.nextBoolean(); // Create boolean
            if (isDiamond) {
                this.jTextArea.setText("Bravo! You got a diamond!"); // Display message on jTextArea
                diamondsGotten++; // Increment count if a diamond was gotten
            } else this.jTextArea.setText("You've hit a bomb!");
            gameAttempts++; // Increment game attempts with every guess

            // Changing labels based on attempt & diamond count
            this.jLabel.setText("Attempts: " + gameAttempts + " Diamonds: " + diamondsGotten);
        });

        btnTwo.addActionListener(actionEvent -> {
            boolean isDiamond = !(random.nextBoolean()); // Invert btnOne boolean
            if (isDiamond) {
                this.jTextArea.setText("Bravo! You got a diamond!"); // Display message on jTextArea
                diamondsGotten++; // Increment count if a diamond was gotten
            } else this.jTextArea.setText("You've hit a bomb!");
            gameAttempts++; // Increment game attempts with every guess

            // Changing labels based on attempt & diamond count
            this.jLabel.setText("Attempts: " + gameAttempts + " Diamonds: " + diamondsGotten);
        });

        // Window settings
        this.setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

}

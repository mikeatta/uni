import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Window extends JFrame implements ActionListener {

    public Window() {
        System.out.println("Hello from window");
        setSize(new Dimension(400, 400)); // Setting window size
        JButton btn = new JButton("say Hello"); // Creating new button
        this.add(btn); // Show button
        btn.addActionListener(this); // CHANGE LISTENER IN HOMEWORK PROGRAM
        this.setVisible(true); // Display window
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // End program on window close
    }

    public void actionPerformed(ActionEvent event) {
        System.out.println("Hello world");
    }

}

// DO DOMU: Stworzyć inną klasę odpowiadającą na kliknięcie przycisku
// Get and print out user input from input field

// SPRAWOZDANIE Z ZADANIA
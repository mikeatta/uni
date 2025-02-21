import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WindowWithInputField extends JFrame implements ActionListener {

    JLabel inputLabel = new JLabel("Enter text: ");
    JTextField userInput = new JTextField("Sample text");
    JButton submitInput = new JButton("Enter");

    public WindowWithInputField() {
        setSize(new Dimension(500, 500)); // Set window size
        this.setLayout(null);

        // Adding input field label
        this.add(inputLabel);
        inputLabel.setSize(new Dimension(100,50));
        inputLabel.setLocation(200,125);

        // Adding input field
        this.add(userInput);
        userInput.setSize(new Dimension(100,25));
        userInput.setLocation(200,165);

        // Adding submit button
        this.add(submitInput);
        submitInput.setSize(new Dimension(100,30));
        submitInput.setLocation(200,200);
        submitInput.addActionListener(this);

        this.setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public void actionPerformed(ActionEvent event) {
        String input = userInput.getText();
        System.out.println("You've written: " + input);
    }

}

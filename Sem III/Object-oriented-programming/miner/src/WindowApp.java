import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WindowApp extends JFrame {

    JButton btnOne = new JButton("Button one");
    JButton btnTwo = new JButton("Button two");
    JLabel jLabel = new JLabel("Sample text");
    JTextArea jTextArea = new JTextArea();

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
        btnOne.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Clicked button one");
            }
        });

        btnTwo.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Clicked button two");
            }
        });

        // Window settings
        this.setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

}

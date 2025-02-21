import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner MyObj = new Scanner(System.in); // Creating scanner object
        System.out.print("Hello! What's you name? : "); // Getting user's name
        String userName = MyObj.nextLine(); // Storing user's name
        new WindowApp(userName);
    }
}

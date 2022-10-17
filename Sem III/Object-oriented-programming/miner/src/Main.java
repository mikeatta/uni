import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner MyObj = new Scanner(System.in);
        System.out.print("Hello! What's you name? : ");
        String userName = MyObj.nextLine();
        System.out.println("Hey, " + userName);
        new WindowApp();
    }
}
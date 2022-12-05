public class Main extends ExceptionHandler {

    static Main obj = new Main();

    // Program test variables
    static int a=10;
    static int b=0;
    static int c=5;
    int result;

    public static void main(String[] args) {
        System.out.println("Hello world!");
        obj.exceptionTest();
    }

    public void exceptionTest() {
        // Try / catch clause
        try {
            int result = a / b;
            System.out.println("No exception thrown.\nResult is: " + result);
        } catch (Exception e) {
            System.out.println("Exception handled here: " + e.getMessage());
        } finally {
            result = a / c;
        }

        System.out.println(result);
    }
}
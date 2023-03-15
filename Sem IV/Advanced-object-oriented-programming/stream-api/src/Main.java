import java.util.ArrayList;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        System.out.println("Stream API");

        System.out.println("--------------");

        // Get the smallest element of storeIntegers
        System.out.println("Get smallest element:");
        ArrayList<Integer> storeIntegers = new ArrayList<>();
        storeIntegers.add(7);
        storeIntegers.add(14);
        storeIntegers.add(21);

        Stream<Integer> smallestInteger = storeIntegers.stream();
        System.out.println(smallestInteger.min(Integer::compare));

        System.out.println("--------------");

        // Get even elements of storeIntegers
        System.out.println("Get even elements:");
        Stream<Integer> evenIntegers = storeIntegers.stream();
        evenIntegers.filter(integer -> integer % 2 == 0).forEach(integer -> System.out.println(integer));
    }
}
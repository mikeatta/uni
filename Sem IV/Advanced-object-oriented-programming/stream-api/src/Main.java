import java.util.ArrayList;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        System.out.println("Stream API");

        System.out.println("--------------");

        ArrayList<Integer> storeIntegers = new ArrayList<>();
        storeIntegers.add(7);
        storeIntegers.add(14);
        storeIntegers.add(21);

        Stream<Integer> integerStream = storeIntegers.stream();
        System.out.println(integerStream.min(Integer::compare));
    }
}
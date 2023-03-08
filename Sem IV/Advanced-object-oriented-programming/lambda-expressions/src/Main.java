import java.util.function.BiFunction;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        // Single line lambda example
        Supplier<String> printExerciseName;
        printExerciseName = () -> "Lambda expressions";
        System.out.println(printExerciseName.get());

        System.out.println("-----------------");

        // Block lambda example
        Predicate<Integer> higherThan = (i) -> { return i > 100; };
        System.out.print("Number is greater than 100: ");
        System.out.println(higherThan.test(101));

        System.out.println("-----------------");

        // Reference by method example
        class CheckStringForChar {
            private boolean searchForCharacter(Character c, String str) {
                return str.contains(c.toString());
            }
        }
        BiFunction<Character, String, Boolean> checkForCharacter = new CheckStringForChar()::searchForCharacter;
        System.out.print("String contains char: ");
        System.out.println(checkForCharacter.apply('c', "car"));
    }
}
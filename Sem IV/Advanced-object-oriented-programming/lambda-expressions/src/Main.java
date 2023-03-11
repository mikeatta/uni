import java.util.function.*;

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

        // Reference by static method example
        Function<Integer, String> getBinary = Integer::toBinaryString;
        System.out.println("Binary representation of number is: " + getBinary.apply(20));

        System.out.println("-----------------");

        // Reference by object's method example
        class CheckForCharacter {
            Boolean searchForCharacter(Character c, String str) {
                return str.contains(c.toString());
            }
        }
        CheckForCharacter checkForCharacter = new CheckForCharacter();
        BiFunction<Character, String, Boolean> findChar = checkForCharacter::searchForCharacter;
        System.out.println("String contains the character: " + findChar.apply('c', "char"));

        System.out.println("-----------------");

        // Constrictor reference
        class Multiply {
            private final Integer base;
            private final Integer exponent;

            public Multiply(Integer base, Integer exponent) {
                this.base = base;
                this.exponent = exponent;
            }

            public Integer getResult() {
                return this.base * this.exponent;
            }
        }
        BiFunction<Integer, Integer, Multiply> multiply = Multiply::new;
        System.out.println("Operation result: " + multiply.apply(10, 10).getResult());
    }
}
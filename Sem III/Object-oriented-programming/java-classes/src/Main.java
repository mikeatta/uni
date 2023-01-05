import java.util.ArrayList;
import java.util.List;

// Abstract class implementation

class Beaverton extends Cities {
    public static String cityDetails = "Beaverton, OR";

    public void cityNote() {
        System.out.println("NOTE: Nike was founded here.");
    }
}

class NewYork extends Cities {
    public static String cityDetails = "New York, NY";
    @Override
    public void cityNote() {
        System.out.println("NOTE: Wall St. resides here.");
    }
}

class LosAngeles extends Cities {
    public static String cityDetails = "Los Angeles, CA";
    @Override
    public void cityNote() {
        System.out.println("NOTE: Films are being made here.");
    }
}

// Interface implementation

class Ford implements Vehicles {
    public void vehicleMake() {
        System.out.println("Ford");
    }

    public void engineType() {
        System.out.println("Engine type: V8");
    }

    public void drive() {
        System.out.println("Ford drives away...");
    }
}

class Tesla implements Vehicles {
    public void vehicleMake() {
        System.out.println("Tesla");
    }

    public void engineType() {
        System.out.println("Engine type: electric");
    }

    public void drive() {
        System.out.println("Tesla drives away...");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Java classes!\n---------\n");

        // Abstract classes
        System.out.println("Abstract classes:\n");
        List<Cities> city = new ArrayList<>();
        city.add(new Beaverton());
        city.add(new NewYork());
        city.add(new LosAngeles());

        List<String> cityDetails = new ArrayList<>();
        cityDetails.add(Beaverton.cityDetails);
        cityDetails.add(NewYork.cityDetails);
        cityDetails.add(LosAngeles.cityDetails);

        new CityDetails().showInfo(city, cityDetails);

        // Interfaces
        System.out.println("\nInterfaces:\n");
        Ford ford = new Ford();
        Tesla tesla = new Tesla();

        ford.vehicleMake();
        ford.engineType();
        ford.drive();
        tesla.vehicleMake();
        tesla.engineType();
        tesla.drive();
    }
}
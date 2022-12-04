import java.util.ArrayList;
import java.util.List;

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
        System.out.println("NOTE: Films are make here.");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Java classes!\n---------\n");

        List<Cities> city = new ArrayList<>();
        city.add(new Beaverton());
        city.add(new NewYork());
        city.add(new LosAngeles());

        List<String> cityDetails = new ArrayList<>();
        cityDetails.add(Beaverton.cityDetails);
        cityDetails.add(NewYork.cityDetails);
        cityDetails.add(LosAngeles.cityDetails);

        new CityDetails().showInfo(city, cityDetails);
    }
}
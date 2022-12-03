import java.util.ArrayList;
import java.util.List;

class Beaverton extends Cities {
    public static String cityDetails = "Beaverton, OR";
    public void cityName() {
        System.out.println("Beaverton, OR");
    }
}

class NewYork extends Cities {
    public static String cityDetails = "New York, NY";
    public void cityName() {
        System.out.println("New York, NY");
    }
}

class LosAngeles extends Cities {
    public static String cityDetails = "Los Angeles, CA";
    public void cityName() {
        System.out.println("Los Angeles, CA");
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
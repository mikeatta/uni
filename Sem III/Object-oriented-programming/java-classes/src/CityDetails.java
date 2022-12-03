import java.util.List;

public class CityDetails {

    public void showInfo(List<Cities> cities, List<String> details) {
        cities.forEach(city -> {
            String detailsOfCity = details.get(cities.indexOf(city));
            Cities.cityName(detailsOfCity);
            Cities.isCity();
        });
    }

}
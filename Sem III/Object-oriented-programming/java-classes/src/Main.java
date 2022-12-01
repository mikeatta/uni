abstract class UnitedStates {
    public abstract void isCity();
}

class Washington extends UnitedStates {
    public void isCity() {
        System.out.println("Is a city.");
    }
}

class NewYork extends UnitedStates {
    public void isCity() {
        System.out.println("Is another city.");
    }
}

class LosAngeles extends UnitedStates {
    public void isCity() {
        System.out.println("Is yet another city.");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Java classes!\n---------\n");

        Washington wsh = new Washington();
        NewYork nyc = new NewYork();
        LosAngeles la = new LosAngeles();

        wsh.isCity();
        nyc.isCity();
        la.isCity();
    }
}
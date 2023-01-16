interface Vehicles {
    public void vehicleMake();
    public default void engineType(String engineType) {
        System.out.println("Vehicle engine type : " + engineType);
    }
    public void drive();
}
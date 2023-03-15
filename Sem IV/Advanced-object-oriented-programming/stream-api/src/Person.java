public class Person {
    private String nick;
    private int age;

    public Person(String nick, int age) {
        this.nick = nick;
        this.age = age;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getNick() {
        return this.nick;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public int getAge() {
        return this.age;
    }
}

import java.util.List;

public class Group {
    private String groupName;
    private List<Person> members;

    public Group(String groupName, List<Person> members) {
        this.groupName = groupName;
        this.members = members;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setMembers(List<Person> members) {
        this.members = members;
    }

    public List<Person> getMembers() {
        return this.members;
    }
}

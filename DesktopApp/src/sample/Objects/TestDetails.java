package sample.Objects;

public class TestDetails {
    private int ID;
    private String TestName;
    private String TeacherID;
    private int Allowed;
    private int Time;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTestName() {
        return TestName;
    }

    public void setTestName(String testName) {
        TestName = testName;
    }

    public String getTeacherID() {
        return TeacherID;
    }

    public void setTeacherID(String teacherID) {
        TeacherID = teacherID;
    }

    public int getAllowed() {
        return Allowed;
    }

    public void setAllowed(int allowed) {
        Allowed = allowed;
    }

    public int getTime() {
        return Time;
    }

    public void setTime(int time) {
        Time = time;
    }
}

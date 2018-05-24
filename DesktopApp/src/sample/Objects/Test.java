package sample.Objects;

import java.util.ArrayList;

public class Test {
    private String testName;
    private ArrayList<Question> testQuestions;

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public ArrayList<Question> getTestQuestions() {
        return testQuestions;
    }

    public void setTestQuestions(ArrayList<Question> testQuestions) {
        this.testQuestions = testQuestions;
    }

}

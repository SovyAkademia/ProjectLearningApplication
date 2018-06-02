package sample.Objects;

import java.util.ArrayList;

public class TestPrototype {
    private String resultID;
    private String testName;
    private ArrayList<QuestionPrototype> questions;

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public ArrayList<QuestionPrototype> getTestQuestionPrototypes() {
        return questions;
    }

    public void setTestQuestionPrototypes(ArrayList<QuestionPrototype> testQuestionPrototypes) {
        this.questions = testQuestionPrototypes;
    }

    public String getResultID() {
        return resultID;
    }

    public void setResultID(String resultID) {
        this.resultID = resultID;
    }
}

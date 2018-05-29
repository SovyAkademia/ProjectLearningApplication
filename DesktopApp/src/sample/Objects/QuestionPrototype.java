package sample.Objects;

import java.util.ArrayList;

public class QuestionPrototype {
    private int questionID;
    private String answerID;
    private String questionText;
    private String answerText;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String question) {
        this.questionText = question;
    }

    public int getQuestionID() {
        return questionID;
    }

    public void setQuestionID(int questionID) {
        this.questionID = questionID;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public String getAnswerID() {
        return answerID;
    }

    public void setAnswerID(String answerID) {
        this.answerID = answerID;
    }
}

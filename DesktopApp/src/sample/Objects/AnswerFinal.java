package sample.Objects;

public class AnswerFinal {
    private String answerText;
    private String answerID;

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answer) {
        this.answerText = answer;
    }

    public AnswerFinal(String answerText, String answerID) {
        this.answerText = answerText;
        this.answerID = answerID;
    }

    public String getAnswerID() {
        return answerID;
    }

    public void setAnswerID(String answerID) {
        this.answerID = answerID;
    }
}

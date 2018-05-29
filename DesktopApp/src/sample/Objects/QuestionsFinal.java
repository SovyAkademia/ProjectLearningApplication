package sample.Objects;

import java.util.ArrayList;

public class QuestionsFinal {
    private int questionID;
    public ArrayList<AnswerFinal> answers = new ArrayList<AnswerFinal>();
    private String questionText;

    public QuestionsFinal(int questionID, ArrayList<AnswerFinal> answers, String questionText) {
        this.questionID = questionID;
        this.answers = answers;
        this.questionText = questionText;
    }

    public QuestionsFinal(int questionID, String questionText, String answer,String answerID) {
        this.questionID = questionID;
        this.questionText = questionText;
        this.answers.add(new AnswerFinal(answer,answerID));
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getQuestionID() {
        return questionID;
    }

    public void setQuestionID(int questionID) {
        this.questionID = questionID;
    }

    public ArrayList<AnswerFinal> getAnswers() {
        return answers;
    }

    public void setAnswers(ArrayList<AnswerFinal> answers) {
        this.answers = answers;
    }
}

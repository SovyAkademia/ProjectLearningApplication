package sample.Objects;

import java.util.ArrayList;

public class TestFinal {
    private String testNmae;
    private ArrayList<QuestionsFinal> questions = new ArrayList<QuestionsFinal>();

    public TestFinal(TestPrototype prototype) {
        this.questions = new ArrayList<QuestionsFinal>();
        this.testNmae=prototype.getTestName();
        for (QuestionPrototype swap:prototype.getTestQuestionPrototypes()) {
            int swapId = swap.getQuestionID();
            boolean exist = false;
            if (this.questions == null) {
                this.questions.add(new QuestionsFinal(swapId,swap.getQuestionText(),swap.getAnswerText()));
                /*ArrayList<QuestionsFinal> toQuestions = new ArrayList<QuestionsFinal>();

                QuestionsFinal newQuestion = new QuestionsFinal();
                newQuestion.setQuestionID(swapId);
                newQuestion.setQuestionText(swap.getQuestionText());
                AnswerFinal newAnswer = new AnswerFinal();
                System.out.println(swap.getAnswerText());
                newAnswer.setAnswerText(swap.getAnswerText());
                try {
                    ArrayList<AnswerFinal> toAnswer = new ArrayList<AnswerFinal>();
                    toAnswer.add(newAnswer);
                    newQuestion.answers = toAnswer;
                    //newQuestion.answers.add(newAnswer);
                    this.questions = toQuestions;
                    this.questions.add(newQuestion);
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
                */
            }
            for (QuestionsFinal swap2:this.questions) {
                if (swap2.getQuestionID() == swapId){
                    //AnswerFinal newAnswer = new AnswerFinal();
                    //newAnswer.setAnswerText(swap.getAnswerText());
                    swap2.getAnswers().add(new AnswerFinal(swap.getAnswerText()));
                    exist = true;
                    break;
                }
            }
            if (exist){}
            else {
                /*QuestionsFinal newQuestion = new QuestionsFinal();
                newQuestion.setQuestionID(swapId);
                newQuestion.setQuestionText(swap.getQuestionText());
                AnswerFinal newAnswer = new AnswerFinal();
                newAnswer.setAnswerText(swap.getAnswerText());
                newQuestion.getAnswers().add(newAnswer);
                */
                this.getQuestions().add(new QuestionsFinal(swapId,swap.getQuestionText(),swap.getAnswerText()));
            }
        }
    }

    public void printTest(){
        System.out.println(this.testNmae);
        for (QuestionsFinal questions:this.getQuestions()) {
            System.out.println("\t"+questions.getQuestionText());
            for (AnswerFinal answers:questions.getAnswers()) {
                System.out.println("\t\t"+answers.getAnswerText());
            }
        }
    }

    public String getTestNmae() {
        return testNmae;
    }

    public void setTestNmae(String testNmae) {
        this.testNmae = testNmae;
    }

    public ArrayList<QuestionsFinal> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<QuestionsFinal> questions) {
        this.questions = questions;
    }
}

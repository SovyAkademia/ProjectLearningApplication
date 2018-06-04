package sample.Controlers;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.input.KeyCombination;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import sample.Objects.*;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import sample.api.Communication;
import sample.api.HttpGet;
import sample.threads.RewriteThr;


import java.util.ArrayList;


public class MainWindowController {

    public MenuButton menuButtonCategory;
    public MenuButton testMenuButton;
    public MenuButton MenuButtonForUser;
    public ProgressBar connectivity2;

    public static int testRunning;

    private int answered = 0;
    private String actualTestID;
    private String actualResultID;

    private Communication communication = new Communication();


    public void MenuLogout(ActionEvent arg0) {
        Platform.exit();
    }

    public void performAction(ActionEvent actionEvent) {
        System.out.println("here");
        MenuItem target  = (MenuItem) actionEvent.getSource();
        System.out.println("Clicked On Item:"+target.getId());
    }

    public void createTest(ActionEvent event, TestFinal actualTest) {
        int countOfQuestions = actualTest.getQuestions().size();
        answered = 0;
        this.actualResultID = actualTest.getResultID();
        this.actualTestID = communication.getActualTestID();
        //System.out.println(countOfQuestions);

        try {
            Group root = new Group();
            Scene scene = new Scene(root, 800, 600, Color.WHITE);

            Stage primaryStage = new Stage();
            primaryStage.setFullScreen(true);

            TabPane tabPane = new TabPane();
            BorderPane mainPane = new BorderPane();

            Tab tabFinal = new Tab();
            tabFinal.setText("Final");
            tabFinal.setStyle("-fx-background-color: YELLOW;");
            HBox hbox2 = new HBox();
            mainPane.setTop(hbox2);
            GridPane myGrid2 = new GridPane();
            hbox2.getChildren().add(myGrid2);

            int finalRow = 0;

            int i = 1;
            for(QuestionsFinal swapQuestion:actualTest.getQuestions()) {

                ToggleGroup toggleGroup = new ToggleGroup();

                Tab tab = new Tab();
                tab.setText("Question "+i);
                tab.setStyle("-fx-background-color: RED;");
                i++;
                HBox hbox = new HBox();
                mainPane.setTop(hbox);
                GridPane myGrid = new GridPane();
                hbox.getChildren().add(myGrid);

                Label lbl = new Label(swapQuestion.getQuestionText());
                lbl.setMaxWidth(400);
                lbl.setWrapText(true);
                lbl.setTranslateY(50);

                //Label lbl = new Label(swapQuestion.getQuestionText());
                myGrid.add(lbl,0,0,5,3);

                Label finalLbl = new Label(swapQuestion.getQuestionText());
                finalLbl.setWrapText(true);
                finalLbl.setMaxWidth(1100);
                //finalLbl.prefWidth(150);
                finalLbl.prefHeight(80);
                finalLbl.setStyle("-fx-text-fill: white;");
                finalLbl.setFont(new Font("Arial", 30));
                myGrid2.add(finalLbl,0,finalRow);
                Label finalAns = new Label("   Empty ");
                finalAns.prefHeight(80);
                finalAns.setFont(new Font("Arial", 30));
                //finalAns.prefWidth(250);
                finalAns.setId("answ"+String.valueOf(swapQuestion.getQuestionID()));
                finalAns.setStyle("-fx-text-fill: red;");
                myGrid2.add(finalAns,1,finalRow);

                finalRow++;
                int position = 300;
                int row = 2;
                int countofans = 0;
                for (AnswerFinal swapAnswer:swapQuestion.getAnswers()) {
                    RadioButton newRadio = new RadioButton();
                    newRadio.setToggleGroup(toggleGroup);
                    newRadio.setText(swapAnswer.getAnswerText());
                    newRadio.setTranslateX(300);
                    newRadio.setTranslateY(position);
                    newRadio.setStyle("-fx-text-fill: white;");
                    String newID = (swapQuestion.getQuestionID()+" "+swapAnswer.getAnswerID()+" "+communication.getStudentId()+" "+actualTest.getResultID() + " ## " + swapAnswer.getAnswerText());
                    newRadio.setUserData(newID);
                    newRadio.setId(swapAnswer.getAnswerText());
                    //System.out.println(newRadio.getId());
                    position+=50;
                    myGrid.add(newRadio,0,row);
                    row++;
                    if (countofans >= 3){
                        break;
                    }
                    else {
                        countofans++;
                    }
                }

                Button btnSubmitQuestion = new Button("Submit answer"); //toto tu vytvori tlacidlo prida mu ID,funkciu a zavrie scenu
                btnSubmitQuestion.setOnAction(resolveSubmit -> {
                    if (resolveSubmit == null) {
                        return;
                    }
                    if (toggleGroup.getSelectedToggle() == null) {
                        return;
                    }
                    if (toggleGroup.getSelectedToggle().getUserData() == null) {
                        return;
                    }
                    String checkedID = toggleGroup.getSelectedToggle().getUserData().toString();

                    String[] res = checkedID.split("##");
                    String swapper = "   Answer:  ";

                    int abc = 0;
                    for (String a: res) {
                        if (abc == 0){
                            abc++;
                        }
                        else {
                            swapper = swapper+ " " + a;
                        }
                    }

                    //System.out.println(checkedID);
                    int communicate = communication.postResult(res[0]);
                    if(communicate > 0)
                    {
                        //System.out.println("sending OK");
                        tab.setStyle("-fx-background-color: GREEN;");
                        tabPane.getSelectionModel().selectNext();
                        //tab.setDisable(true);
                        finalAns.setText(swapper);
                        if (communicate == 2){
                            finalAns.setStyle("-fx-text-fill: green;");
                        }
                        btnSubmitQuestion.setDisable(true);
                        answered++;
                    }
                    else
                    {
                        System.out.println("Error while sending");
                    }
                });
                btnSubmitQuestion.setId("closeButton");
                mainPane.setCenter(tabPane);

                hbox.getChildren().add(lbl);
                lbl.setTranslateX(650);
                lbl.setTranslateY(250);

                hbox.getChildren().add(btnSubmitQuestion);
                btnSubmitQuestion.setTranslateX(250);
                btnSubmitQuestion.setTranslateY(500);

                tab.setContent(hbox);
                tabPane.getTabs().add(tab);

                lbl.setFont(new Font("Arial", 30));
                tab.setClosable(false);
                tabPane.setStyle("-fx-background-color: #434343;-fx-text-fill: white;");
                lbl.setStyle("-fx-text-fill: white;-fx-text-size: 25px");


                if (i > countOfQuestions)
                {
                    finalRow++;
                    Label testoutput = new Label("  Test result: ");
                    testoutput.prefHeight(80);
                    testoutput.setStyle("-fx-text-fill: white;");
                    testoutput.setFont(new Font("Arial", 30));
                    myGrid2.add(testoutput,0,finalRow);
                    Button finalize = new Button();
                    Button end = new Button();
                    end.setDisable(true);
                    end.setOnAction(finish -> {
                        Platform.exit();
                    });
                    finalize.setOnAction(endTest ->{
                        if (countOfQuestions == answered){
                            String testResult = communication.finalizeTest(this.actualResultID,this.actualTestID);
                            if (testResult != null) {
                                testoutput.setText("    "+testResult);
                                end.setDisable(false);
                                finalize.setDisable(true);
                            }
                            else {
                                testoutput.setText("Communication error");
                            }
                        }
                        else {
                            testoutput.setText("Error ");
                        }
                    });
                    finalize.setText("Finish");
                    end.setText("Exit Test");
                    myGrid2.add(finalize,1,finalRow);
                    finalRow++;
                    myGrid2.add(end,1,finalRow);
                    tabFinal.setClosable(false);
                    tabFinal.setContent(hbox2);
                    tabPane.getTabs().add(tabFinal);
                }

            }




            mainPane.prefHeightProperty().bind(scene.heightProperty()); //da tabPane na celu stranu STAGU
            mainPane.prefWidthProperty().bind(scene.widthProperty());
            primaryStage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);

            root.getChildren().add(mainPane);
            primaryStage.setScene(scene);
            primaryStage.show();

        } catch (Exception e) {
            e.printStackTrace();}
    }

    public void changePassword() {
        Stage primaryStage = new Stage();
        primaryStage.setTitle("Change Password");
        GridPane gridko = new GridPane();
        gridko.getColumnConstraints().add(new ColumnConstraints(18));

        Label labelNewPassword = new Label();
        labelNewPassword.setText("Here insert NEW password: ");
        labelNewPassword.setTextFill(Color.WHITE);
        GridPane.setConstraints(labelNewPassword,2,1);

        TextField fieldNewPassword = new TextField();
        GridPane.setConstraints(fieldNewPassword,2,2);

        Label labelNewAgainPassword = new Label();
        labelNewAgainPassword.setText("Here insert NEW password again: ");
        labelNewAgainPassword.setTextFill(Color.WHITE);
        GridPane.setConstraints(labelNewAgainPassword,2,4);

        TextField fieldNewAgainPassword = new TextField();
        GridPane.setConstraints(fieldNewAgainPassword,2,5);

        Label labelOldPassword = new Label();
        labelOldPassword.setText("Here insert OLD password: ");
        labelOldPassword.setTextFill(Color.WHITE);
        GridPane.setConstraints(labelOldPassword,2,7);

        TextField fieldOldPassword = new TextField();
        GridPane.setConstraints(fieldOldPassword,2,8);

        Button btn = new Button();
        btn.setText("Submit new password");
        GridPane.setConstraints(btn, 3,9);
        gridko.setStyle("-fx-background-color: #434343;");

        btn.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                String newPassword = fieldNewPassword.getText();
                String newPasswordAgain = fieldNewAgainPassword.getText();
                String oldPassword = fieldOldPassword.getText();
                if(newPassword.equals(newPasswordAgain) && oldPassword.length()>4 && newPassword.length()>4) {
                    System.out.println("Correct change");
                    if (communication.changePassword(oldPassword,newPassword)) {
                        primaryStage.close();
                    }
                    else {
                        System.out.println("Something went wrong");
                    }
                }
                else {
                    System.out.println("Chyba zle heslo");
                }
            }
        });

        gridko.getChildren().addAll(btn,labelNewAgainPassword,labelNewPassword,labelOldPassword,fieldNewAgainPassword,fieldNewPassword,fieldOldPassword);
        primaryStage.setScene(new Scene(gridko, 300, 250));
        primaryStage.show();
    }

    public void checkConnection2(MouseEvent mouseEvent) {
        MyTimeDate actual = new HttpGet().getTime();
        if (actual == null) {
            connectivity2.setProgress(0);
        }
        else {
            connectivity2.setProgress(1);
        }
    }
}
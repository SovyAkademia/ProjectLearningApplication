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

    @FXML
    public MenuButton menuButtonCategory;
    public MenuButton testMenuButton;
    public MenuButton MenuButtonForUser;
    public ProgressBar connectivity2;

    public static int testRunning;


    private Communication communication = new Communication();
    private ArrayList<Category> categoryList;

    public void MenuLogout(ActionEvent arg0) {
        Platform.exit();
    }

    public void performAction(ActionEvent actionEvent) {
        //you can add this method for multiple menu item and identify
        //each menu item by its id
        //MenuItem target  = (MenuItem) actionEvent.getSource();
        //System.out.println("Clicked On Item:"+target.getId());
/*
        ArrayList<Category> list = communication.getCategories().getCategories();
        this.categoryList = list;
        for (Category temp:categoryList) {
            System.out.println(temp.getCategoryName());
        }
        */
        System.out.println("here");
        MenuItem target  = (MenuItem) actionEvent.getSource();
        System.out.println("Clicked On Item:"+target.getId());
    }


    public void performAction2(ActionEvent actionEvent) {
        //you can add this method for multiple menu item and identify
        //each menu item by its id
        //MenuItem target  = (MenuItem) actionEvent.getSource();
        //System.out.println("Clicked On Item:"+target.getId());
/*
        ArrayList<Category> list = communication.getCategories().getCategories();
        this.categoryList = list;
        for (Category temp:categoryList) {
            System.out.println(temp.getCategoryName());
        }
        */
        MenuItem target  = (MenuItem) actionEvent.getSource();
        System.out.println("Clicked On Item:"+target.getId());
    }

    public void createTest(ActionEvent event, TestFinal actualTest) {
        int countOfQuestions = actualTest.getQuestions().size();
        System.out.println(countOfQuestions);

        try {
            Group root = new Group();
            Scene scene = new Scene(root, 800, 600, Color.WHITE);

            Stage primaryStage = new Stage();
            primaryStage.setFullScreen(true);

            TabPane tabPane = new TabPane();
            BorderPane mainPane = new BorderPane();

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
                lbl.prefHeight(100);
                lbl.prefWidth(300);
                myGrid.add(lbl,0,0,2,1);

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
                    String newID = (swapQuestion.getQuestionID()+" "+swapAnswer.getAnswerID());
                    newRadio.setUserData(newID);
                    newRadio.setId("ans "+(i-2)+" "+(row-2));
                    System.out.println(newRadio.getId());
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

                /*
                Label time = new Label();
                time.setStyle("-fx-text-fill: white;");
                time.setId("myCounetr");
                time.setText("ahoj");
                testRunning = 1;

                myGrid.add(time,1,6);

                RewriteThr rewriteThr = new RewriteThr();
                rewriteThr.start(time,500);
                */

                Button btnSubmitQuestion = new Button("Submit answer"); //toto tu vytvori tlacidlo prida mu ID,funkciu a zavrie scenu
                btnSubmitQuestion.setOnAction(resolveSubmit -> {
                    String checkedID = toggleGroup.getSelectedToggle().getUserData().toString();
                    tab.setStyle("-fx-background-color: GREEN;");
                    tabPane.getSelectionModel().selectNext();

                    //System.out.println(checkedID);

                    if(communication.postResult(checkedID))
                    {
                        System.out.println("sending OK");
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

                if (i == countOfQuestions)
                {

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
                    primaryStage.close();
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
package sample.Controlers;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.input.KeyCombination;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import sample.Objects.AnswerFinal;
import sample.Objects.Category;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import sample.Objects.QuestionsFinal;
import sample.Objects.TestFinal;
import sample.api.Communication;


import java.util.ArrayList;


public class MainWindowController {

    @FXML
    public MenuButton menuButtonCategory;
    public MenuButton testMenuButton;
    public MenuButton MenuButtonForUser;


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
                tab.setText("Q "+i);
                i++;
                HBox hbox = new HBox();
                mainPane.setTop(hbox);
                GridPane myGrid = new GridPane();
                hbox.getChildren().add(myGrid);

                Label lbl = new Label(swapQuestion.getQuestionText());
                myGrid.add(lbl,0,0,2,1);

                int position = 300;
                int row = 2;
                for (AnswerFinal swapAnswer:swapQuestion.getAnswers()) {
                    RadioButton newRadio = new RadioButton();
                    newRadio.setToggleGroup(toggleGroup);
                    newRadio.setText(swapAnswer.getAnswerText());
                    newRadio.setTranslateX(300);
                    newRadio.setTranslateY(position);
                    newRadio.setStyle("-fx-text-fill: white;");
                    position+=50;
                    myGrid.add(newRadio,0,row);
                    row++;
                }

                Button btnSubmitQuestion = new Button("Submit answer"); //toto tu vytvori tlacidlo prida mu ID,funkciu a zavrie scenu
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

            }

            mainPane.prefHeightProperty().bind(scene.heightProperty()); //da tabPane na celu stranu STAGU
            mainPane.prefWidthProperty().bind(scene.widthProperty());
            primaryStage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);

            root.getChildren().add(mainPane);
            primaryStage.setScene(scene);
            primaryStage.show();


        } catch (Exception e) {
            e.printStackTrace();}    }

}

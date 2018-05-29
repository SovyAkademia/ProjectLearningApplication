package sample.Controlers;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.input.KeyCombination;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import sample.Objects.Category;
import javafx.fxml.FXML;
import javafx.scene.control.*;
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

            for(int i=0;i<countOfQuestions;i++) {

                ToggleGroup toggleGroup = new ToggleGroup();

                Tab tab = new Tab();
                tab.setText("Question " + i);
                HBox hbox = new HBox();
                mainPane.setTop(hbox);

                Label lbl = new Label("This is question number "+i);

                RadioButton radio1 = new RadioButton();
                RadioButton radio2 = new RadioButton();
                RadioButton radio3 = new RadioButton();
                RadioButton radio4 = new RadioButton();
                toggleGroup.selectToggle(radio1);
                toggleGroup.selectToggle(radio2);
                toggleGroup.selectToggle(radio3);

                Button btnSubmitQuestion = new Button("Submit answer"); //toto tu vytvori tlacidlo prida mu ID,funkciu a zavrie scenu
                btnSubmitQuestion.setId("closeButton");
                mainPane.setCenter(tabPane);

                hbox.getChildren().add(lbl);
                lbl.setTranslateX(650);
                lbl.setTranslateY(250);

                hbox.getChildren().add(radio1);
                radio1.setTranslateX(300);
                radio1.setTranslateY(300);

                hbox.getChildren().add(radio2);
                radio2.setTranslateX(300);
                radio2.setTranslateY(350);

                hbox.getChildren().add(radio3);
                radio3.setTranslateX(300);
                radio3.setTranslateY(400);

                hbox.getChildren().add(radio4);
                radio4.setTranslateX(300);
                radio4.setTranslateY(450);

                hbox.getChildren().add(btnSubmitQuestion);
                btnSubmitQuestion.setTranslateX(250);
                btnSubmitQuestion.setTranslateY(500);

                tab.setContent(hbox);
                tabPane.getTabs().add(tab);

                lbl.setFont(new Font("Arial", 30));

                tab.setClosable(false);

                tabPane.setStyle("-fx-background-color: #434343;-fx-text-fill: white;");
                lbl.setStyle("-fx-text-fill: white;-fx-text-size: 25px");
                radio1.setStyle("-fx-text-fill: white;");
                radio2.setStyle("-fx-text-fill: white;");
                radio3.setStyle("-fx-text-fill: white;");
                radio4.setStyle("-fx-text-fill: white;");
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

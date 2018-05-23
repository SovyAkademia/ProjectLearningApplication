package sample.Controlers;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.KeyCombination;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import sample.Objects.Category;

import java.util.ArrayList;

public class Controller {

    public Button btnLogin;
    public TextField loginField;
    public PasswordField passwordField;
    public Label lblError;
    public Button btnSUBMIT;
    public RadioButton radioA;
    public RadioButton radioB;
    public RadioButton radioC;
    public RadioButton radioD;
    public MenuButton MenuButtonForUser;
    public MenuItem action_logout;

    private Communication communication = new Communication();
    private ArrayList<Category> categoryList;

    @FXML
    public Button closeButton;

    // <Button fx:id="closeButton" cancelButton="true" layoutX="350.0" layoutY="767.0" mnemonicParsing="false" onAction="#handleCloseButtonAction" prefWidth="100.0" text="Close" />

    public void clickLogin(ActionEvent event) {
        String email = loginField.textProperty().get();
        String password = passwordField.textProperty().get();

        if (email.length() < 1 || password.length() < 1)
            lblError.textProperty().set("Error input try again");
        else
            try {
                if (communication.authetifiaction(email,password))
                {
                    FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("../Scenes/MainWindow.fxml"));
                    Parent root = (Parent) fxmlLoader.load();
                    Stage stage = new Stage();
                    stage.setResizable(false);
                    stage.setScene(new Scene(root));

                    //stage.getStylesheets().add("path/stylesheet.css");
                    stage.setTitle("Main");

                    stage.show();
                    stage.setMaximized(true);
                    stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
                    stage.setFullScreen(true);
                    Stage primarystage = (Stage) btnLogin.getScene().getWindow();

                    primarystage.close();

                    ArrayList<Category> list = communication.getCategories().getCategories();
                    this.categoryList = list;
                    for (Category temp:categoryList) {
                        System.out.println(temp.getCategoryName());
                    }
                }
                else
                {

                }

            } catch (Exception e) {
                e.printStackTrace();
            }
    }

    public void performAction(ActionEvent actionEvent) {
        //you can add this method for multiple menu item and identify
        //each menu item by its id
        MenuItem target  = (MenuItem) actionEvent.getSource();
        System.out.println("Clicked On Item:"+target.getId());
    }

    public void start(ActionEvent event) {

        try {
            Group root = new Group();
            Scene scene = new Scene(root, 800, 600, Color.WHITE);

            Stage primaryStage = new Stage();
            primaryStage.setFullScreen(true);

            TabPane tabPane = new TabPane();
            BorderPane mainPane = new BorderPane();

            for(int i=1;i<15;i++) {

                ToggleGroup toggleGroup = new ToggleGroup();


                Tab tab = new Tab();
                tab.setText("Question " + i);
                HBox hbox = new HBox();
                mainPane.setTop(hbox);


                //tabC_hbox.setSpacing(80);
                // tabC_hbox.setPadding(new Insets(350,20, 10,10));

                Label lbl = new Label("This is question number "+i);

                RadioButton radio1 = new RadioButton();
                RadioButton radio2 = new RadioButton();
                RadioButton radio3 = new RadioButton();
                RadioButton radio4 = new RadioButton();
                toggleGroup.selectToggle(radio1);
                toggleGroup.selectToggle(radio2);
                toggleGroup.selectToggle(radio3);

//toto tu vytvori tlacidlo prida mu ID,funkciu a zavrie scenu

                Button btnSubmitQuestion = new Button("Submit answer");
                btnSubmitQuestion.setId("closeButton");
                mainPane.setCenter(tabPane);
        /*
        btnSubmitQuestion.setOnAction(event1 -> {
                    try {
                        Stage primarystage1 = (Stage) closeButton.getScene().getWindow();
                        primarystage1.close();
                        //Platform.exit();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    });
                    */
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

                // hbox.getChildren().addAll(lbl, btnSubmitQuestion);


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
            e.printStackTrace();}
    }

    public void Checkbox(ActionEvent event) {

        if (event.getSource() == radioA) {
            radioB.setSelected(false);
            radioC.setSelected(false);
            radioD.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioB) {
            radioC.setSelected(false);
            radioA.setSelected(false);
            radioD.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioC) {
            radioA.setSelected(false);
            radioB.setSelected(false);
            radioD.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioD) {
            radioB.setSelected(false);
            radioC.setSelected(false);
            radioA.setSelected(false);
            btnSUBMIT.setDisable(false);
        }
    }

    public void MenuLogout(ActionEvent arg0) {
        Platform.exit();
    }

    public void clickTests(ActionEvent event) {
        try {
            /*HttpGet httpRequest = new HttpGet();
            categories = httpRequest.SimplegetCategories("http://akademiasovy.ddns.net:3050/desktop/getCategories");*/
            FXMLLoader fxmlLoader = new FXMLLoader(this.getClass().getResource("../Scenes/TestStage.fxml"));
            Parent root = (Parent) fxmlLoader.load();

            Stage stage = new Stage();
            stage.setScene(new Scene(root));
            stage.setTitle("Testing");

            stage.show();
            stage.setMaximized(true);
            stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
            stage.setFullScreen(true);
        } catch (Exception var5) {
            var5.printStackTrace();
        }
    }
}
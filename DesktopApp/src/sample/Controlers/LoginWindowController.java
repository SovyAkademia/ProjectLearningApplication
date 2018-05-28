package sample.Controlers;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
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

public class LoginWindowController extends MainWindowController{

    public Button btnLogin;
    public TextField loginField;
    public PasswordField passwordField;
    public Label lblError;

    @FXML
    public MenuButton menuButtonCategory;

    private Communication communication = new Communication();
    private ArrayList<Category> categoryList;

    @FXML
    public Button closeButton;

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

                    stage.setTitle("Main");

                    stage.show();
                    //stage.setMaximized(true);
                    //stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
                    //stage.setFullScreen(true);
                    Stage primarystage = (Stage) btnLogin.getScene().getWindow();

                    primarystage.close();

                    ArrayList<Category> list = communication.getCategories().getCategories();
                    this.categoryList = list;

                    menuButtonCategory = (MenuButton) root.getChildrenUnmodifiable().filtered(node -> node.getId().equals("menuButtonCategory")).get(0);
                    testMenuButton = (MenuButton) root.getChildrenUnmodifiable().filtered(node -> node.getId().equals("testMenuButton")).get(0);
                    int i=0;


                    for (Category temp:categoryList) {

                        System.out.println(temp.getCategoryName());
                        testMenuButton.getItems().add(new MenuItem(temp.getCategoryName()));
                    }
                }
                else
                {

                }

            } catch (Exception e) {
                e.printStackTrace();
            }
    }


}
package sample.Controlers;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;
import sample.Objects.Category;
import sample.Objects.TestDetails;
import sample.api.Communication;

import java.util.ArrayList;
import java.util.List;

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
                if (communication.authenticate(email,password))
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
                        MenuItem item = new MenuItem(temp.getCategoryName());
                        item.setOnAction(eventClicked -> {
                            String currentItem = item.getText();
                            testMenuButton.getItems().clear();
                            List<TestDetails> listOfTests = communication.getTestsDetails(currentItem).getTests();
                            if(listOfTests != null) {
                                for (TestDetails detail : listOfTests) {
                                    testMenuButton.getItems().add(new MenuItem(detail.getTestName()));
                                }
                            }
                        });
                        menuButtonCategory.getItems().add(item);
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
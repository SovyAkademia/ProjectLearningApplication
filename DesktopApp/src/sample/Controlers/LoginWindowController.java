package sample.Controlers;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.KeyCombination;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import sample.Objects.*;
import sample.api.Communication;
import sample.api.HttpGet;

import java.util.ArrayList;
import java.util.List;

public class LoginWindowController extends MainWindowController{

    public Button btnLogin;
    public TextField loginField;
    public PasswordField passwordField;
    public Label lblError;

    private static TestFinal actualTest;

    @FXML
    public MenuButton menuButtonCategory;
    public ProgressBar connectivity;

    private Communication communication = new Communication();
    private ArrayList<Category> categoryList;

    @FXML
    public Button closeButton;

    public void clickLogin(ActionEvent event) {
        try {
            String email = loginField.textProperty().get();
            String password = passwordField.textProperty().get();

            int actual = new HttpGet().tryTime();
            if (actual == 0) {
                connectivity.setProgress(0);
                lblError.textProperty().set("Server Connectivity Error");
                return;
            }
            else {
                connectivity.setProgress(1);
                lblError.textProperty().set("");
            }

            if (communication.authenticate(email,password))
            {
                FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("../Scenes/MainWindow.fxml"));
                Parent root = (Parent) fxmlLoader.load();
                Stage stage = new Stage();
                stage.setResizable(false);
                stage.setScene(new Scene(root));

                stage.setTitle("Main");

                stage.show();
                stage.setMaximized(true);
                stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
                stage.setFullScreen(true);
                Stage primarystage = (Stage) btnLogin.getScene().getWindow();
                primarystage.close();

                ArrayList<Category> list = communication.getCategories().getCategories();
                this.categoryList = list;

                menuButtonCategory = (MenuButton) root.getChildrenUnmodifiable().filtered(node -> node.getId().equals("menuButtonCategory")).get(0);
                testMenuButton = (MenuButton) root.getChildrenUnmodifiable().filtered(node -> node.getId().equals("testMenuButton")).get(0);

                for (Category temp:categoryList) {
                    System.out.println(temp.getCategoryName());
                    MenuItem item = new MenuItem(temp.getCategoryName());
                    item.setOnAction(eventClicked -> {
                        String currentItem = item.getText();
                        menuButtonCategory.setText(currentItem);
                        testMenuButton.getItems().clear();
                        List<TestDetails> listOfTests = communication.getTestsDetails(currentItem).getTests();
                        if(listOfTests != null) {
                            for (TestDetails detail : listOfTests) {
                                MenuItem swap = new MenuItem(detail.getTestName());
                                //String Id = (detail.getID()).toString();
                                swap.setId(detail.getID());
                                System.out.println(swap.getId());
                                swap.setOnAction(eventClicked1 -> {
                                    String itemId = swap.getId();
                                    TestPrototype newTest = communication.getTest(itemId);
                                    actualTest = new TestFinal(newTest);
                                    //System.out.println("DOSTAL SOM TEN DRBNUTY TEST");
                                    //actualTest.printTest();
                                    new MainWindowController().createTest(null,actualTest);
                                });
                                testMenuButton.getItems().add(swap);
                            }
                        }
                    });
                    menuButtonCategory.getItems().add(item);
                }
            }
            else
            {
                lblError.textProperty().set("Wrong email or password!!!Try again!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void checkStatus(MouseEvent mouseEvent) {
        MyTimeDate actual = new HttpGet().getTime();
        if (actual == null) {
            connectivity.setProgress(0);
        }
        else {
            connectivity.setProgress(1);
        }
    }
}
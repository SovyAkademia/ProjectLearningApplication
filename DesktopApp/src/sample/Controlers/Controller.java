package sample.Controlers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.KeyCombination;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;



import javax.swing.*;
import java.awt.event.ActionListener;
import java.util.ArrayList;

public class Controller {

    public Button btnLogin;
    public TextField loginField;
    public PasswordField passwordField;
    public Label lblError;
    public Button btnLogout;
    public Button btnTests;
    public Label lblCHECK;
    public Button btnSUBMIT;
    public RadioButton radioA;
    public RadioButton radioB;
    public RadioButton radioC;
    public RadioButton radioD;
    public TabPane TabQuestion;
    public RadioButton radioChooseTest1;
    public RadioButton radioChooseTest2;
    public RadioButton radioChooseTest3;
    public RadioButton radioChooseTest4;
    public RadioButton radioChooseTest5;
    public ChoiceBox Testy;
    public MenuButton menuButton;


    public void clickLogin(ActionEvent event) {
        String login = loginField.textProperty().get();
        String password = passwordField.textProperty().get();

        if (login.length() < 1 || password.length() < 1)
            lblError.textProperty().set("Error input try again");
        else
            try {
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
            } catch (Exception e) {
                e.printStackTrace();
            }
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

    public void CheckTest(ActionEvent event) {

        if (event.getSource() == radioChooseTest1) {
            radioChooseTest2.setSelected(false);
            radioChooseTest3.setSelected(false);
            radioChooseTest4.setSelected(false);
            radioChooseTest5.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioChooseTest2) {
            radioChooseTest1.setSelected(false);
            radioChooseTest3.setSelected(false);
            radioChooseTest4.setSelected(false);
            radioChooseTest5.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioChooseTest3) {
            radioChooseTest1.setSelected(false);
            radioChooseTest2.setSelected(false);
            radioChooseTest4.setSelected(false);
            radioChooseTest5.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioChooseTest4) {
            radioChooseTest1.setSelected(false);
            radioChooseTest3.setSelected(false);
            radioChooseTest2.setSelected(false);
            radioChooseTest5.setSelected(false);
            btnSUBMIT.setDisable(false);
        } else if (event.getSource() == radioChooseTest5) {
            radioChooseTest1.setSelected(false);
            radioChooseTest3.setSelected(false);
            radioChooseTest4.setSelected(false);
            radioChooseTest2.setSelected(false);
            btnSUBMIT.setDisable(false);
        }

    }

    public void categoryChoosed(ActionEvent event) {
        btnSUBMIT.setDisable(false);


    }

    public void btnSUBMIT(ActionEvent event) {
        try {
            Stage primarystage = (Stage) btnSUBMIT.getScene().getWindow();
            primarystage.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public void MenuLogout(ActionEvent event) {
        try {
            Stage primarystage = (Stage) btnLogout.getScene().getWindow();
            //Stage primarystage = (Stage) MenuLOGOUT.getScene().getWindow();
            primarystage.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void clickTests(ActionEvent event) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(this.getClass().getResource("../Scenes/TestStage.fxml"));
            Parent root = (Parent) fxmlLoader.load();

            Stage stage = new Stage();
            stage.setScene(new Scene(root));
            stage.setTitle("Testing");


/*
            choice.getItems().add("Apple");
            choice.getItems().add("Cock");
            choice.getItems().addAll("Boris","BERE","Dnuka","valibuka");
            */

            stage.show();
            stage.setMaximized(true);
            stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
            stage.setFullScreen(true);
        } catch (Exception var5) {
            var5.printStackTrace();
        }

    }


    public void chooseTest(ActionEvent event) {

        TabQuestion.setVisible(true);
        Integer i;
        for (i = 1; i < 10; i++) {
            TabQuestion.getTabs().add(new Tab("Tab " + i));
        }
    }

    public void ScrollChoiceBox(ActionEvent event) {

        Testy.setItems(FXCollections.observableArrayList("One", "Two", "Three"));

    }
}

/*
    public void TestSubmit(ActionEvent event) {
        boolean a = checkA.isSelected();
        boolean b = checkB.isSelected();
        boolean c = checkC.isSelected();
        boolean d = checkD.isSelected();
        if (a == true && b == false && c == false && d == false) {
            try {
                Stage primarystage = (Stage) btnSUBMIT.getScene().getWindow();
                //Stage primarystage = (Stage) MenuLOGOUT.getScene().getWindow();
                primarystage.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            lblCHECK.textProperty().set("Error");
        }


    }
*/


package sample;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.*;

import javafx.stage.Stage;

public class Main extends Application {
    Scene scene;

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("Scenes/sample.fxml"));
        primaryStage.setTitle("Login");
        primaryStage.setScene(new Scene(root, 708, 571));
        //scene.getStylesheets().add("mainClass.css");

        //primaryStage.initStyle(StageStyle.UNDECORATED);
        primaryStage.show();

    }


    public static void main(String[] args) {
        launch(args);
    }
}

package sample.threads;

import javafx.scene.control.Label;
import sample.Objects.MyTimeDate;
import sample.api.HttpGet;

import static sample.Controlers.MainWindowController.testRunning;

public class RewriteThr implements Runnable {
    private Thread t;
    private String threadName;
    private Label myLable;
    private int timeofTest;

    private HttpGet httpGet = new HttpGet();

    public void run() {
        while (testRunning == 1 && timeofTest > 0)
        {
            MyTimeDate myTimeDate = httpGet.getTime();
            if (myTimeDate == null)
            {
                break;
            }
            String swap = String.valueOf(myTimeDate.getMinute())+String.valueOf(myTimeDate.getSecond());
            this.myLable.setText(swap);
            System.out.println(swap);
            try {
                Thread.sleep(1250);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void start (Label myLable, int timeofTest) {
        this.myLable = myLable;
        this.timeofTest = timeofTest;
        threadName = "counterThread";
        System.out.println("Starting " +  threadName );
        if (t == null) {
            t = new Thread (this, threadName);
            t.start ();
        }
    }
}

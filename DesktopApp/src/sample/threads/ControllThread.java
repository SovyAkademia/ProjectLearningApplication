package sample.threads;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ControllThread extends Thread{
    private String threadName;
    private Thread t;

    public void run() {
        System.out.println("Deamon Started");
        try {
            String[] argS = {""};
            String swap = getUpdate();
            if (swap != null)
            {

            }
            else
            {

            }
            Thread.sleep(2500);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Deamon Stopped");
    }

    @Override
    public synchronized void start() {
        if (t == null)
        {
            t = new Thread (this, threadName);
            t.setDaemon(true);
            t.start ();
        }
    }

    public ControllThread(String name) {
        super(name);
        this.threadName = name;
    }

    public String getUpdate() throws Exception {
        StringBuilder result = new StringBuilder();
        URL url = new URL("akademiasovy.ddns.net:3301/update");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        return result.toString();
    }
}

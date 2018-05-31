package sample.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import java.io.IOException;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import sample.Objects.MyConnectivity;
import sample.Objects.MyTimeDate;

public class HttpGet {

    public String getHTML(String urlToRead) throws Exception {
        StringBuilder result = new StringBuilder();
        URL url = new URL(urlToRead);
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

    public String getCategories() throws Exception {
        StringBuilder result = new StringBuilder();
        URL url = new URL("akademiasovy.ddns.net:3301/learn/categories");
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

    public String Simpleget(String url)
    {
        String result = "";
        try {
            if (this.tryTime() == 0 ) {
                return null;
            }
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            Response response = client.newCall(request).execute();
            result = response.body().string();
            if (response.code() != 200)
            {
                return null;
            }
            //System.out.println(response.code());
        }
        catch (ConnectException e)
        {
            e.printStackTrace();
            return null;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return result;
    }

    public String simpleTry(String url)
    {
        String result = "";
        try {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            Response response = client.newCall(request).execute();
            result = response.body().string();
            if (response.code() != 200)
            {
                return null;
            }
            //System.out.println(response.code());
        }
        catch (ConnectException e)
        {
            e.printStackTrace();
            return null;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return result;
    }

    public MyTimeDate getTime(){
        String url = "http://akademiasovy.ddns.net:3050"+"/desktop/getTime";
        try {
            String response = this.simpleTry(url);
            if (response == null) {
                return null;
            }
            Gson gson = new Gson();
            MyConnectivity response2 = gson.fromJson(response, MyConnectivity.class);
            MyTimeDate result = new MyTimeDate(response2.getDatetime());
            return result;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    public int tryTime(){
        String url = "http://akademiasovy.ddns.net:3050"+"/desktop/getTime";
        try {
            String response = this.simpleTry(url);
            if (response == null) {
                return 0;
            }
            Gson gson = new Gson();
            MyConnectivity response2 = gson.fromJson(response, MyConnectivity.class);
            MyTimeDate result = new MyTimeDate(response2.getDatetime());
            return 1;
        } catch (Exception e)
        {
            e.printStackTrace();
            return 0;
        }
    }


}

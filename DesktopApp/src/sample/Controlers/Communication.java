package sample.Controlers;

import com.google.gson.Gson;
import sample.Objects.*;
import sample.api.HttpGet;
import sample.api.HttpPost;

import java.io.IOException;

public class Communication {

    private String token;
    private int studentId;

    private final String baseUrl = "http://akademiasovy.ddns.net:3050";

    public boolean authetifiaction(String email, String password)
    {
        String json = "{\n\t\"email\": \""+email+"\",\n\t\"password\":\""+password+"\"}";
        HttpPost httpPost = new HttpPost();
        String url = baseUrl+"/desktop/auth/login";
        String response = "";
        try {
            response = httpPost.post(url,json);
            if (response == null) {

                return false;
            }

            Gson gson = new Gson();
            AuthResponse authResponse = gson.fromJson(response,AuthResponse.class);
            this.token = authResponse.getToken();
            this.studentId = authResponse.getStudentId();
            System.out.println(this.token);
            return true;

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    public Categories getCategories()
    {
        Categories swap = new Categories();
        try {
            String response = new HttpGet().Simpleget(this.baseUrl+"/desktop/getcategories");
            if (response == null) {

                return null;
            }
            Gson gson = new Gson();
            swap = gson.fromJson(response,Categories.class);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return swap;
    }

    public Tests getTestsDetails(String clicked){
        Tests swap = new Tests();
        try {
            String response = new HttpGet().Simpleget(this.baseUrl+"/desktop/getTests/"+clicked);
            if (response == null) {

                return null;
            }
            Gson gson = new Gson();
            swap = gson.fromJson(response,Tests.class);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return swap;
    }

    public Test getTest(int testID){
        Test swap = new Test();
        try {
            String json = "{\n\t\"testId\":\""+testID+"\"," +
                    "\n\t\"token\":\""+this.token+"\"\n}";

            String url = baseUrl+"/desktop/getTest";

            String response = new HttpPost().post(url,json);
            if (response == null) {

                return null;
            }
            Gson gson = new Gson();
            swap = gson.fromJson(response,Test.class);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return swap;
    }
}

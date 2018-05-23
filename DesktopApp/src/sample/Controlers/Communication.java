package sample.Controlers;

import com.google.gson.Gson;
import sample.Objects.AuthResponse;
import sample.Objects.Categories;
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
            String response = new HttpGet().SimplegetCategories(this.baseUrl+"/desktop/getcategories");
            Gson gson = new Gson();
            swap = gson.fromJson(response,Categories.class);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return swap;
    }
}

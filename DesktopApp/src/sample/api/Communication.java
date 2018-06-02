package sample.api;

import com.google.gson.Gson;
import sample.Objects.*;
import java.io.IOException;

public class Communication {

    private static String token;
    private static int studentId;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    private final String baseUrl = "http://akademiasovy.ddns.net:3050";

    public boolean authenticate(String email, String password)
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

    public TestPrototype getTest(String testID){
        TestPrototype swap = new TestPrototype();
        try {
            String json = "{\n\t\"testId\":\""+testID+"\"," +
                    "\n\t\"studentID\":\""+studentId+"\"," +
                    "\n\t\"token\":\""+this.token+"\"\n}";

            String url = baseUrl+"/desktop/getTest";

            System.out.println(json);

            String response = new HttpPost().post(url,json);
            if (response == null) {

                return null;
            }
            Gson gson = new Gson();
            swap = gson.fromJson(response,TestPrototype.class);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return swap;
    }

    public int postResult(String jsonBase){
        String[] base = jsonBase.split(" ");
        if (base.length <= 3)
        {
            return 0;
        }
        String json = "{" +
                "\n\t"+"\"studentID\":" +"\""+base[2]+"\","+
                "\n\t"+"\"questionID\":" +"\""+base[0]+"\","+
                "\n\t"+"\"answerID\":" +"\""+base[1]+"\","+
                "\n\t"+"\"resultID\":" +"\""+base[3]+"\","+
                "\n\t"+"\"token\":" +"\""+token+"\""+
                "}";
        //System.out.println(json);
        try {
            String url = baseUrl+"/desktop/handleAnswer";
            String response = new HttpPost().post(url,json);
            if (response == null) {
                return 0;
            }
            if (response.matches("correct"))
            {
                return 2;
            }
            else {
                return 1;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return 0;
    }

    public boolean changePassword(String oldPass, String newPass){
        String url = baseUrl+"desktop/changePassword";
        String json = "";
        String response = "";
        json = "{" +
                "\n\t"+"\"studentID\":" +"\""+studentId+"\","+
                "\n\t"+"\"oldPassword\":" +"\""+oldPass+"\","+
                "\n\t"+"\"newPassword\":" +"\""+newPass+"\","+
                "\n\t"+"\"token\":" +"\""+token+"\""+
                "}";
        try {
            response = new HttpPost().post(url,json);
            if (response == null) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return false;
    }


}
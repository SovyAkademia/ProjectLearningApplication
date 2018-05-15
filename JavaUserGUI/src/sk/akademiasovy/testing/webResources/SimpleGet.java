package sk.akademiasovy.testing.webResources;


import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class SimpleGet {

    private OkHttpClient client = new OkHttpClient();

    private String run(String url) throws IOException {
        Request request = new Request.Builder()
                .url(url)
                .build();

        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }

    private String httpGet()
    {
        SimpleGet example = new SimpleGet();
        String response = null;
        try {
            response = example.run("https://raw.github.com/square/okhttp/master/README.md");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response;
    }

}

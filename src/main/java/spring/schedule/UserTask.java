package spring.schedule;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import spring.model.User;
import spring.service.UserService;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;

@Component
public class UserTask {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Scheduled(fixedDelay = 1000*60*60*24)
    public void downloadUserTask () {
        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/users");
            //url.openConnection();

            ObjectMapper objectMapper = new ObjectMapper();
            ArrayList<User> users = objectMapper.readValue(url, new TypeReference<ArrayList<User>>() {});
            for (User user : users) {
                user.setId(null);
                this.userService.add(user);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

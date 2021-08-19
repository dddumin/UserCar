package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.model.User;
import spring.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(consumes = "application/json")
    public void addUser(@RequestBody User user) {
        this.userService.add(user);
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public User getUserById(@PathVariable Long id) {
        return this.userService.getById(id);
    }

    @GetMapping(produces = "application/json")
    public List<User> getAll() {
        return this.userService.getAll();
    }

    @DeleteMapping(path = "/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userService.delete(id);
    }

    @PutMapping(consumes = "application/json")
    public void updateUser(@RequestBody User user) {
        this.userService.update(user);
    }
}

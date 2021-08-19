package spring.service;

import spring.model.User;

import java.util.List;

public interface UserService {
    void add(User user);
    User getById(Long id);
    void delete(Long id);
    void update(User user);
    List<User> getAll();
}

package spring.service;

import spring.model.Car;
import spring.model.User;

import java.util.List;

public interface CarService {
    void add(Car car);
    void delete(Long id);
    void update(Car car);
    List<Car> getAll();
}

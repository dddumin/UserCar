package spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.model.Car;
import spring.repository.CarRepository;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private CarRepository carRepository;

    @Autowired
    public void setCarRepository(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void add(Car car) {
        this.carRepository.save(car);
    }

    @Override
    public void delete(Long id) {
        this.carRepository.deleteById(id);
    }

    @Override
    public void update(Car car) {
        this.carRepository.save(car);
    }

    @Override
    public List<Car> getAll() {
        return this.carRepository.findAll();
    }
}

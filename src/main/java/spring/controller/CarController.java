package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.model.Car;
import spring.service.CarService;

import java.util.List;

@RestController
@RequestMapping("/car")
public class CarController {
    private CarService carService;

     @Autowired
    public void setCarService(CarService carService) {
        this.carService = carService;
    }

    @PostMapping(consumes = "application/json")
    public void addCar(@RequestBody Car car) {
         this.carService.add(car);
    }

    @GetMapping(produces = "application/json")
    public List<Car> getAll() {
         return this.carService.getAll();
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable Long id) {
         this.carService.delete(id);
    }

    @PutMapping(consumes = "application/json")
    public void updateCar(@RequestBody Car car) {
         this.carService.update(car);
    }
}

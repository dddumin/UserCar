package spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
}

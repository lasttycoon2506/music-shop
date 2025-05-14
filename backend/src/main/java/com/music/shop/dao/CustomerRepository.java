package com.music.shop.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.music.shop.entity.Customer;

@CrossOrigin("http://localhost:4200")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(@Param("email") String email);

    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.orders o WHERE c.email = :email ORDER BY o.dateCreated ASC")
    Optional<Customer> findByEmailSortedByDateCreated(@Param("email") String email);
}

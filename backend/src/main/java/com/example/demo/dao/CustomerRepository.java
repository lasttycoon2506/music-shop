package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Address;
import com.example.demo.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);

    @Modifying
    @Query("update Customer c set c.firstName = ?1, c.lastName = ?2, c.email =?3, c.billingAddress = ?4, c.shippingAddress = ?5 where c.email=?3")
    int setUserInfoById(String firstName, String lastName, String email, Address billingAddress,
            Address shippingAddress);

}

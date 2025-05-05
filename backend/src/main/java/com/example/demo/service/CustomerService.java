package com.example.demo.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.CustomerDto;
import com.example.demo.entity.Customer;

@Service
public class CustomerService {
    public CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<String> createCustomer(CustomerDto customerDto) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customerDto.getEmail());

        if (existingCustomer.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Customer already exists!");
        } else {
            Customer customer = new Customer();

            customer.setFirstName(customerDto.getFirstName());
            customer.setLastName(customerDto.getLastName());
            customer.setEmail(customerDto.getEmail());
            customer.setBillingAddress(customerDto.getBillingAddress());
            customer.setShippingAddress(customerDto.getShippingAddress());

            try {
                customerRepository.save(customer);
                return ResponseEntity.status(HttpStatus.CREATED).body("Customer created successfully!");

            } catch (Exception e) {
                System.err.println(e.getMessage() + "CAUSE: " + e.getCause());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error creating customer: " + e.getMessage() + " CAUSE: " + e.getCause());
            }
        }
    }

    public int editCustomer(CustomerDto customerDto, Customer existingCustomer) {
        int editSuccess = 0;

        existingCustomer.setFirstName(customerDto.getFirstName());
        existingCustomer.setLastName(customerDto.getLastName());
        existingCustomer.setEmail(customerDto.getEmail());
        existingCustomer.setBillingAddress(customerDto.getBillingAddress());
        existingCustomer.setShippingAddress(customerDto.getShippingAddress());

        try {
            customerRepository.save(existingCustomer);
            editSuccess = 1;

        } catch (Exception e) {
            // Return a 500 Internal Server Error with the exception message
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            // .body("Error creating customer: " + e.getMessage());
        }

        return editSuccess;
    }

}

package com.music.shop.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.music.shop.dao.CustomerRepository;
import com.music.shop.dto.CustomerDto;
import com.music.shop.entity.Customer;

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

    public ResponseEntity<String> editCustomer(CustomerDto customerDto) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customerDto.getEmail());

        if (existingCustomer.isPresent()) {
            Customer editedCustomer = existingCustomer.get();
            editedCustomer.setFirstName(customerDto.getFirstName());
            editedCustomer.setLastName(customerDto.getLastName());
            editedCustomer.setEmail(editedCustomer.getEmail());
            editedCustomer.setBillingAddress(
                    customerDto.getBillingAddress() != null ? customerDto.getBillingAddress() : null);
            editedCustomer.setShippingAddress(
                    customerDto.getShippingAddress() != null ? customerDto.getShippingAddress() : null);

            try {
                customerRepository.save(editedCustomer);
                return ResponseEntity.status(HttpStatus.OK).body("Customer edited successfully!");

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error editing customer: " + e.getMessage() + "CAUSE: " + e.getCause());
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("customer DNE!");
        }

    }

}

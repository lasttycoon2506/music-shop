package com.example.demo.service;

import java.util.Optional;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.CustomerDto;
import com.example.demo.entity.Customer;

public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void createCustomer(CustomerDto customer) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customer.getEmail());

        if (existingCustomer.isPresent()) {

        }
    }

    public void editCustomer(CustomerDto customer) {

    }

}

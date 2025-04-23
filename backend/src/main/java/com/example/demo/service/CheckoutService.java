package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;

@Service
public class CheckoutService {
    private CustomerRepository customerRepository;

    public CheckoutService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
}

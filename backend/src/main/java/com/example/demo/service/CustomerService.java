package com.example.demo.service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.CustomerDto;
import com.example.demo.entity.Customer;

public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void editCustomer(CustomerDto customerDto) {

    }

}

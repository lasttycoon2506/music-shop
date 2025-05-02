package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.CustomerDto;
import com.example.demo.entity.Customer;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public int createCustomer(CustomerDto customerDto) {
        int createSuccess = 0;
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customerDto.getEmail());

        if (!existingCustomer.isPresent()) {
            Customer customer = new Customer();

            customer.setFirstName(customerDto.getFirstName());
            customer.setLastName(customerDto.getLastName());
            customer.setEmail(customerDto.getEmail());
            customer.setBillingAddress(customerDto.getBillingAddress());
            customer.setShippingAddress(customerDto.getShippingAddress());

            try {
                customerRepository.save(customer);
                createSuccess = 1;

            } catch (Exception e) {
                System.err.println(e.getMessage() + " cause: " + e.getCause());
                throw new Error(e.getMessage(), e.getCause());
            }

        } else {
            createSuccess = editCustomer(customerDto, existingCustomer.get());
        }
        return createSuccess;
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
            System.err.println(e.getMessage() + " cause: " + e.getCause());
            throw new Error(e.getMessage(), e.getCause());
        }
        return editSuccess;
    }

}

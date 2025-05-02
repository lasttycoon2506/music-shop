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
        int createResult = 0;
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customerDto.getEmail());

        if (!existingCustomer.isPresent()) {
            Customer customer = new Customer();

            customer.setFirstName(customerDto.getFirstName());
            customer.setLastName(customerDto.getLastName());
            customer.setEmail(customerDto.getEmail());
            customer.setBillingAddress(customerDto.getBillingAddress());
            customer.setShippingAddress(customerDto.getShippingAddress());

            Customer savedCustomer = customerRepository.save(customer);

            if (savedCustomer != null) {
                createResult = 1;
            }
        }
        return createResult;
    }

    // public void editCustomer(CustomerDto customer) {

    // }

}

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
        } else {
            createResult = editCustomer(customerDto, existingCustomer.get());
        }
        return createResult;
    }

    public int editCustomer(CustomerDto customerDto, Customer existingCustomer) {
        existingCustomer.setFirstName(customerDto.getFirstName());
        existingCustomer.setLastName(customerDto.getLastName());
        existingCustomer.setEmail(customerDto.getEmail());
        existingCustomer.setBillingAddress(customerDto.getBillingAddress());
        existingCustomer.setShippingAddress(customerDto.getShippingAddress());

        Customer editedCustomer = customerRepository.save(existingCustomer);

        if (editedCustomer.equals(null)) {
            return 0;
        }
        return 1;
    }

}

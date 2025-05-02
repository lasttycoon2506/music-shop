package com.example.demo.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CustomerDto;
import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/get")
    public Optional<Customer> getCustomer(@RequestParam("email") String email) {
        return customerService.customerRepository.findByEmail(email);
    }

    @PostMapping("/create")
    public int createCustomer(@RequestBody CustomerDto customer) {
        return customerService.createCustomer(customer);
    }

    // @PutMapping("/edit")
    // public PurchaseResponseDto editCustomer(@RequestBody CustomerDto customer) {

    // return customerService.editCustomer(customer);
    // }
}

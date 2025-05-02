package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CustomerDto;
import com.example.demo.dto.PurchaseResponseDto;
import com.example.demo.service.CheckoutService;
import com.example.demo.service.CustomerService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/create")
    public void createCustomer(@RequestBody CustomerDto customer) {

        return customerService.createCustomer(customer);
    }

    // @PutMapping("/edit")
    // public PurchaseResponseDto editCustomer(@RequestBody CustomerDto customer) {

    // return customerService.editCustomer(customer);
    // }
}
package com.music.shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.music.shop.dto.CustomerDto;
import com.music.shop.service.CustomerService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCustomer(@RequestBody CustomerDto customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editCustomer(@RequestBody CustomerDto customer) {
        return customerService.editCustomer(customer);
    }
}

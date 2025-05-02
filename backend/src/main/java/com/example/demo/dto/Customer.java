package com.example.demo.dto;

import com.example.demo.entity.Address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {
    private String firstName;

    private String lastName;

    private String email;

    private Address shippingAddress;

    private Address billingAddress;
}

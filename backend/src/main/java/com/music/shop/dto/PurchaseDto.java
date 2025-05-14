package com.music.shop.dto;

import java.util.Set;

import com.music.shop.entity.Address;
import com.music.shop.entity.Customer;
import com.music.shop.entity.Order;
import com.music.shop.entity.OrderItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseDto {
    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}

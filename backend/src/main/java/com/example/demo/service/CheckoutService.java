package com.example.demo.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.PurchaseDto;
import com.example.demo.dto.PurchaseResponseDto;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;

import jakarta.transaction.Transactional;

@Service
public class CheckoutService {
    private CustomerRepository customerRepository;

    public CheckoutService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public PurchaseResponseDto PlaceOrder(PurchaseDto purchase) {
        Order order = purchase.getOrder();

        String trackingNumber = generateOrderTrackingNumber();
        order.setTrackingNumber(trackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.addItem(item));

        Customer customer = purchase.getCustomer();
        customer.setBillingAddress(purchase.getBillingAddress());
        customer.setShippingAddress(purchase.getShippingAddress());
        customer.addOrder(order);
        customerRepository.save(customer);

        return new PurchaseResponseDto(trackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}

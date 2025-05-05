package com.example.demo.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.PurchaseDto;
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
    public ResponseEntity<String> placeOrder(PurchaseDto purchase) {
        Order order = purchase.getOrder();

        String trackingNumber = generateOrderTrackingNumber();
        order.setTrackingNumber(trackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.addItem(item));

        Customer customer = purchase.getCustomer();
        customer.setBillingAddress(purchase.getBillingAddress());
        customer.setShippingAddress(purchase.getShippingAddress());
        customer.addOrder(order);

        try {
            customerRepository.save(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(trackingNumber);

        } catch (Exception e) {
            System.err.println(e.getMessage() + " CAUSE:  " + e.getCause());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating order: " + e.getMessage() + "CAUSE: " + e.getCause());
        }

    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}

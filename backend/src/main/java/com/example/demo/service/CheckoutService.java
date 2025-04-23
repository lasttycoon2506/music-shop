package com.example.demo.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
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
    public PurchaseResponse PlaceOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        String trackingNumber = generateOrderTrackingNumber();
        Set<OrderItem> orderItems = purchase.getOrderItems();
        Customer customer = purchase.getCustomer();

        order.setTrackingNumber(trackingNumber);
        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());
        orderItems.forEach(item -> order.addItem(item));
        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse(trackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}

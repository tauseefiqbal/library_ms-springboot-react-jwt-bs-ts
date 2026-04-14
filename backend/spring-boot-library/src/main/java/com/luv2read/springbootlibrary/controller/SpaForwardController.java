package com.luv2read.springbootlibrary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Forwards client-side SPA routes to index.html so React Router handles them.
 * Only needed when frontend is served from the same Spring Boot container.
 */
@Controller
public class SpaForwardController {

    @GetMapping({
        "/home", "/search", "/login", "/register",
        "/shelf", "/messages", "/admin", "/create-admin",
        "/reviewlist/{id}", "/checkout/{id}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}

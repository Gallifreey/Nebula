package com.nebula.nebulagateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NebulaGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(NebulaGatewayApplication.class, args);
    }

}

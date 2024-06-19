package com.nebula.nebularegister;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class NebulaRegisterApplication {

    public static void main(String[] args) {
        SpringApplication.run(NebulaRegisterApplication.class, args);
    }

}

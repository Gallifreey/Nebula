package com.nebula.nebulaprovider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NebulaProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(NebulaProviderApplication.class, args);
    }

}

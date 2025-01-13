package com.nebula.nebulaprovider.config;

import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MinioConfig {
    private static final String END_POINT = "http://192.168.10.1:9000";
    private static final String AK = "minioadmin";
    private static final String SK = "minioadmin";

    @Bean
    public MinioClient minioClient() {
        System.out.println("Configuration MINIO");
        return MinioClient.builder()
                .endpoint(END_POINT)
                .credentials(AK, SK)
                .build();
    }
}

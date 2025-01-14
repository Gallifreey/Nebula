package com.nebula.nebulaprovider.utils;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;

import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

public class Minio {
    private static final String BUCKET_NAME = "template";

    public static List<File> unzipInputStream(MinioClient minioClient, InputStream zipInputStream) {
        List<File> fileList = new ArrayList<>();
        try (ZipArchiveInputStream zip = new ZipArchiveInputStream(zipInputStream)) {
            ZipArchiveEntry zipEntry;
            while ((zipEntry = zip.getNextZipEntry()) != null) {
                String fileName_zip = zipEntry.getName();
                System.out.println(fileName_zip);
                if (fileName_zip.endsWith("/")) {
                } else {
                    upload(minioClient, zip, fileName_zip, zipEntry.getSize());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileList;
    }

    // 单独列出方法获取目录下的图片
    public static List<File> listAll(File parent) {
        List<File> fileList = new ArrayList<>();
        MyFilter myFilter = new MyFilter();
        File[] children = parent.listFiles(myFilter);
        if(children != null){
            for (int i = 0; i < children.length; i++) {
                // 如果子文件是个文件夹，则递归调用
                if (!children[i].isFile()) {
                    listAll(children[i]);
                } else {
                    fileList.add(children[i]);
                }
            }
        }
        return fileList;
    }

    //定义文件过滤器
    static class MyFilter implements FilenameFilter {
        @Override
        public boolean accept(File dir, String name) {
            return true;
        }
    }

    static void upload(MinioClient minioClient, InputStream stream, String path, long objSize) throws IOException, ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        minioClient.putObject(
                PutObjectArgs.builder().bucket(BUCKET_NAME).object(path).stream(stream, objSize, -1)
                        .build());
    }

    public static void createNewFile(MinioClient minioClient, String path) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        byte[] emptyContent = new byte[0];
        minioClient.putObject(
                PutObjectArgs.builder().bucket(BUCKET_NAME).object(path).stream(
                                new ByteArrayInputStream(emptyContent), 0, -1)
                        .build());
    }
}

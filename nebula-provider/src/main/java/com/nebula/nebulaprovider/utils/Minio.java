package com.nebula.nebulaprovider.utils;

import com.nebula.nebulaprovider.entity.dataset.Data;
import com.nebula.nebulaprovider.entity.dataset.DataSet;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageDataShort;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import io.minio.http.Method;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;

import javax.validation.constraints.Min;
import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static com.nebula.nebulaprovider.utils.Constant.SUFFIX_TABLE;

public class Minio {


    private static final String BUCKET_NAME = "template";

    private static final String THUMBNAIL_NAME = "thumbnail";

    private static HashMap<String, Integer> hashMap;

    private static final String[] PREFIX = {
            "classes",
            "labels",
            "images"
    };

    public static List<String> unzipInputStream(MinioClient minioClient, InputStream zipInputStream, DataSet dataSet) {
        int capacity = 0;
        double size = 0.;
        List<String> dataList = new ArrayList<>();
        try (ZipArchiveInputStream zip = new ZipArchiveInputStream(zipInputStream)) {
            ZipArchiveEntry zipEntry;
            while ((zipEntry = zip.getNextZipEntry()) != null) {
                String fileName_zip = zipEntry.getName();
                if (fileName_zip.endsWith("/")) {
                } else {
                    if(check(fileName_zip)) capacity++;
                    String[] names = fileName_zip.split("/");
                    dataList.add(names[names.length - 1]);
                    size += zipEntry.getSize();
                    upload(minioClient, zip, fileName_zip, zipEntry.getSize());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        dataSet.setCapacity(capacity);
        dataSet.setSize(size / 1024 / 1024);
        return dataList;
    }

    // 检验文件名是否合法
    public static Boolean check(String str){
        String[] suffix = {"jpg", "png", "jpeg", "bmp"};
        for (String s : suffix) if (str.endsWith(s)) return true;
        return false;
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
        String[] types = path.split("\\.");
        String type = types[types.length - 1];
        minioClient.putObject(
                PutObjectArgs.builder().bucket(BUCKET_NAME).object(path).stream(stream, objSize, -1)
                        .contentType(SUFFIX_TABLE.get(type))
                        .build());
    }

    public static void createNewFile(MinioClient minioClient, String path) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        byte[] emptyContent = new byte[0];
        minioClient.putObject(
                PutObjectArgs.builder().bucket(BUCKET_NAME).object(path).stream(
                                new ByteArrayInputStream(emptyContent), 0, -1)
                        .build());
    }

    public static void getFilesFromPathList(MinioClient minioClient, List<ImageDataShort> images) throws Exception {
        for (ImageDataShort image: images) {
            getFileFromPath(minioClient, image);
        }
    }

    public static void getFileFromPath(MinioClient minioClient, ImageDataShort image) throws Exception {
        GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                .bucket(BUCKET_NAME)
                .object(image.getPath())
                .expiry(1, TimeUnit.HOURS)
                .method(Method.GET).build();
        image.setThumbnail(minioClient.getPresignedObjectUrl(args));
    }

}

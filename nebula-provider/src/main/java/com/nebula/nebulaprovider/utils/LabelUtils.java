package com.nebula.nebulaprovider.utils;

import com.alibaba.fastjson.util.IOUtils;
import com.nebula.nebulaprovider.entity.dataset.Box2DLabel;
import com.nebula.nebulaprovider.entity.dataset.ClassificationLabel;
import com.nebula.nebulaprovider.mapper.DataSetMapper;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.StatObjectArgs;
import io.minio.errors.ErrorResponseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LabelUtils {
    public static String getLabelPath(String image, String bucket){
        return bucket + "/label/" + image.split("\\.")[0] + ".txt";
    }

    public static List<ClassificationLabel> getClassifications(DataSetMapper dataSetMapper, Integer id, MinioClient minioClient, String name, String bucket){
        List<String> strings = readLines(minioClient, name, bucket);
        List<Integer> ids = dataSetMapper.getLabelIDSets(id, Utils.generateQuery(Collections.singletonList(strings)));
        List<ClassificationLabel> labels = new ArrayList<>();
        for (Integer id_: ids) {
            ClassificationLabel label = new ClassificationLabel();
            label.setId(id_);
            labels.add(label);
        }
        return labels;
    }

    public static List<Box2DLabel> getBox2D(DataSetMapper dataSetMapper, Integer id, MinioClient minioClient, String name, String bucket){
        List<String> strings = readLines(minioClient, name, bucket);
        if(strings == null) return null;
        // 0 A B C D
        List<Box2DLabel> labels = new ArrayList<>();
        for (String string: strings) {
            Box2DLabel label = new Box2DLabel();
            String[] query = string.split(" ");

            labels.add(label);
        }
        return labels;
    }


    public static List<String> readLines(MinioClient minioClient, String name, String bucket) {
        if(checkHasFile(minioClient, name, bucket)){
            try {
                InputStream inputStream = minioClient.getObject(GetObjectArgs.builder()
                        .bucket(bucket)
                        .object(name)
                        .build());
                BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                List<String> strings = new ArrayList<>();
                String line;
                while ((line = br.readLine()) != null) strings.add(line);
                return strings;
            }catch (Exception e){
                throw new RuntimeException("文件获取失败", e);
            }
        }
        return null;
    }

    public static Boolean checkHasFile(MinioClient minioClient, String name, String bucket){
        try {
            minioClient.statObject(StatObjectArgs.builder()
                    .bucket(bucket)
                    .object(name).build());
            return true;
        } catch (ErrorResponseException e) {
            e.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

}

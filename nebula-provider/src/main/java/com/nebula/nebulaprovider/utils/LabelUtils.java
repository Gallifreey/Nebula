package com.nebula.nebulaprovider.utils;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.util.IOUtils;
import com.nebula.nebulaprovider.entity.dataset.Box2DLabel;
import com.nebula.nebulaprovider.entity.dataset.ClassificationLabel;
import com.nebula.nebulaprovider.entity.dataset.Form.ImageAnnotationObject;
import com.nebula.nebulaprovider.mapper.DataSetMapper;
import com.nebula.nebulaprovider.service.DataSetService;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.StatObjectArgs;
import io.minio.errors.ErrorResponseException;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LabelUtils {
    public static String getLabelPath(String image, String dataset){
        return dataset + "/labels/" + image.split("\\.")[0] + ".json";
    }

    public static List<ClassificationLabel> getClassifications(DataSetService dataSetService, Integer id, MinioClient minioClient, String name){
        String strings = readFile(minioClient, name);
        ImageAnnotationObject<String> object = JSONObject.parseObject(strings, ImageAnnotationObject.class);
        List<Integer> ids;
        List<ClassificationLabel> labels = new ArrayList<>();
        if (object != null) {
            List<Object> objects = List.of(new String[]{object.getAnnotations()});
            ids = dataSetService.getLabelIDSets(id, Utils.generateQuery(objects));
            for (Integer id_: ids) {
                ClassificationLabel label = new ClassificationLabel();
                label.setId(id_);
                labels.add(label);
            }
        }
        return labels;
    }

    public static List<Box2DLabel> getBox2D(DataSetService dataSetService, Integer id, MinioClient minioClient, String name){
        String strings = readFile(minioClient, name);
        if(strings == null) return null;
        List<Box2DLabel> labels = new ArrayList<>();
//        for (String string: strings) {
//            Box2DLabel label = new Box2DLabel();
//            String[] query = string.split(" ");
//
//            labels.add(label);
//        }
        return labels;
    }


    public static String readFile(MinioClient minioClient, String name) {
        if(checkHasFile(minioClient, name)){
            try {
                InputStream inputStream = minioClient.getObject(GetObjectArgs.builder()
                        .bucket(Minio.getBucketName())
                        .object(name)
                        .build());
                BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
                StringBuilder content = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) content.append(line).append("\n");
                return content.toString();
            }catch (Exception e){
                throw new RuntimeException("文件获取失败", e);
            }
        }
        return null;
    }

    public static Boolean checkHasFile(MinioClient minioClient, String name){
        try {
            minioClient.statObject(StatObjectArgs.builder()
                    .bucket(Minio.getBucketName())
                    .object(name).build());
            return true;
        } catch (ErrorResponseException e) {
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

}

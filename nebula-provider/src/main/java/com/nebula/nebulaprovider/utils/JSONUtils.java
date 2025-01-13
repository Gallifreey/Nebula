package com.nebula.nebulaprovider.utils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

public class JSONUtils {
    public static Object removeKeysFromObject(Object data, String[] keys){
        if (data == null || keys == null || keys.length == 0) {
            return data;
        }

        Class<?> clazz = data.getClass();
        List<String> keysToRemove = Arrays.asList(keys);

        try {
            for (Field field : clazz.getDeclaredFields()) {
                if (keysToRemove.contains(field.getName())) {
                    field.setAccessible(true);
                    field.set(data, null); // 将指定字段设置为 null
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        return data;
    }
}

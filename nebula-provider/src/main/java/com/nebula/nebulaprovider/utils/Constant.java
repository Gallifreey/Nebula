package com.nebula.nebulaprovider.utils;

import java.util.HashMap;

public class Constant {
    public static HashMap<String, String> SUFFIX_TABLE = new HashMap<>();
    public static String CLASSES_FILE_NAME = "classes.txt";

    static {
        SUFFIX_TABLE.put("*", "application/octet-stream");
        SUFFIX_TABLE.put("bmp", "application/x-bmp");
        SUFFIX_TABLE.put("jpeg", "image/jpeg");
        SUFFIX_TABLE.put("jpg", "image/jpeg");
        SUFFIX_TABLE.put("png", "image/png");
        SUFFIX_TABLE.put("txt", "text/plain");
        SUFFIX_TABLE.put("json", "text/plain");
    }

    public enum DATASET_TYPE{
        CLASSIFICATION(1), BOX_2D(2), NONE(65535);
        private final Integer type;

        DATASET_TYPE(Integer type) {
            this.type = type;
        }

        public Integer getType() {
            return type;
        }

        public static DATASET_TYPE valueOf(Integer value){
            switch (value) {
                case 1:
                    return CLASSIFICATION;
                case 2:
                    return BOX_2D;
                default:
                    return NONE;
            }
        }
    }
}
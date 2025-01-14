package com.nebula.nebulaprovider.utils;

import java.util.HashMap;

public class Constant {
    public static HashMap<String, String> SUFFIX_TABLE = new HashMap<>();
    static {
        SUFFIX_TABLE.put("*", "application/octet-stream");
        SUFFIX_TABLE.put("bmp", "application/x-bmp");
        SUFFIX_TABLE.put("jpeg", "image/jpeg");
        SUFFIX_TABLE.put("jpg", "image/jpeg");
        SUFFIX_TABLE.put("png", "image/png");
        SUFFIX_TABLE.put("txt", "text/plain");
        SUFFIX_TABLE.put("json", "text/plain");
    }
}
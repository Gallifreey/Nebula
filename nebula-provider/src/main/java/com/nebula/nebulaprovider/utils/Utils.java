package com.nebula.nebulaprovider.utils;

import java.util.List;

public class Utils {
    public static <T> String generateQuery(List<T> objects){
        StringBuilder a = new StringBuilder("(");
        for (int i=0;i<objects.size();++i) {
            a.append("\"").append(objects.get(i).toString()).append("\"");
            if(i< objects.size() - 1) a.append(",");
        }
        a.append(")");
        return a.toString();
    }
}

package com.nebula.nebulaprovider.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Integer code;//响应码，1 代表成功; 0 代表失败
    private String msg;
    private Object data; //返回的数据

    //增删改 成功响应
    public static Result success(){
        return new Result(200,"", null);
    }
    public static Result success(String msg){
        return new Result(200, msg, null);
    }
    //查询 成功响应
    public static Result success(Object data){
        return new Result(200, "", data);
    }

    public static Result success(String msg, Object data){
        return new Result(200, msg, data);
    }
    //失败响应
    public static Result error(String msg){
        return new Result(400, msg, null);
    }
}
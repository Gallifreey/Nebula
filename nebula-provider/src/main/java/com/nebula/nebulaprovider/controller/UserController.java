package com.nebula.nebulaprovider.controller;

import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.service.UserService;
import com.nebula.nebulaprovider.utils.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/api/user/info")
    public Result getUserInfo(Integer id){
        String[] keys = new String[]{
                "password",
                "id"
        };
        return Result.success(JSONUtils.removeKeysFromObject(userService.getUserInfoByUID(1), keys));
    }
}

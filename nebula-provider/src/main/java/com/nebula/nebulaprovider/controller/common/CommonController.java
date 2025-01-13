package com.nebula.nebulaprovider.controller.common;

import com.nebula.nebulaprovider.entity.Result;
import com.nebula.nebulaprovider.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {
    @Autowired
    CommonService commonService;

    @GetMapping("/api/menu")
    public Result getRoute(Integer id){
        return Result.success(commonService.getSystemRoutes());
    }
}

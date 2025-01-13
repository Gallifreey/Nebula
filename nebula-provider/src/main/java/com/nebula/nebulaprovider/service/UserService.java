package com.nebula.nebulaprovider.service;

import com.nebula.nebulaprovider.entity.User;
import com.nebula.nebulaprovider.mapper.UserMapper;
import com.nebula.nebulaprovider.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceImpl {
    @Autowired
    UserMapper userMapper;

    @Override
    public User getUserInfoByUID(Integer id) {
        return userMapper.getUserInfoByUID(id);
    }
}

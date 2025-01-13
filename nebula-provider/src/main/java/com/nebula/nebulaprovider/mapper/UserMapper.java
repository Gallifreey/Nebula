package com.nebula.nebulaprovider.mapper;


import com.nebula.nebulaprovider.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id=#{id}")
    User getUserInfoByUID(Integer id);
}

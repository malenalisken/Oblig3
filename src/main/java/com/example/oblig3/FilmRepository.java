package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FilmRepository {
    @Autowired
    private JdbcTemplate db;
    public List<Film> hentAlleFilmer() {
        String sql = "SELECT * FROM Film";
        List<Film> alleFilmer = db.query(sql, new BeanPropertyRowMapper(Film.class));
        return alleFilmer;
    };
}

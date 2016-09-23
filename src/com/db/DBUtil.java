package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBUtil {
//	private static String url = "jdbc:mysql://192.168.3.1:3306/field_monitor";//·þÎñÆ÷url
	private static String url = "jdbc:mysql://127.0.0.1:3306/field_monitor";
	private static String username = "root";
	private static String password = "907856";
	private static Connection conn = null;
    
	public static Connection getConnection() {
		if(conn!=null){
			return conn;
		}
	    String driver = "com.mysql.jdbc.Driver";
	    
	    try {
	        Class.forName(driver); //classLoader,åŠ è½½å¯¹åº”é©±åŠ¨
	        conn = (Connection) DriverManager.getConnection(url, username, password);
	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return conn;
	}
	
}

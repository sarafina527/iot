package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.db.DBUtil;

public class NodeDao {
	
	public static List<Integer> getNodesByUser(String username) throws SQLException{
		
		List<Integer> nodes = new ArrayList<Integer>();
		
		Connection conn = DBUtil.getConnection();
		String sql = "select id from nodes where user = ?";		
		PreparedStatement prestmt = conn.prepareStatement(sql);
		prestmt.setString(1, username);
		ResultSet rs = prestmt.executeQuery();
		int node_id = -1;
		while(rs.next()){
			node_id = rs.getInt("id");
			nodes.add(node_id);
		}
		
		return nodes;
	}

	
}

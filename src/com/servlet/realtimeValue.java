package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensordataDao;

public class realtimeValue extends HttpServlet {


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//获取请求参数，节点号和是数据种类
		String type = request.getParameter("type");
		int nodeId = Integer.parseInt(request.getParameter("nodeId"));
		
		sensordataDao sdDao = new sensordataDao();
		try {
			float value = sdDao.queryTopByTypeAndNodeId(type,nodeId);
			System.out.println(value);
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.print(value);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
	}

}

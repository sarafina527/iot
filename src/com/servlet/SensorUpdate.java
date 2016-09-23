package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensormetaDao;

public class SensorUpdate extends HttpServlet {

	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		String sensorId = request.getParameter("sensorId");
		String nodeId = request.getParameter("nodeId");
		String maxAlert = request.getParameter("maxAlert");  
		String minAlert = request.getParameter("minAlert");
		String location = java.net.URLDecoder.decode(request.getParameter("location"),"UTF-8");
		System.out.println("sensorId:" + sensorId);     
		System.out.println("maxAlert:" + maxAlert);
		System.out.println("minAlert:" + minAlert);
		sensormetaDao smd = new sensormetaDao();
		try {
			if(maxAlert!=null&&maxAlert!=""){
				smd.UpdateMaxalertBySensorId(maxAlert, sensorId);
			}
			if(minAlert!=null&&minAlert!=""){
				smd.UpdateMinalertBySensorId(minAlert, sensorId);
			}
			if(location!=null&&location!=""&&nodeId!=null&&nodeId!=""){
				smd.UpdateLocationByNodeId(location, nodeId);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  
		out.print(maxAlert); 
		out.flush();
		out.close();
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}

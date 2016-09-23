package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensormetaDao;

public class SwitchSensor extends HttpServlet {


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String sensorId = request.getParameter("sensorId");
		String switch_state = request.getParameter("switch_state");
//		if(switch_state.equals("open")){
//			switch_state = "close";
//		}else{
//			switch_state = "open";
//		}
		sensormetaDao smd = new sensormetaDao();
		try {
			if(switch_state!=null&&switch_state!=""){
				smd.UpdateSwitchBySensorId(switch_state, sensorId);
			}		
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}

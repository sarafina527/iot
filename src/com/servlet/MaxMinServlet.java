package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.dao.sensormetaDao;
import com.model.maxmin;

public class MaxMinServlet extends HttpServlet {


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int nodeId = 1;
		if(request.getParameter("nodeId")!=null&&request.getParameter("nodeId")!=""){
			nodeId = Integer.parseInt(request.getParameter("nodeId"));
		}
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		sensormetaDao smd = new sensormetaDao();
		try {
			maxmin mm = smd.getMaxminByNodeId(nodeId);
			if(mm!=null){
				JSONObject mmjson=new JSONObject();
				mmjson.put("light_max", mm.getLight_max());
				mmjson.put("light_min", mm.getLight_min());
				mmjson.put("temp_max", mm.getTemp_max());
				mmjson.put("temp_min", mm.getTemp_min());
				mmjson.put("humi_max", mm.getHumi_max());
				mmjson.put("humi_min", mm.getHumi_min());
				mmjson.put("soiltemp_max", mm.getSoiltemp_max());
				mmjson.put("soiltemp_min", mm.getSoiltemp_min());
				mmjson.put("soilhumi_max", mm.getSoilhumi_max());
				mmjson.put("soilhumi_min", mm.getSoilhumi_min());
				out.print(mmjson.toString());
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		out.flush();
		out.close();
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}

package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.dao.sensordataDao;
import com.model.sensordata;

public class HistoryJson extends HttpServlet {

	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		int nodeId = Integer.parseInt(request.getParameter("nodeId"));
		sensordataDao sdD = new sensordataDao();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			sensordata obj = (sensordata)sdD.queryTop1ByNodeId(nodeId);
			if(obj!=null){
				JSONObject json=new JSONObject();
				json.put("date", sdf.format(obj.getDate()));
				json.put("time", obj.getTime());
				DecimalFormat decimalFormat=new DecimalFormat(".00");//构造方法的字符格式这里如果小数不足2位,会以0补足.
				json.put("light", decimalFormat.format(obj.getLight()));
				json.put("temp", decimalFormat.format(obj.getTemp()));
				json.put("humi", decimalFormat.format(obj.getHumi()));
				json.put("soiltemp", decimalFormat.format(obj.getSoiltemp()));
				json.put("soilhumi", decimalFormat.format(obj.getSoilhumi()));
				System.out.println(json.toString());
				out.print(json.toString());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}

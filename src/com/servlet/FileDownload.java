package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dao.sensordataDao;
import com.model.sensordata;

public class FileDownload extends HttpServlet {


	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//获取前台参数
		int node_id = 1;
		if(request.getParameter("node_id")!=null){
			node_id = Integer.parseInt(request.getParameter("node_id"));
		}
		String stdate = request.getParameter("stdate");
 		String enddate = request.getParameter("enddate"); 
 		
 		//查询数据库数据
		sensordataDao data1dao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		String str="";
		if(request.getParameter("light")!=null){
			str+="环境光照(Lx)";
			str+="\t";
		}
		if(request.getParameter("temp")!=null){
			str+="环境温度(°C)";
			str+="\t";
		}
		if(request.getParameter("humi")!=null){
			str+="环境湿度(g/m3)";
			str+="\t";
		}
		if(request.getParameter("soiltemp")!=null){
			str+="土壤温度(°C)";
			str+="\t";
			
		}
		if(request.getParameter("soiltemp")!=null){
			str+="土壤湿度(g/m3)";
			str+="\t";
		}
		str+="\r\n";
		try {
			result = data1dao.queryByNodeIdAndDate(node_id,stdate,enddate);
			for(int i=0;i<result.size();i++){
				if(request.getParameter("light")!=null){
					str+=result.get(i).getLight();
					str+="\t";
				}
				if(request.getParameter("temp")!=null){
					str+=result.get(i).getTemp();
					str+="\t";
				}
				if(request.getParameter("humi")!=null){
					str+=result.get(i).getHumi();
					str+="\t";
				}
				if(request.getParameter("soiltemp")!=null){
					str+=result.get(i).getSoiltemp();
					str+="\t";
				}
				if(request.getParameter("soilhumi")!=null){
					str+=result.get(i).getSoilhumi();
					str+="\t";
				}
				str+="\r\n";
				
			}
			
		} catch (Exception e) {			
			e.printStackTrace();
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String datestr = sdf.format(date);
		String filename = "data"+datestr+".txt";
		//设置文件MIME类型  
        response.setContentType(getServletContext().getMimeType(filename));  
        //设置Content-Disposition  
        response.setHeader("Content-Disposition", "attachment;filename="+filename); 
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8"); 
		PrintWriter out = response.getWriter();
		
		out.write(str);
		out.flush();
		out.close();
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}

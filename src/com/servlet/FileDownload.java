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
		//��ȡǰ̨����
		int node_id = 1;
		if(request.getParameter("node_id")!=null){
			node_id = Integer.parseInt(request.getParameter("node_id"));
		}
		String stdate = request.getParameter("stdate");
 		String enddate = request.getParameter("enddate"); 
 		
 		//��ѯ���ݿ�����
		sensordataDao data1dao = new sensordataDao();
		List<sensordata> result = new ArrayList<sensordata>();
		
		String str="";
		StringBuilder strb = new StringBuilder("");
		strb.append("����\t\t");
		strb.append("ʱ��\t\t");
		if(request.getParameter("light")!=null){
			strb.append("��������(Lx)");
			strb.append("\t");
		}
		if(request.getParameter("temp")!=null){
			strb.append("�����¶�(��C)");
			strb.append("\t");
		}
		if(request.getParameter("humi")!=null){
			strb.append("����ʪ��(g/m3)");
			strb.append("\t");
		}
		if(request.getParameter("soiltemp")!=null){
			strb.append("�����¶�(��C)");
			strb.append("\t");
			
		}
		if(request.getParameter("soiltemp")!=null){
			strb.append("����ʪ��(g/m3)");
			strb.append("\t");
		}
		strb.append("\r\n");
		try {
			result = data1dao.queryByNodeIdAndDate(node_id,stdate,enddate);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			for(int i=0;i<result.size();i++){
				strb.append(sdf.format(result.get(i).getDate()));
				strb.append("\t");
				strb.append(result.get(i).getTime());
				strb.append("\t");
				if(request.getParameter("light")!=null){
					strb.append(result.get(i).getLight());
					strb.append("\t\t");
				}
				if(request.getParameter("temp")!=null){
					strb.append(result.get(i).getTemp());
					strb.append("\t\t");
				}
				if(request.getParameter("humi")!=null){
					strb.append(result.get(i).getHumi());
					strb.append("\t\t");
				}
				if(request.getParameter("soiltemp")!=null){
					strb.append(result.get(i).getSoiltemp());
					strb.append("\t\t");
				}
				if(request.getParameter("soilhumi")!=null){
					strb.append(result.get(i).getSoilhumi());
					strb.append("\t\t");
				}
				strb.append("\r\n");
				
			}
			
		} catch (Exception e) {			
			e.printStackTrace();
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd_HH:mm:ss");
		String datestr = sdf.format(date);
		String filename = "data_"+datestr+".txt";
		//�����ļ�MIME����  
        response.setContentType(getServletContext().getMimeType(filename));  
        //����Content-Disposition  
        response.setHeader("Content-Disposition", "attachment;filename="+filename); 
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8"); 
		PrintWriter out = response.getWriter();
		
		out.write(strb.toString());
		out.flush();
		out.close();
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}

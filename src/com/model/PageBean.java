package com.model;

public class PageBean {
	private int curPage;             //��ǰҳ
	private int pageCount;           //��ҳ��
	private int rowsCount;	         //������
	private int pageSize=10;         //ÿҳ������
	
	
	
	public PageBean(int rows){
		
		this.setRowsCount(rows);
		if(this.rowsCount % this.pageSize == 0){
			this.pageCount=this.rowsCount / this.pageSize;
		}
		else if(rows<this.pageSize){
			this.pageCount=1;
		}
		else{
			this.pageCount=this.rowsCount / this.pageSize +1;
		}
	}
	
	
	public int getCurPage() {
		return curPage;
	}
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getRowsCount() {
		return rowsCount;
	}
	public void setRowsCount(int rowsCount) {
		this.rowsCount = rowsCount;
	}
}


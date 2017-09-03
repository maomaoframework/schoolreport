package huxg.schoolreport.util.solr;

/**
 * 搜索结果项
 * 
 * @author cndini
 * 
 */
public class SearchResult {
	String id;
	String title;
	String content;
	String imgUrl;
	String url;
	String solr_type;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSolr_type() {
		return solr_type;
	}

	public void setSolr_type(String solr_type) {
		this.solr_type = solr_type;
	}
}

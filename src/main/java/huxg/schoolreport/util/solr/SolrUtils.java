package huxg.schoolreport.util.solr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import huxg.framework.PageInfo;
import huxg.framework.util.HttpUtils;
import huxg.framework.util.JsonUtils;
import huxg.framework.vo.Message;

/**
 * Solr工具类
 * 
 * @author cndini
 * 
 */
public class SolrUtils {

	/**
	 * 执行关键字搜索
	 * 
	 * @param keyword
	 * @param isHighlighter
	 * @param pageNum
	 * @return
	 * @throws Exception
	 */
	public static String doSearch(String keyword, boolean isHighlighter, int pageNum) throws Exception {
		String url = "http://192.168.1.125:8983/solr/jkbk/query";

		Map<String, String> params = new HashMap<String, String>();
		params.put("q", keyword);
		params.put("start", String.valueOf((pageNum - 1) * 20));
		params.put("rows", "20");

		JSONObject jo = HttpUtils.post4JsonObject(url, params);

		// 返回的结果
		JSONObject response = jo.getJSONObject("response");

		// 返回搜索到的结果
		int pageIndex = pageNum <= 0 ? 1 : pageNum;
		PageInfo pageInfo = new PageInfo();
		pageInfo.setCurrentPageIndex(pageIndex);
		pageInfo.setPageSize(20);

		List<SearchResult> results = new ArrayList<SearchResult>();
		int numFound = response.getIntValue("numFound");
		if (numFound > 0) {

			JSONArray ja = response.getJSONArray("docs");
			results = JsonUtils.JSONArray2List(ja, SearchResult.class);
		}
		pageInfo.setShowRows(numFound);
		return Message.okMessage(results, pageInfo);
	}
}

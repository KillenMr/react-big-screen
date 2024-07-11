import request from '../utils/request';

// 获取左侧界面数据请求
export const getLeftPageData = async () => {
  return request('/api/leftPageData').then(response => {
    return response.data;
  });
};

// 获取中间界面数据请求
export const getCenterPageData = async () => {
  return request('/api/centerPageData').then(response => {
    return response.data;
  });
};

// 获取右侧界面数据请求
export const getRightPageData = async () => {
  return request('/api/rightPageData').then(response => {
    return response.data;
  });
};

// 获取行业节点
export const getIndustryNodes = async () => {
  return request("http://49.232.183.92:8000/api/get_industry_nodes_and_relations").then((response) => {
    return response;
  });
};

// 获取公司信息
export const getCompanyInfo = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `http://49.232.183.92:8000/api/search_all_company_for_industry?${queryString}`;
  return request(fullUrl).then((response) => {
    return response;
  });
};



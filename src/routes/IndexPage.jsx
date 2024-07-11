import React, { Component } from 'react';
import { connect } from 'dva';
import { IndexPageStyle, IndexPageContent } from './style';
import TopPage from '../components/topPage';
import LeftPage from '../components/leftPage';
import CenterPage from '../components/centerPage';
import RightPage from '../components/rightPage';
import { getCompanyInfo } from '../services/index';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyIndustrys: []
    };

    this.onClickIndustry = this.onClickIndustry.bind(this);
  }

  onClickIndustry(name) {
    console.log("name >>>>", name);
    let self = this;
    getCompanyInfo({ industry_name: name, page: 1, page_size: 9999 }).then((res) => {
      console.log("请求成功 >>>>", res);
      const merged_dict = res?.data?.data?.merged_dict || [];
      if (Array.isArray(merged_dict)) {
        const companyIndustrys = merged_dict.map((item) => {
          return [item.name, item.uniform_social_credit_code, item.representative || "", item.listed_board]
        })

        self.setState({ companyIndustrys })
      }
    }).catch((err) => {
      console.error("请求失败：", err);
    })
  }

  render() {
    const { companyIndustrys } = this.state;
    return (
      <IndexPageStyle>
        <TopPage />
        <IndexPageContent>
          {/* 左边 */}
          <CenterPage className='center-page' onClickIndustry={this.onClickIndustry} />
          {/* 右边 */}
          <LeftPage companyIndustrys={companyIndustrys} />
        </IndexPageContent>
      </IndexPageStyle>
    );
  }
}

export default connect()(IndexPage);

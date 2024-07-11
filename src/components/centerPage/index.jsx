import React, { PureComponent, Text } from 'react';
import { CenterPage, CenterBottom, NamesView, NameBtn } from './style';
import Map from './charts/Map';
import Tree from './charts/Tree';
import { connect } from 'dva';
import { BorderBox2 } from '@jiaminghi/data-view-react';
import { ModuleTitle } from '../../style/globalStyledSet';
import { getIndustryNodes } from '../../services/index';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      industry_names: [],
      selectedName: "",
      selectedNode: [],
      nextNodeMap: {}
    };
  }

  componentDidMount() {
    getIndustryNodes().then(res => {
      console.log("请求成功 >>>>", res);
      if (res?.data?.data) {
        const { industry_names, nextNodeMap } = res.data.data;
        const selectedName = industry_names?.[0] || "";
        const curArr = nextNodeMap[selectedName];
        const nodes = curArr.map((item) => {
          return { name: item }
        })
        this.props.onClickIndustry(selectedName);
        this.setState({ selectedNode: [{ name: selectedName, children: nodes }], nextNodeMap, industry_names: Array.isArray(industry_names) ? industry_names : [], selectedName });
        return;
      }

    }).catch(err => {
      console.error("请求失败 >>>>", err)
    });

  }

  truncateName(name) {
    if (name.length > 8) {
      return name.slice(0, 8) + '...';
    }
    return name;
  }

  render() {
    const { selectedName, nextNodeMap, selectedNode } = this.state;
    return (
      <CenterPage>
        {/* <Map mapData={mapData}></Map> */}
        <NamesView>
          {this.state.industry_names.map((name) => {
            if (!name) {
              return null;
            }

            return (
              <NameBtn key={name} style={{ background: selectedName === name ? "rgba(50, 120, 180, 1)" : "transparent" }} onClick={() => {
                console.log("test", name);
                const curArr = nextNodeMap[name];
                const nodes = curArr.map((item) => {
                  return { name: item }
                })
                this.props.onClickIndustry(selectedName);
                this.setState({ selectedName: name, selectedNode: [{ name, children: nodes }] })
              }}>
                <BorderBox2 style={{
                  // width: '120px',
                  height: '50px',
                  lineHeight: '50px',
                  textAlign: 'center',
                  // marginLeft: '8px',
                  color: '#fff',
                  paddingLeft: '20px',
                  paddingRight: '20px'
                }}>{this.truncateName(name)}</BorderBox2>
              </NameBtn>
            )
          })}
        </NamesView>
        <CenterBottom>
          <div className='detail-list'>
            <div className='detail-list-item' key={index}>
              <Tree treeData={selectedNode}></Tree>
            </div>
          </div>
        </CenterBottom>
      </CenterPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    detailsList: state.centerPage.detailsList,
    treeData: state.centerPage.treeData,
  };
};

const mapStateToDispatch = dispatch => ({});

export default connect(mapStateToProps, mapStateToDispatch)(index);

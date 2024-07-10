import React, { PureComponent } from "react";
import Chart from "../../../utils/chart";
import { treeOptions } from "./treeOptions";

class Tree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: "canvas",
    };
  }

  render() {
    const { renderer } = this.state;
    const { treeData } = this.props;
    console.log("treeData >>", treeData);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {treeData ? (
          <Chart renderer={renderer} option={treeOptions(treeData)} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Tree;

import styled from "styled-components";

export const CenterPage = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  // align-items: center;
  flex: 1;
`;

export const NamesView = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const NameBtn = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-left: 12px;
  margin-bottom: 20px;
  color: "#fff";
`;

export const CenterBottom = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  margin-top: 0.15rem;
  width: 100%;
  // height: 3.25rem;
  flex: 1;
  .detail-list {
    display: flex;
    // flex-wrap: wrap;
    flex: 1;
    align-items: center;
    // align-content: space-between;
    // justify-content: space-around;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 100%;
      flex: 1;
      flex-direction: column;
      padding: 0 0.125rem;
      // width: 32%;
      margin-left: 0.125rem;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 1.25rem;
        height: 1.25rem;
      }
      .detail-item-text {
        margin-left: 0.125rem;
        h3 {
          color: #bcdcff;
          font-size: 16px;
          margin-bottom: 0.25rem;
        }
        span {
          font-weight: 500px;
          font-size: 0.25rem;
          font-weight: bolder;
          background: linear-gradient(to bottom, #fff, #4db6e5);
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
  }
`;

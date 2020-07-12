import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import Circle from "./components/Circle/Circle";
import Item from "./components/Item/Item";

type Props = {
  requestEndpoint: RequestEndpoint;
  color: string;
};

const Info = ({ requestEndpoint, color }: Props) => {
  return (
    <Style>
      <Circle color={color} />
      <div className="text">
        <Item name="NAMESPACE" value={requestEndpoint.namespace} />
        <Item name="WORKLOAD" value={requestEndpoint.workload} />
        <Item name="POD NAME" value={requestEndpoint.name} />
        <Item name="POD IP" value={`${requestEndpoint.address.ip}:${requestEndpoint.address.port}`} />
      </div>
    </Style>
  );
};

export const Style = styled.div`
  padding: 0 ${constants.mainPadding};

  .text {
    width: calc(100% - 5rem);
    display: inline-block;
  }
`;

export default Info;

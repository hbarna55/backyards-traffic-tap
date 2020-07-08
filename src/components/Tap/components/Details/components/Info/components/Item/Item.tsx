import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  value: string;
};

const Item = ({ name, value }: Props) => {
  return (
    <Style>
      <span>{name}</span>
      <span>:</span>
      <span className="value">{value}</span>
    </Style>
  );
};

export const Style = styled.div`
  padding: 0 1rem;
  .value {
    float: right;
  }
`;

export default Item;

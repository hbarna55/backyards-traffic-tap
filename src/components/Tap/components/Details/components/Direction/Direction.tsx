import { AccessLogsDirection } from "api/models/HTTPAccessLogEntryM";
import { ReactComponent as ArrowDown } from "assets/icons/arrow_down.svg";
import React from "react";
import styled from "styled-components";
import constants from "../../constants";

type Props = {
  direction: AccessLogsDirection;
};

const Direction = ({ direction }: Props) => {
  return (
    <Style>
      <span>
        <ArrowDown />
      </span>
      <span className="text-direction">{direction}</span>
    </Style>
  );
};

export const Style = styled.div`
  padding: 24px ${constants.mainPadding};
  font-weight: 600;
  text-transform: uppercase;
  position: relative;

  svg {
    width: 4.5rem;
    height: 7rem;
  }

  .text-direction {
    position: absolute;
    top: 4.5rem;
    padding-left: 1rem;
  }
`;

export default Direction;

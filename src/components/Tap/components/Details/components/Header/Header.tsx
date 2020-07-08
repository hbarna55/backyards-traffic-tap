import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import React, { useCallback } from "react";
import styled from "styled-components";
import colors from "theme/colors";

type Props = {
  accessLog: HTTPAccessLogEntryM;
};

const Header = ({ accessLog }: Props) => {
  const getStatusClass = useCallback(
    () => (accessLog.response.statusCode.toString()[0] === "2" ? " success" : " error"),
    [accessLog.response.statusCode],
  );

  return (
    <Style>
      <span className={"status" + getStatusClass()}>{accessLog.response.statusCode}</span>
      <span className="method">{accessLog.request.method}</span>
      <span className="authority">{accessLog.request.authority}</span>
    </Style>
  );
};

const Style = styled.div`
  font-size: 120%;
  margin: 15px 0 21px;
  padding: 0 24px;
  font-weight: 400;

  .status {
    font-weight: 600;
    padding-right: 12px;
    margin-right: 12px;
    border-right: 1px solid #000;

    &.success {
      color: ${colors.green};
    }
    &.error {
      color: ${colors.red};
    }
  }

  .method {
    color: ${colors.blue};
    margin-right: 6px;
  }
`;

export default Header;

import React from "react";
import HTTPAccessLogEntryVM from "../../viewModels/HTTPAccessLogEntryVM";

type Props = {
  accessLog: HTTPAccessLogEntryVM;
};

const Details = ({ accessLog }: Props) => {
  return <div>{JSON.stringify(accessLog)}</div>;
};

export default Details;

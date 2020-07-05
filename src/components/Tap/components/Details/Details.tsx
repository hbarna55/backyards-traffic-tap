import HTTPAccessLogEntryVM from "api/viewModels/HTTPAccessLogEntryVM";
import React from "react";

type Props = {
  accessLog: HTTPAccessLogEntryVM;
};

const Details = ({ accessLog }: Props) => {
  return <div>{JSON.stringify(accessLog)}</div>;
};

export default Details;

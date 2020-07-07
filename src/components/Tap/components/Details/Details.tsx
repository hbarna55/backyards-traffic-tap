import HTTPAccessLogEntryM from "api/models/HTTPAccessLogEntryM";
import React from "react";

type Props = {
  accessLog: HTTPAccessLogEntryM;
};

const Details = ({ accessLog }: Props) => {
  return <div>{JSON.stringify(accessLog)}</div>;
};

export default Details;

import HTTPAccessLogEntryM, { AccessLogsDirection } from "api/models/HTTPAccessLogEntryM";
import React from "react";
import colors from "theme/colors";
import Direction from "./components/Direction/Direction";
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";

type Props = {
  accessLog: HTTPAccessLogEntryM | null;
};

const Details = ({ accessLog }: Props) => {
  return (
    <>
      {accessLog && (
        <div>
          <Header accessLog={accessLog} />
          <Info
            requestEndpoint={accessLog.source}
            color={accessLog?.direction === AccessLogsDirection.inbound ? colors.blueLight : colors.blue}
          />
          <Direction direction={accessLog.direction} />
          <Info
            requestEndpoint={accessLog.destination}
            color={accessLog?.direction === AccessLogsDirection.inbound ? colors.blue : colors.blueLight}
          />
        </div>
      )}
    </>
  );
};

export default Details;

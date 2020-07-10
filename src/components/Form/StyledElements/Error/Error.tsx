import styled from "styled-components";
import colors from "theme/colors";

const Error = styled.div`
  line-height: 22px;
  min-height: 22px;
  padding: 3px;
  color: ${colors.red};

  &::first-letter {
    text-transform: capitalize;
  }
`;

export default Error;

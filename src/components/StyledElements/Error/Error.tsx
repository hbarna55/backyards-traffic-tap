import styled from "styled-components";
import colors from "theme/colors";

const Error = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  color: ${colors.white};
  background: ${colors.red};
  padding: 1rem 2rem;
  margin: 2px;
  font-weight: 600;
`;

export default Error;

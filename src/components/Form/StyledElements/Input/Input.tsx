import styled from "styled-components";
import colors from "theme/colors";

const Input = styled.input`
  width: 100%;
  padding: 3px;
  border: none;
  background-color: transparent;
  border-bottom: solid 1px ${colors.grayDark};
  outline: none;
`;

export default Input;

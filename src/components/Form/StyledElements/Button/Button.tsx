import styled from "styled-components";
import colors from "theme/colors";

const Button = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: ${colors.blue};
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
  border: none;
  letter-spacing: 2px;
  margin-top: 1rem;
  transition: all 0.4s ease 0s;
  cursor: pointer;

  &:hover {
    background: ${colors.grayDarkest};
    letter-spacing: 4px;
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

export default Button;

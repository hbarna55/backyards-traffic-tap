import styled from "styled-components";

type Props = {
  color: string;
};

export const Circle = styled.div<Props>`
  display: inline-block;
  border: solid 4px ${({ color }) => color};
  border-radius: 50%;

  height: 4rem;
  width: 4rem;
`;

export default Circle;

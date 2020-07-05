import styled from "styled-components";

export const StyledTap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 60px 1fr;

  .filter {
    grid-column: 1 / 4;
    grid-row: 1;
  }
  .table {
    grid-column: 1 / 4;
    grid-row: 2;
  }
  .details {
    grid-column: 3 / 3;
    grid-row: 2;
  }
`;

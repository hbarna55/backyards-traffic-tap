import styled from "styled-components";

const filterHeight = "7rem";
export const StyledTap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .filter-container {
    height: ${filterHeight};
  }

  .button-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .table-container,
  .details-container {
    transition: width 0.5s;
    position: absolute;
    top: ${filterHeight};
    bottom: 0;
    right: 0;
  }
  .table-container {
    width: 100%;
    left: 0;
    overflow: auto;
  }

  .details-container {
    overflow: hidden;
    width: 0%;
    border: none;

    div {
      width: 33vw;
    }
  }

  &:hover {
    .details-container {
      width: 33vw;
    }
    .table-container {
      width: calc(100% - 33vw);
    }
  }
`;

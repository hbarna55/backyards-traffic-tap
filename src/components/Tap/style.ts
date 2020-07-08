import styled from "styled-components";
import colors from "theme/colors";

const filterHeight = "7rem";

type Props = {
  idDetailsShown: boolean;
};

export const StyledTap = styled.div<Props>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .filter-container {
    height: ${filterHeight};
    border-bottom: solid 1px ${colors.grayDark};
  }

  .button-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .table-container,
  .details-container {
    transition: width 0.2s;
    position: absolute;
    top: ${filterHeight};
    bottom: 0;
    right: 0;
  }
  .table-container {
    top: calc(${filterHeight} + 1px);
    left: 0;
    overflow: auto;
    width: ${({ idDetailsShown }) => (idDetailsShown ? "calc(100% - 33vw)" : "100%")};
  }

  .details-container {
    overflow: hidden;
    width: 0%;
    width: ${({ idDetailsShown }) => (idDetailsShown ? "33vw" : "0%")};
    border: none;

    & > div {
      width: 33vw;
    }
  }
`;

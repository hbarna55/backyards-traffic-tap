import styled from "styled-components";
import colors from "theme/colors";
import constants from "./constants";

export default styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;

  .table-wrapper {
    max-height: 100%;

    table {
      position: relative;
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
      color: ${colors.grayDark};
      margin-top: -5px;

      thead {
        tr th {
          border-bottom: solid 4px ${colors.gray};
          position: sticky;
          top: -5px;
          background-color: ${colors.white};
          padding: 5px;
        }
      }

      tbody tr {
        cursor: pointer;
        background-color: ${colors.white};

        :hover {
          background-color: ${colors.grayLight};
        }
      }

      th {
        vertical-align: bottom;
        text-align: left;
        z-index: 1;

        .filter .th-title {
          padding-bottom: ${parseInt(constants.cellPadding) / 2 + constants.cellPadding.replace(/\d*/, "")};

          span {
            position: absolute;
            right: 5px;

            i {
              color: darkgrey;
              font-size: 85%;
              line-height: 140%;

              &.sorted {
                color: initial;
              }
            }
          }
        }

        .header.cell {
          &:first-letter {
            text-transform: capitalize;
          }

          .th-title {
            font-weight: 700;
            padding: 0.2rem;
            span {
              position: absolute;
              right: 5px;
            }
          }

          .th-input {
            margin-right: 5px;

            input {
              height: 1rem;
              border: 0px;
              width: 100%;
            }
          }
          &.empty:after {
            content: "-";
            color: ${constants.backgroundColor};
          }
        }
      }

      td {
        border-bottom: solid 1px ${colors.gray};
        position: relative;
        margin: 0;
        padding: 0;

        :before {
          content: "";
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          position: absolute;
          z-index: -1;
        }
        .cell {
          font-size: 80%;
          padding: 0.3rem;
          white-space: nowrap;
          i {
            font-size: 0.9rem;
          }

          &.number {
            text-align: end;
            padding-right: 50%;
          }
          &.date {
            white-space: nowrap;
          }

          .links {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
`;

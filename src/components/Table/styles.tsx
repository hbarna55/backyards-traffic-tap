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
      border-spacing: 0 5px;
      border-collapse: separate;
      color: ${colors.grayDark};
      margin-top: -5px;

      thead tr th {
        position: sticky;
        background-color: ${colors.grayLight};
        padding: 5px;
      }

      tbody tr {
        background-color: #fff;

        :last-child {
          td:before {
            border-bottom: 0;
          }
        }

        :hover {
          box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.4);
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
            min-height: ${constants.trHeight};
            padding: 1rem;
            span {
              position: absolute;
              right: 5px;
            }
          }

          .th-input {
            margin-right: 5px;

            input {
              height: 2rem;
              border: 0px;
              width: 100%;
              padding: 1rem;
            }
          }
          &.empty:after {
            content: "-";
            color: ${constants.backgroundColor};
          }
        }
      }

      td {
        position: relative;
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

      td {
        margin: 0;
        padding: 0;

        .cell {
          min-height: ${constants.trHeight};
          padding: 1rem;
        }
      }
    }
  }
`;

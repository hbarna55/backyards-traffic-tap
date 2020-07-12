import styled from "styled-components";

export const Style = styled.div`
  form {
    padding: 0.5rem;
    display: grid;
    grid-gap: 0.6rem;
    grid-template-columns: repeat(3, 1fr) repeat(2, 0.75fr) repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);

    .react-select__menu {
      z-index: 2;
    }

    .statusCode {
      display: grid;
      grid-gap: 0.6rem;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(1, 1fr);
    }

    .MuiTextField-root {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

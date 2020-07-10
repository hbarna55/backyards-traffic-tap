import styled from "styled-components";
import colors from "theme/colors";

const Style = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .wrapper {
    margin: auto;
    background-color: ${colors.grayLight};
    width: 700px;
    height: 25%;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.33);
    outline: 20px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 2rem;

    form {
      width: 60%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Style;

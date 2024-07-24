import React, { useState } from "react";
import Draw from "@components/draw";
import Tools from "@components/tools";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(240, 242, 245, 1);
`;

const App = () => {
  const [brush, setBrush] = useState("pencil");
  return (
    <Container>
      <Draw brush={brush} />
      <Tools setBrush={setBrush} />
    </Container>
  );
};

export default App;

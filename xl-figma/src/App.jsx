import React from "react";
import styled from "styled-components";
import Draw from "@components/draw";
import Tools from "@components/tools";
import DotGrid from "@components/dot-bg";
import { useDirective } from "@utils/hooks";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const App = () => {
  const [directive] = useDirective();

  return (
    <Container>
      <Draw directive={directive} />
      <Tools directive={directive} />
      <DotGrid />
    </Container>
  );
};

export default App;

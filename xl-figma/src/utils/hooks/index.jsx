import { useState, useEffect } from "react";
import { _SWITCH_DIRECTIVE_, DIRECTIVE_MAPPER } from "@constants";

const { SELECTION } = DIRECTIVE_MAPPER;

export const useDirective = () => {
  const [directive, setDirective] = useState(SELECTION);

  useEffect(() => {
    _EE_.on(_SWITCH_DIRECTIVE_, setDirective);

    return () => {
      _EE_.off(_SWITCH_DIRECTIVE_);
    };
  }, []);

  return [directive, setDirective];
};

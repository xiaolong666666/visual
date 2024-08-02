import { _SWITCH_DIRECTIVE_ } from "@constants";

export const onSwitchDirective = (v, directive) => {
  if (directive !== v) {
    _EE_.emit(_SWITCH_DIRECTIVE_, v);
  }
};

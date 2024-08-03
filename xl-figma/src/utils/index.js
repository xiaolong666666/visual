import {
  _FABRIC_SWITCH_DIRECTIVE_,
  _FABRIC_SWITCH_IMAGE_DIRECTIVE_,
} from "@constants";

export const onFabricSwitchDirective = (v, directive) => {
  if (directive !== v) {
    _EE_.emit(_FABRIC_SWITCH_DIRECTIVE_, v);
  }
};

export const onFabricSwitchImageDirective = (v) => {
  _EE_.emit(_FABRIC_SWITCH_IMAGE_DIRECTIVE_, v);
};

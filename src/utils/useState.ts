import { mapState, createNamespacedHelpers } from "vuex";
import { useStateMapper } from "./useMapper";
import { checkType } from "./index";
// type mapFnArgsType = Parameters<typeof mapState>;
export function useState(mapper: string[], moduleName = "") {
  let mapperFn = mapState;

  if (checkType(moduleName) === "[object String]" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  }

  return useStateMapper(mapper, mapperFn);
}

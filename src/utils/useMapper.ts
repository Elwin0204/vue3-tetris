import { useStore, mapState } from "vuex";
import { computed, ComputedRef } from "vue";

type mapFnReturnsType = ReturnType<typeof mapState>;
interface IStoreState {
  [key: keyof mapFnReturnsType]: ComputedRef;
}

export function useStateMapper(mapper: string[], mapFn: typeof mapState) {
  const store = useStore();
  const storeStateFns = mapFn(mapper);

  const storeState: IStoreState = {};
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });
  return storeState;
}

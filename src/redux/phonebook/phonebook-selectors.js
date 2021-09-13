import { createSelector } from "reselect";

export const stateFilter = (state) => state.contacts.filter;
export const stateItems = (state) => state.contacts.items;
export const getIsLoading = (state) => state.contacts.isLoading;
export const getError = (state) => state.contacts.error;

export const visibleItems = createSelector(
  [stateItems, stateFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

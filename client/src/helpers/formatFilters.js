export const formatFilters = (productsForFilters, param) => {
  const filterListSet = new Set();
  productsForFilters.forEach((product) => {
    const itemToFilterBy = Object.assign(
      {},
      { name: product[param], value: product[param] },
    );
    filterListSet.add(JSON.stringify(itemToFilterBy));
  });
  const filterListArray = Array.from(filterListSet);
  const deSerializeFilterArray = filterListArray.map((item) =>
    JSON.parse(item),
  );
  return deSerializeFilterArray;
};

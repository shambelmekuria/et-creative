## usefull for combox simple filter for update

  // Custom filter logic
  // Solutions #1
  function onCategoryFilter(optionValues: string[], inputValue: string) {
    if (!inputValue) return optionValues;
    const search = inputValue.toLowerCase();
    return categoriesOption
      ?.filter(
        (item) =>
          optionValues.includes(item.value) &&
          item.label.toLowerCase().includes(search),
      )
      .map((item) => item.value);
  }

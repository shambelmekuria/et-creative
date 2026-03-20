### For Array of dict for select option use readonly
 options:readonly {
    value: string;
    label: string;
  }[];

  # For Function Props in ts argument and response
   onFilter: (options: string[], search: string) => any[];
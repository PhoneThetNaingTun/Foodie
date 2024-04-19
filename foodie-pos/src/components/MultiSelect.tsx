import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { menu, menuCategory } from "@prisma/client";
import { title } from "process";
import { Dispatch, SetStateAction } from "react";

interface Prop {
  title: string;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  items: menuCategory[] | menu[];
}

const MultiSelect = ({ selected, setSelected, items }: Prop) => {
  return (
    <FormControl sx={{ mb: 2 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={(event) => {
          const selectedMenuCategories = event.target.value as number[];
          setSelected(selectedMenuCategories);
        }}
        renderValue={() => {
          return selected.map((itemId) =>
            items.find((menucategory) => menucategory.id === itemId)
          );
        }}
        input={<OutlinedInput label="Menu Categories" />}
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selected.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

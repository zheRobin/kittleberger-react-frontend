
import search from "../../assets/icons/search2.svg"
import "./style/productViewStyle.scss"

// const ProductSearch = () => {
//     return (
//         <div className="search-bar">
//             <input placeholder="Nach Produkten suchen"></input>
//             <img src={search} alt="search" />
//         </div>
//     )
// }


// export default ProductSearch


import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function ProductSearch() {
  return (
    <Autocomplete
      multiple
      id="combo-box-demo"
      options={top100Films}
      hiddenlabel="true"
      sx={{
        // border: "1px solid blue",
        "& .MuiOutlinedInput-root": {
          // border: "1px solid yellow",
          borderRadius: "0",
          padding: "0"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #eee"
        },
        "& .MuiButtonBase-root": {
          backgroundColor: "#8F7300",
          color: "white",
        }
      }}
      className="search-bar"
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Nach Produkten suchen"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <img src={search} alt="search" />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },

  { label: "Monty Python and the Holy Grail", year: 1975 }
];
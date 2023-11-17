
import search from "../../assets/icons/search2.svg"
import "./style/productViewStyle.scss"
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { getProductsbyFilter } from "../../_services/Product";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ProductSearch({ filterData, setFilterData }) {
  const selectedCountryGroup = useSelector(state => state.products.selectedCountry)
  const token = useSelector(state => state.auth.token);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const clearStoreData = () => {
    setProductList([]);
    setPage(1);
    const productInfo = searchString;
    try {
      getProductInfo(page, productInfo, selectedCountryGroup.length === 0 ? "germany" : selectedCountryGroup[0]);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    const delay = 200;

    const timeoutId = setTimeout(() => {
      clearStoreData();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchString]);

  const [selectedValues, setSelectedValues] = useState([]);
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValues(newValue);
  };
  const filteredProducts = filterData.filter((product) =>
    selectedValues.every((selectedValue) =>
      product.articles.some((article) => article.number === selectedValue.value)
    )
  );

  function getProductInfo(page, productInfo = "", country = "germany") {
    getProductsbyFilter(token, { page, productInfo, country }, (success) => {
      if (success.data.code === 200 && success.data.status === "success") {
        setProductList((prevProductList) => {
          const newList = success.data.data.products.map((product) => ({
            label: `${product.name}(${product.article_number})`,
            value: product.article_number
          }));
          // setSelectedValues(newList)
          return newList;
        });
      }
      else {
      }

    })
  }

  return (
    <Autocomplete
      multiple
      id="combo-box-demo"
      options={productList}
      hiddenlabel="true"
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selectedValues}
      onInputChange={(e) => { setSearchString(e.target.value); }}
      onChange={handleAutocompleteChange}
      render
      limitTags={3}
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
                <div className="search-multi pointer" onClick={(e) => setFilterData(filteredProducts)}><img src={search} alt="search" /></div>
              </InputAdornment>
            )
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <div key={option} className="tag">
                {option}
                <CloseIcon
                  {...getTagProps({ index })}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle close tag action here
                  }}
                />
              </div>
            ))
          }
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

];
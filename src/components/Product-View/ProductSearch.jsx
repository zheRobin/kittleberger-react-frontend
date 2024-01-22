import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import { infoActions } from "store/reducer";
import { SearchIcon2 } from "libs/icons";
import "./style/productViewStyle.scss"
import {createSelector} from 'reselect';

const selectUsedArticleData = (state) => state.info.usedArticleData;

const selectUsedArticles = createSelector(
  [selectUsedArticleData],
  (usedArticles) => usedArticles.map((product) => ({
    value: product.id,
    label: `${product.name} (${product.article_number})`,
    article_number: product.article_number
  }))
);
export default function ProductSearch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const filter = useSelector(state => state.info.filterData);
  const [data, setData] = useState([])
  const usedArticles = useSelector(selectUsedArticles);  
  const getUniqueObjects = (array, key) => {
    return [...new Map(array.map(item => [item[key], item])).values()]
  }
  
  const uniqueUsedArticles = getUniqueObjects(usedArticles, 'article_number');
  const handleChange = (event, value) => {
    const selected = value.map(val => val.article_number);
    const updatedFilter = { ...filter, article_list: selected };
    dispatch(infoActions.setProductPage(1));
    dispatch(infoActions.setFilterData(updatedFilter));
    setData(value)
  };
  let options = uniqueUsedArticles.filter(
    product => !data.map(item => item.article_number).includes(product.article_number)
  );
  return (
    <Autocomplete
      multiple
      id="combo-box-demo"
      options={options}
      value={data}
      hiddenlabel="true"
      onChange={handleChange}
      limitTags={3}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "0",
          padding: "0"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #eee"
        },
        "& .MuiButtonBase-root": {
          backgroundColor: "#8F7300",
          color: "white",
        },
        "& .MuiAutocomplete-inputRoot": {
          marginRight: "5px"
        },
        "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
          marginRight: "5px",
        }
      }}
      className="search-bar"
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t("Nach Produkten suchen")}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <div className="search-multi pointer"><img src={SearchIcon2} alt="search"></img></div>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}

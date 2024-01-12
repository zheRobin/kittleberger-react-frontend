import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
// import { getProductsbyFilter } from "libs/_utils/actions";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setFilterData, selectPage, setProductLoadingStatus } from "store/reducer";
import { SearchIcon2 } from "libs/icons";
import "./style/productViewStyle.scss"

export default function ProductSearch({ filters }) {
  const dispatch = useDispatch()
  const usedArticles = useSelector(state => state.info.usedArticleData);
  const [productList, setProductList] = useState([]);
  const [originList, setOriginList] = useState([])
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const { t } = useTranslation()
  const [selectedValues, setSelectedValues] = useState([]);
  const [articleList, setArticleList] = useState([])
  const [initialized, setInitialized] = useState(true);
  useEffect(() => {
    const filterData = {
      ...filters,
      article_list: articleList
    };
    if (initialized) {
      dispatch(selectPage(1));
      setInitialized(false);
    }
    else {
      dispatch(setFilterData(filterData));
      dispatch(selectPage(1));
      dispatch(setProductLoadingStatus(true));
    }
  }, [articleList, initialized]);
  useEffect(
    () => {
      // const selectedArticles = selectedValues.map((item) => { return item.mediaSearchId })
      const selectedArticles = selectedValues.map((item) => { return item.article_number })
      setArticleList(selectedArticles);

    }, [selectedValues]
  )
  useEffect(() => {
    const delay = 200;
    const clearStoreData = () => {
      setProductList([]);
      setPage(1);
      const productInfo = searchString;
      try {
        getProductInfo(page, productInfo, "");

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const timeoutId = setTimeout(() => {
      clearStoreData();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchString, usedArticles]);

  const handleAutocompleteChange = async (event, newValue) => {
    const previousIds = selectedValues.map(item => item.article_number);
    const newlyImported = newValue.filter(item => !previousIds.includes(item.article_number));
    const newlyCreated = newValue.slice(-1)[0];
    const newSetValue = (selectedValues.length < newValue.length) ? (newlyImported.length === 0 ? newValue.filter(item => (item.article_number !== newlyCreated.article_number)) : newValue) : newValue
    setSelectedValues((preValue) => { return newSetValue });
  };
  function getProductInfo(page, productInfo, country) {
    setProductList((prevProductList) => {
      const selectedList = selectedValues.map((item) => {
        return item.article_number
      })
      const filtered = selectedList.length > 0 ? usedArticles.filter((item) => !selectedList.includes(item.article_number)) : usedArticles
      const uniqueUsedArticle = filtered?.reduce((accumulator, current) => {
        const duplicate = accumulator.find(item => item.article_number === current.article_number);
        if (!duplicate) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      const newList = uniqueUsedArticle.map((product) => ({
        label: `${product.name} (${product.article_number})`,
        value: product.id,
        mediaSearchId: product.mediaobject_id,
        article_number: product.article_number
      }));
      return newList;
    });
    setOriginList((prevProductList) => {
      const uniqueUsedArticle = usedArticles?.reduce((accumulator, current) => {
        const duplicate = accumulator.find(item => item.article_number === current.article_number || item.mediaobject_id === current.mediaobject_id);
        if (!duplicate) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      const newList = uniqueUsedArticle.map((product) => ({
        label: `${product.name} (${product.article_number})`,
        value: product.id,
        mediaSearchId: product.mediaobject_id,
        article_number: product.article_number
      }));
      return newList;
    });
  }
  return (
    <Autocomplete
      multiple
      id="combo-box-demo"
      options={productList}
      hiddenlabel="true"
      value={selectedValues}
      onInputChange={(e) => { setSearchString(e.target.value); }}
      onChange={handleAutocompleteChange}
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

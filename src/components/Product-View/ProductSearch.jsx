
import search from "../../assets/icons/search2.svg"
import "./style/productViewStyle.scss"
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { getProductsbyFilter } from "../../_services/Product";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setFilterData, selectPage, setProductLoadingStatus } from "../../store";

export default function ProductSearch({ filterData, usedArticles }) {
  console.log("filterData", filterData)
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const { t } = useTranslation()
  const [selectedValues, setSelectedValues] = useState([]);
  const [articleList, setArticleList] = useState([])
  let filters = useSelector(state => state.templates.filterData)
  useEffect(
    () => {
      const selectedArticles = selectedValues.map((item) => { return item.value })
      setArticleList(selectedArticles)
    }, [selectedValues]
  )
  useEffect(
    () => {
      dispatch(selectPage(1))
      const filterData = Object.keys(filters).length === 0 ? {
        article_number: [],
        application: [],
        brand: [],
        country: [],
        article_list: articleList.length > 1 ? articleList : [],
      } : {
        ...filters, article_list: articleList.length > 1 ? articleList : []
      }
      dispatch(setFilterData(filterData))
      dispatch(setProductLoadingStatus(true))
    }, [articleList]
  )
  useEffect(() => {
    setProductList((prevProductList) => {
      const uniqueUsedArticle = usedArticles?.reduce((accumulator, current) => {
        const duplicate = accumulator.find(item => item.article_number === current.article_number);
        if (!duplicate) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      const newList = uniqueUsedArticle.map((product) => ({
        label: `${product.name} (${product.article_number})`,
        value: product.number
      }));
      return newList;

    });
  }, [usedArticles])
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
  }, [searchString]);

  const handleAutocompleteChange = async (event, newValue) => {
    setSelectedValues((preValue) => { return newValue });

  };

  function getProductInfo(page, productInfo = "", country) {
    getProductsbyFilter(token, { page, productInfo, country }, (success) => {
      setProductList((prevProductList) => {
        const uniqueUsedArticle = usedArticles?.reduce((accumulator, current) => {
          const duplicate = accumulator.find(item => item.article_number === current.article_number);
          if (!duplicate) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        const newList = uniqueUsedArticle.map((product) => ({
          label: `${product.name} (${product.article_number})`,
          value: product.article_number
        }));
        return newList;

      });

    })
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
                <div className="search-multi pointer"><img src={search} alt="search"></img></div>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}

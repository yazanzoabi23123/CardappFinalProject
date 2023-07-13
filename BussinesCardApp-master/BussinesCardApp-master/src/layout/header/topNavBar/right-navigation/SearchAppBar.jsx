import * as React from 'react';
import { useState,useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getCard, getCards } from '../../../../cards/services/cardApiService';
import { useSearchParams } from 'react-router-dom';




const Search = styled('div')(({ theme }) => ({
  
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 400,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
     marginleft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {



  const [cards ,setCards] =useState([]);
const [searchResults, setSearchResults] =useSearchParams();


  const handleSubmit =(e) => e.preventDefault()

  const handleSearchChange=(e)=>{
    setSearchResults({q:e.target.value})
  }

  return (
    
          <Search className="search"
          onSubmit={handleSubmit}>
            
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              className="search_input"
              type="text"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
               onChange={handleSearchChange}
               onSubmit={handleSubmit}
               id="search"
            />
          </Search>

  );
}


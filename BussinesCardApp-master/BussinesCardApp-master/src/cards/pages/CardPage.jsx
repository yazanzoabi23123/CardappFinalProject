import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Cards from "../components/Cards";
import Spinner from "./../../components/Spinner";
import Error from "./../../components/Error";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";

export default function CardPage() {
  
  const { value, handleGetCards, handleDeleteCard,handleLikeCard } = useCards();
  const { cards, error, isLoading,filterCards } = value;
  const {user} =useUser();
  const navigate = useNavigate();
  useEffect(() => {
    handleGetCards();
  }, []);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetCards();
  };
  const handleLike =async (id) =>{
    await handleLikeCard(id);
  }

  console.log(filterCards);
  return (
    <div>
      <Container>
        <PageHeader
          title="Cards"
          subtitle="On this page you can find all bussines cards from all categories"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      </Container>
      
      {user && (
        <AddCircleIcon position="sticky"  color="primary"
        onClick={()=>navigate(`${ROUTES.ADD_CARDS}`)}
         sx={{
          marginLeft:170,
          Color:"blue",
          fontSize: 50
         }}
          />
        )}
      

    </div>
  );
}

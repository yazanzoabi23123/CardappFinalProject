import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';

export default function FavCards() {
  const { value, handleDeleteCard, handleLikeCard,handleGetFavCards } = useCards();
  const { cards, error, isLoading,filterCards } = value;


  
  useEffect(()=>{
      handleGetFavCards();
  },[])
  const handleLike =async (id) =>{
    await handleLikeCard(id);
  }

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetFavCards();
  };
  return (
    <div>
      <Container>
        <PageHeader
          title="Favorite Cards"
          subtitle="Here you can find your favorite business cards"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}  
          handleDelete={handleDelete} 
          handleLike={handleLike}
        />
      </Container>
    </div>
  )
}

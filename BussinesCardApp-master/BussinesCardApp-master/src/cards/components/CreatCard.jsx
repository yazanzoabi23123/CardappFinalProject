import { Container } from '@mui/material'
import React from 'react'
import CardForm from './CardForm'
import useCards from '../hooks/useCards'
import normalizeCard from '../helpers/normalization/normalizeCard';
import useForm from '../../forms/hooks/useForm';
import cardSchema from '../models/joi-schema/cardSchema';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import { useUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import { Navigate } from 'react-router-dom';
export default function CreatCard() {

  const {handleCreateCard}=useCards();
   const {user }=useUser();
  const { data,errors,setData, ...rest } = useForm(initialCardForm, cardSchema, () => {
    handleCreateCard({
      ...normalizeCard({ ...data }),
      user_id: user.id,
      likes:[]
    });
  });
  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <CardForm
        title="Creat card"
       onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={errors}
       onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={data}
      />
    </Container>
  );
}

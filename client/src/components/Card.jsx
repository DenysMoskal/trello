import React from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../store/slices/listSlice";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment/moment";

const Card = ({ card, listId }) => {
  const dispatch = useDispatch();

  const deleteCardHandler = () => {
    dispatch(deleteCard({ cardId: card._id, listId }));
  };

  const time = moment(card.createdAt).fromNow();

  return (
    <div className="flex justify-between items-center bg-slate-400 roudned my-2 p-2 mx-2 shadow-xl">
      <div className=" pl-6 ">
        <div className="text-lg ">{card.title}</div>
        <div className="text-sm text-red-800">Create {time}</div>
      </div>
      <Button onClick={deleteCardHandler} variant="text" color="error">
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default Card;

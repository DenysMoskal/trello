import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../store/slices/listSlice";
import { selectModalInfo } from "../store/slices/modalSlice";
import { setCloseModal } from "../store/slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const { listId } = useSelector(selectModalInfo);

  const closeModalHandler = () => {
    dispatch(setCloseModal());
  };

  const addCardHandler = (e) => {
    e.preventDefault();
    const listData = {
      title,
    };

    dispatch(addCard({ listId, listData }));
    closeModalHandler();
  };

  return (
    <form
      id="myModal"
      className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
      onSubmit={addCardHandler}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-auto py-10">
        <div className="flex justify-center items-center">
          <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            className="border-2 border-black my-2"
            type="text"
            placeholder="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-2">
          <Button className="border-2 border-black mr-2" type="submit">
            Add
          </Button>
          <Button
            className="border-2 border-black"
            onClick={closeModalHandler}
            color="error"
          >
            close
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Modal;

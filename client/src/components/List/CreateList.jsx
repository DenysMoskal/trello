import { useState } from "react";
import { createList } from "../../store/slices/listSlice";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

const CreateList = () => {
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState("");

  const addListhandler = (e) => {
    e.preventDefault();
    const readyTitle = { title: listTitle };
    dispatch(createList(readyTitle));
    setListTitle("");
  };

  return (
    <form onSubmit={addListhandler} className="flex justify-center my-2 ">
      <TextField
        id="outlined-basic"
        label="New list"
        variant="outlined"
        className="mr-[10px]"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />
      <Button variant="contained" type="submit" className="m-2">
        add
      </Button>
    </form>
  );
};

export default CreateList;

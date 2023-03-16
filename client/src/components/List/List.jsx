import { setOpenModal } from "../../store/slices/modalSlice";
import { deleteList } from "../../store/slices/listSlice";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ list, children }) => {
  const dispatch = useDispatch();
  const { title, _id } = list;

  const openModalHandler = () => {
    dispatch(setOpenModal(_id));
  };

  const delteListHandler = () => {
    dispatch(deleteList(_id));
  };

  return (
    <div className="border-2 min-w-[300px] flex flex-col mx-2 bg-slate-200 rounded ">
      <div>
        <div className="flex justify-between border-2 bg-yellow-300 rounded pl-6 py-4  ">
          <h1 className="text-center text-xl">{title}</h1>
          <Button onClick={delteListHandler} variant="text">
            <DeleteIcon /> All
          </Button>
        </div>
        {children}
      </div>
      <button
        className="text-white bg-blue-600 mt-auto w-full py-2 hover:bg-blue-700"
        onClick={openModalHandler}
      >
        Add new todo
      </button>
    </div>
  );
};

export default List;

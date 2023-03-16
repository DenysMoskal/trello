import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, selectLists } from "../store/slices/listSlice";
import { selectModalInfo } from "../store/slices/modalSlice";
import Modal from "./Modal";
import Draggeble from "./DashBoard";

export const Board = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  const { isModalOpen } = useSelector(selectModalInfo);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  return (
    <>
      <div className="flex justify-center mt-4 columns-3">
        <Draggeble lists={lists} />
      </div>
      {isModalOpen && <Modal />}
    </>
  );
};

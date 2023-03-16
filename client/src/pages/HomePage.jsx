import { Board } from "../components/Board";

import CreateList from "../components/List/CreateList";

const HomePage = () => {
  return (
    <div>
      <CreateList />
      <Board />
    </div>
  );
};

export default HomePage;

import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

const App: FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useHotkeys("`", () => {
    navigate("/settings");
  });

  return (
    <div className="death-note-bg h-screen w-screen flex items-center justify-center">
      <p className="death-note-text">
        {currentUser?.username[0].toUpperCase()}
      </p>
    </div>
  );
};

export default App;

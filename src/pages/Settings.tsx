import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Button from "../components/Button";
import styles from "../styles/Settings.module.scss";

export default function Settings() {
  const [username, setUsername] = useState("");
  const handshakeMutation = useMutation(
    "/handshake",
    () => axios.post("/handshake", { username }),
    {
      onSuccess: () => {
        toast.success("Request sent");
      },
    }
  );

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    handshakeMutation.mutate();
  };
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Button>New Handshake</Button>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

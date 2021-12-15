import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import HandshakesList from "../components/HandshakesList";
import PeersList from "../components/PeersList";
import { IHandshake } from "../interfaces/IHandshake";
import styles from "../styles/Settings.module.scss";

export default function Settings() {
  const [username, setUsername] = useState("");
  const queryClient = useQueryClient();
  const handshakeMutation = useMutation(
    "/handshakes/offers",
    (username: string) =>
      axios.post<IHandshake>("/handshakes/offers", { username }),
    {
      onSuccess: (res) => {
        const { data: handshake } = res;
        queryClient.setQueryData<IHandshake[]>("/handshakes/offers", (prev) => [
          ...prev,
          handshake,
        ]);
        toast.success("Request sent");

        // Clear fields
        setUsername("");
      },
    }
  );

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    handshakeMutation.mutate(username);
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
        <Route exact path="/settings" component={HandshakesList} />
        <Route exact path="/settings/peers" component={PeersList} />
      </div>
    </div>
  );
}

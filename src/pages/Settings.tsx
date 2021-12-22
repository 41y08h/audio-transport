import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import HandshakesList from "../components/HandshakesList";
import PeersList from "../components/PeersList";
import { useAuth } from "../contexts/AuthContext";
import useEventSubscription from "../hooks/useEventSubscription";
import { ICallInitData } from "../interfaces/call";
import { IHandshake } from "../interfaces/IHandshake";
import "../RTCs/socket";
import styles from "../styles/Settings.module.scss";

export default function Settings() {
  const { currentUser } = useAuth();
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

  useEventSubscription("peerIsCalling", (data) => {
    console.log("peerIsCalling", data);
  });

  return (
    <div className={styles.container}>
      {currentUser.username}
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

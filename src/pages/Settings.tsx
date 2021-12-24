import axios from "axios";
import { FormEventHandler, Fragment, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import HandshakesList from "../components/HandshakesList";
import PeersList from "../components/PeersList";
import { useAuth } from "../contexts/AuthContext";
import useEventSubscription from "../hooks/useEventSubscription";
import { ICallData } from "../interfaces/call";
import { IHandshake } from "../interfaces/IHandshake";
import "../RTCs/socket";

import Peer, { Instance as SimplePeerInstance } from "simple-peer";
import socket from "../RTCs/socket";
import { AiOutlineUser } from "react-icons/ai";
import { Transition, Dialog } from "@headlessui/react";
import HandshakeDialog from "../components/HandshakeDialog";

type CallState = "idle" | "connecting" | "connected";

export default function Settings() {
  const { currentUser } = useAuth();
  const [isHandshakeModalOpen, setIsHandshakeModalOpen] = useState(false);

  // These two state are present in caller's app instance
  const [caller, setCaller] = useState<SimplePeerInstance>();
  const [calleeUsername, setCalleeUsername] = useState<string>();

  // These two state are present in callee's app instance
  const [callee, setCallee] = useState<SimplePeerInstance>();
  const [callerUsername, setCallerUsername] = useState<string>();

  // These two elements are present in both caller and callee's app instance
  const [callState, setCallState] = useState<CallState>("idle");
  const remoteAudioRef = useRef<HTMLAudioElement>();

  // Caller's app instance
  async function callPeer(username: string) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const caller = new Peer({ initiator: true, trickle: false, stream });
    setCaller(caller);
    setCallState("connecting");
    setCalleeUsername(username);
  }

  useEventSubscription("peerSignal", (signal) => {
    console.log("got callee signal", signal);
    caller.signal(signal);
  });

  useEffect(() => {
    if (!caller) return;
    console.log("attaching caller event listeners ...");

    function onCallerSignal(signal) {
      const call: ICallData = { username: calleeUsername, signal };

      console.log("sent caller signal", signal);
      socket.emit("callPeer", call);
    }

    function onConnect() {
      setCallState("connected");
    }

    function onStream(stream) {
      const remoteAudio = remoteAudioRef.current;
      remoteAudio.srcObject = stream;
    }

    caller.on("signal", onCallerSignal);
    caller.on("connect", onConnect);
    caller.on("stream", onStream);

    return () => {
      caller.off("signal", onCallerSignal);
      caller.off("connect", onConnect);
      caller.off("stream", onStream);
    };
  }, [caller, calleeUsername]);

  // Callee's app instance
  useEventSubscription("peerIsCalling", async (call) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const callee = new Peer({ initiator: false, trickle: false, stream });
    setCallee(callee);
    setCallState("connecting");
    setCallerUsername(call.username);
    callee.signal(call.signal);
    console.log("got caller signal", call.signal);
  });

  useEffect(() => {
    if (!callee) return;
    console.log("attaching callee event listeners ...");

    function onCalleeSignal(signal) {
      console.log("sent callee signal", signal);
      socket.emit("calleeSignal", signal);
    }

    function onConnect() {
      setCallState("connected");
    }
    function onStream(stream) {
      const remoteAudio = remoteAudioRef.current;
      remoteAudio.srcObject = stream;
    }

    callee.on("signal", onCalleeSignal);
    callee.on("connect", onConnect);
    callee.on("stream", onStream);

    return () => {
      callee.off("signal", onCalleeSignal);
      callee.off("connect", onConnect);
      callee.off("stream", onStream);
    };
  }, [callee]);

  function toggleHandshakeModal() {
    setIsHandshakeModalOpen((isHandshakeModalOpen) => !isHandshakeModalOpen);
  }

  return (
    <div className="bg-gray-800 h-screen text-white">
      <div className="max-w-4xl mx-auto h-full px-4 py-8">
        <div className="flex space-x-2 px-3 py-2 w-fit ml-auto bg-blue-600 rounded-md">
          <AiOutlineUser className="text-2xl" />
          <span>@{currentUser.username}</span>
        </div>
        <Button className="font-bold" onClick={toggleHandshakeModal}>
          New Handshake
        </Button>
        <HandshakeDialog
          isOpen={isHandshakeModalOpen}
          onClose={toggleHandshakeModal}
        />

        {calleeUsername && (
          <div style={{ height: "500px", fontSize: "5rem" }}>
            {{ connecting: "calling", connected: "connected" }[callState]}{" "}
            {calleeUsername}
          </div>
        )}
        {callerUsername && (
          <div style={{ height: "500px", fontSize: "5rem" }}>
            {{ connecting: "calling", connected: "connected" }[callState]}{" "}
            {callerUsername}
          </div>
        )}
        <audio ref={remoteAudioRef} autoPlay />
        <Route exact path="/settings" component={HandshakesList} />
        <Route
          exact
          path="/settings/peers"
          render={() => <PeersList callPeer={callPeer} />}
        />
      </div>
    </div>
  );
}

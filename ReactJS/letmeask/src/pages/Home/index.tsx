import { FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "components/Button";

import IllustrationImg from "assets/images/illustration.svg";
import LogoImg from "assets/images/logo.svg";
import GoogleIconImg from "assets/images/google-icon.svg";

import "styles/pages/auth.scss";

import { useAuth } from "hooks/useAuth";
import { useStates } from "states";
import { database } from "services/firebase";

export function Home() {
  const { push } = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const { roomCode, setRoomCode } = useStates();

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={IllustrationImg}
          alt="illustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

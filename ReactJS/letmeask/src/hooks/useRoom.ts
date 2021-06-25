import { useEffect } from "react";
import { useStates } from "states";
import { database } from "services/firebase";
import { useAuth } from "hooks/useAuth";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const {
    questions,
    setQuestions,
    title,
    setTitle,
    newQuestion,
    setNewQuestion,
  } = useStates();
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;
      if (!firebaseQuestions) return;
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
    return () => {
      roomRef.off("value");
    };
    // eslint-disable-next-line
  }, [roomId, user?.id]);

  return {
    questions,
    setQuestions,
    title,
    setTitle,
    newQuestion,
    setNewQuestion,
  };
}

import { useState } from "react";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useStates() {
  const [newRoom, setNewRoom] = useState(""),
    [roomCode, setRoomCode] = useState(""),
    [newQuestion, setNewQuestion] = useState(""),
    [questions, setQuestions] = useState<QuestionType[]>([]),
    [title, setTitle] = useState("");

  return {
    roomCode,
    setRoomCode,

    newRoom,
    setNewRoom,

    newQuestion,
    setNewQuestion,

    questions,
    setQuestions,

    title,
    setTitle,
  };
}

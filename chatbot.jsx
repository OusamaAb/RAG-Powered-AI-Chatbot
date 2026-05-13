const { useState: useStateChat } = React;

const CHAT_API_ERROR =
  "I could not reach the portfolio chat API. Start the local Node dev server and try again.";

function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Typing">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

function useOusamaChat({ greeting }) {
  const starters = [
    "Tell me about Ousama's projects.",
    "What is his strongest full-stack project?",
    "What backend experience does he have?",
    "What did he do at the Ministry of Transportation?"
  ];

  const [messages, setMessages] = useStateChat([
    { role: "assistant", content: greeting }
  ]);
  const [pending, setPending] = useStateChat(false);

  const send = async (content) => {
    const question = content.trim();
    if (!question || pending) return;

    setMessages((current) => [...current, { role: "user", content: question }]);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.answer || "I don't have enough information about that from Ousama's portfolio content.",
            sources: data.sources || []
          }
        ]);
        return;
      }
      
      const data = await response.json().catch(() => ({}));
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.error || CHAT_API_ERROR,
          error: true
        }
      ]);
      return;
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: CHAT_API_ERROR,
          error: true
        }
      ]);
    } finally {
      setPending(false);
    }
  };

  const reset = () => {
    setMessages([{ role: "assistant", content: greeting }]);
  };

  return { messages, pending, send, reset, starters };
}

Object.assign(window, { TypingDots, useOusamaChat });

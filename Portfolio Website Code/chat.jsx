// Direction B — Hero chat (embedded, primary surface)

const { useState: useStateBC, useEffect: useEffectBC, useRef: useRefBC } = React;

function HeroChatB() {
  const { messages, pending, send, reset, starters } = window.useOusamaChat({
    greeting: "Hey — I'm Ousama (in chatbot form). Ask me about my projects, the work I did at MTO, what I'm building now, or anything you'd want to know before reaching out."
  });
  const [draft, setDraft] = useStateBC("");
  const scrollRef = useRefBC(null);
  const inputRef = useRefBC(null);

  useEffectBC(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, pending]);

  const submit = (e) => {
    e?.preventDefault();
    if (!draft.trim() || pending) return;
    send(draft);
    setDraft("");
  };

  return (
    <div className="panel hero-chat">
      <div className="hc-head">
        <div className="hc-left">
          <image-slot
            id="ousama-headshot"
            shape="circle"
            placeholder="O"
            class="hc-avatar-slot"
            style={{ display: "block", width: "38px", height: "38px", flexShrink: 0 }}
          ></image-slot>
          <div>
            <div className="hc-name">Chat with Ousama</div>
            <div className="hc-sub">first-person · portfolio RAG preview</div>
          </div>
        </div>
        <button className="hc-restart" onClick={reset} title="Start over">↻</button>
      </div>

      <div className="hc-body" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={"hc-msg " + m.role + (m.error ? " error" : "")}>
            {m.role === "assistant" && (
              <image-slot
                id="ousama-headshot"
                shape="circle"
                placeholder="O"
                class="hc-ava-slot"
                style={{ display: "block", width: "28px", height: "28px", flexShrink: 0, marginTop: "4px" }}
              ></image-slot>
            )}
            <div className="bub">{m.content}</div>
          </div>
        ))}
        {pending && (
          <div className="hc-msg assistant">
            <image-slot
              id="ousama-headshot"
              shape="circle"
              placeholder="O"
              class="hc-ava-slot"
              style={{ display: "block", width: "28px", height: "28px", flexShrink: 0, marginTop: "4px" }}
            ></image-slot>
            <div className="bub"><window.TypingDots /></div>
          </div>
        )}
      </div>

      {messages.length <= 1 && !pending && (
        <div className="hc-starters">
          {starters.slice(0, 4).map((s, i) => (
            <button key={i} onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      <form className="hc-input" onSubmit={submit}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Ousama anything…"
          disabled={pending}
        />
        <button type="submit" disabled={pending || !draft.trim()}>
          Send <kbd>↵</kbd>
        </button>
      </form>
    </div>
  );
}

window.HeroChatB = HeroChatB;

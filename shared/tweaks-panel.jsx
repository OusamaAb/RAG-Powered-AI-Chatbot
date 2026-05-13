const { useState: useStateTweaks } = React;

function useTweaks(defaults) {
  const [values, setValues] = useStateTweaks(defaults);

  const setTweak = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  };

  return [values, setTweak];
}

function TweaksPanel({ title, children }) {
  return (
    <aside className="tweaks-panel" aria-label={title}>
      {children}
    </aside>
  );
}

function TweakSection({ label }) {
  return <div className="tweak-section">{label}</div>;
}

function TweakToggle({ label, value, onChange }) {
  return (
    <label className="tweak-row">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function TweakColor({ label, value, options, onChange }) {
  return (
    <div className="tweak-row">
      <span>{label}</span>
      <div className="tweak-colors">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="tweak-swatch"
            aria-label={`Use accent ${option}`}
            data-active={option === value ? "1" : "0"}
            style={{ background: option }}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakToggle,
  TweakColor
});

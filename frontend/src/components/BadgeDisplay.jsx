function getSymbolIcon(symbol) {
  const value = symbol.toLowerCase();

  if (
    value.includes("k9") ||
    value.includes("dog")
  ) {
    return "🐕";
  }

  if (value.includes("paw")) {
    return "🐾";
  }

  if (value.includes("heart")) {
    return "♥";
  }

  if (
    value.includes("medical") ||
    value.includes("cross")
  ) {
    return "✚";
  }

  if (
    value.includes("city") ||
    value.includes("skyline")
  ) {
    return "🏙";
  }

  if (value.includes("star")) {
    return "★";
  }

  if (
    value.includes("shield") ||
    value.includes("badge")
  ) {
    return "◆";
  }

  return "★";
}


function BadgeDisplay({ badge }) {
  if (!badge?.badge_name) {
    return null;
  }

  const colors = badge.badge_colors
    ? badge.badge_colors
        .split(",")
        .map((color) => color.trim())
    : [];

  const symbols = badge.badge_symbols
    ? badge.badge_symbols
        .split(",")
        .map((symbol) => symbol.trim())
    : [];

  const primaryColor = colors[0] || "#2f513f";
  const secondaryColor = colors[1] || "#ffffff";
  const accentColor = colors[2] || "#ffffff";

  return (
    <div
      className="badge-display"
      style={{
        "--badge-primary": primaryColor,
        "--badge-secondary": secondaryColor,
        "--badge-accent": accentColor,
      }}
    >
      <div className="badge-inner">
        <div className="badge-k9-mark">
          🐾
        </div>

        <h3>{badge.badge_name}</h3>

        <div className="badge-symbols">
          {symbols.map((symbol) => (
            <div
              className="badge-symbol"
              key={symbol}
              title={symbol}
            >
              <span className="badge-symbol-icon">
                {getSymbolIcon(symbol)}
              </span>

              <span className="badge-symbol-label">
                {symbol}
              </span>
            </div>
          ))}
        </div>

        <p className="badge-motto">
          {badge.badge_motto}
        </p>

        <div className="badge-footer">
          FUR MISSILE
        </div>
      </div>
    </div>
  );
}


export default BadgeDisplay;
export function Avatar({ name, color, size = 36 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.38,
        color: "#0d0d12",
        flexShrink: 0,
        fontFamily: "inherit",
      }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

const dots = [
  { top: "6%", left: "8%" },
  { top: "12%", left: "75%" },
  { top: "18%", left: "45%" },
  { top: "22%", left: "92%" },
  { top: "30%", left: "3%" },
  { top: "35%", left: "55%" },
  { top: "42%", left: "20%" },
  { top: "48%", left: "88%" },
  { top: "55%", left: "35%" },
  { top: "60%", left: "68%" },
  { top: "68%", left: "12%" },
  { top: "72%", left: "50%" },
  { top: "78%", left: "82%" },
  { top: "85%", left: "28%" },
  { top: "92%", left: "65%" },
];

export const AmbientDots = () => (
  <>
    {dots.map((pos, i) => (
      <div
        key={i}
        className="ambient-dot"
        style={{ top: pos.top, left: pos.left, animationDelay: `${i * -1.5}s` }}
      />
    ))}
  </>
);

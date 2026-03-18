type WaveDividerProps = {
  fill?: string;
  className?: string;
  flip?: boolean;
};

export const WaveDivider = ({ fill = "var(--color-bg-dark)", className = "", flip }: WaveDividerProps) => (
  <svg
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
    className={`block w-full -mb-px ${flip ? "rotate-180" : ""} ${className}`}
    aria-hidden="true"
  >
    <path
      d="M0,60 C360,0 720,90 1080,30 C1260,0 1380,20 1440,40 L1440,100 L0,100 Z"
      fill={fill}
    />
  </svg>
);

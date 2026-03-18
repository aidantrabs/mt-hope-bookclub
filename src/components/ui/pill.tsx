type PillProps = {
    children: React.ReactNode;
    variant?: "highlight" | "accent" | "muted";
};

const variants = {
    highlight: "bg-highlight-soft text-highlight",
    accent: "bg-accent-soft text-accent",
    muted: "bg-border text-text-secondary",
};

export const Pill = ({ children, variant = "highlight" }: PillProps) => (
    <span
        className={`inline-block rounded-full px-3 py-1 text-xs uppercase tracking-wider font-medium ${variants[variant]}`}
    >
        {children}
    </span>
);

type SectionLabelProps = {
    children: React.ReactNode;
    dark?: boolean;
};

export const SectionLabel = ({ children, dark }: SectionLabelProps) => (
    <p
        className={`text-xs uppercase tracking-widest font-medium ${
            dark ? "text-text-muted-dark" : "text-text-secondary"
        }`}
    >
        {children}
    </p>
);

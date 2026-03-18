type SectionLabelProps = {
  children: React.ReactNode;
  dark?: boolean;
};

export const SectionLabel = ({ children, dark }: SectionLabelProps) => (
  <p className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
    dark ? "text-text-muted-dark" : "text-text-secondary"
  }`}>
    {children}
  </p>
);

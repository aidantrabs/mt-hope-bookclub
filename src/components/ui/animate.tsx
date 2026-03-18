import { useAnimate } from "@hooks/use-animate.ts";

type AnimateProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "p" | "li" | "section";
};

export const Animate = ({ children, className = "", delay = 0, as: Tag = "div" }: AnimateProps) => {
    const ref = useAnimate<HTMLDivElement>();

    return (
        <Tag
            // @ts-expect-error -- ref works across these tags
            ref={ref}
            className={`animate-on-scroll ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
};

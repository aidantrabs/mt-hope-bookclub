import { useCallback, useEffect, useRef, useState } from "react";

type TiltStyle = {
    transform: string;
    transition: string;
};

const defaultStyle: TiltStyle = {
    transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.4s ease-out",
};

export const useTilt = (maxTilt = 8) => {
    const ref = useRef<HTMLElement>(null);
    const [style, setStyle] = useState<TiltStyle>(defaultStyle);
    const frameRef = useRef<number>(0);

    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const disabled = isTouch || prefersReducedMotion;

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (disabled || !ref.current) return;
            cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(() => {
                const el = ref.current;
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                setStyle({
                    transform: `perspective(600px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(1.02)`,
                    transition: "transform 0.1s ease-out",
                });
            });
        },
        [disabled, maxTilt],
    );

    const handleMouseLeave = useCallback(() => {
        if (disabled) return;
        cancelAnimationFrame(frameRef.current);
        setStyle(defaultStyle);
    }, [disabled]);

    useEffect(() => {
        const el = ref.current;
        if (!el || disabled) return;

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(frameRef.current);
        };
    }, [handleMouseMove, handleMouseLeave, disabled]);

    return { ref, style: disabled ? {} : style };
};

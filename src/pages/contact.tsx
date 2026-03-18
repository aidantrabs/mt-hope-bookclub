import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { useSignalReadyOnMount } from "@hooks/use-initial-load.ts";

export const Contact = () => {
  useSignalReadyOnMount();

  return (
    <div>
      <section className="gradient-mesh-light noise-overlay py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-5 relative z-[2]">
          <div className="hero-fade-in mb-12 md:mb-20">
            <SectionLabel>reach out</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mt-3 leading-tight">
              get in <em className="italic text-accent">touch.</em>
            </h1>
            <p className="text-text-secondary leading-relaxed md:text-lg mt-4 max-w-lg">
              want to join the club, suggest a book, or just say hi? here's how
              to find us.
            </p>
          </div>

          <div className="space-y-6 mb-16 md:mb-24">
            <Animate>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                <span className="text-xs uppercase tracking-widest font-medium text-accent w-20 shrink-0">
                  call
                </span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+18683477243" className="text-text-primary hover:text-accent transition-colors">
                    <span className="text-text-secondary">dominique</span> — (868) 347-7243
                  </a>
                  <a href="tel:+18687322157" className="text-text-primary hover:text-accent transition-colors">
                    <span className="text-text-secondary">mohith</span> — (868) 732-2157
                  </a>
                </div>
              </div>
            </Animate>
            <Animate delay={100}>
              <div className="w-full h-px bg-border" />
            </Animate>
            <Animate delay={150}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                <span className="text-xs uppercase tracking-widest font-medium text-accent w-20 shrink-0">
                  email
                </span>
                <a href="mailto:mt.hopebookclub@gmail.com" className="text-text-primary hover:text-accent transition-colors">
                  mt.hopebookclub@gmail.com
                </a>
              </div>
            </Animate>
            <Animate delay={200}>
              <div className="w-full h-px bg-border" />
            </Animate>
            <Animate delay={250}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                <span className="text-xs uppercase tracking-widest font-medium text-accent w-20 shrink-0">
                  social
                </span>
                <a href="https://www.instagram.com/mt.hopebookclub" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent transition-colors">
                  @mt.hopebookclub
                </a>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-14 md:pb-20">
        <WaveDivider fill="var(--color-bg-light)" flip className="h-12 md:h-20" />
        <AmbientDots />
        <div className="max-w-4xl mx-auto px-5 relative z-[2] pt-10 md:pt-16">
          <Animate>
            <SectionLabel dark>prefer to message us?</SectionLabel>
            <p className="text-text-muted-dark mt-3 mb-6 max-w-md leading-relaxed">
              drop us an email and we'll get back to you.
            </p>
            <a
              href="mailto:mt.hopebookclub@gmail.com"
              className="inline-block bg-accent text-white rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors"
            >
              send an email
            </a>
          </Animate>
        </div>
      </section>
    </div>
  );
};

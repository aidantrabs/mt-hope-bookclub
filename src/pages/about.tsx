import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { useSignalReadyOnMount } from "@hooks/use-initial-load.ts";

export const About = () => {
  useSignalReadyOnMount();

  return (
    <div>
      <section className="gradient-mesh-light noise-overlay py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 relative z-[2]">
          <div className="hero-fade-in text-center mb-14 md:mb-20">
            <SectionLabel>who we are</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mt-3 mb-5 leading-tight">
              about the <em className="italic text-accent">club</em>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              a small community of readers in trinidad & tobago, turning pages
              and exploring worlds — one book at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            <Animate>
              <div className="glass-light rounded-2xl p-6 md:p-8">
                <span className="text-2xl mb-3 block">&#128214;</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-2">
                  the mission
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  we come together to explore stories across every genre — from
                  fantasy and literary fiction to romance and thrillers — and
                  have honest, sometimes heated, always fun conversations about
                  the books we read.
                </p>
              </div>
            </Animate>
            <Animate delay={100}>
              <div className="glass-light rounded-2xl p-6 md:p-8">
                <span className="text-2xl mb-3 block">&#127793;</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-2">
                  how it started
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  we started as a group of friends who wanted to read more
                  intentionally and hold each other accountable. what we didn't
                  expect was how much the discussions would change the way we see
                  the books — and each other.
                </p>
              </div>
            </Animate>
            <Animate delay={200}>
              <div className="glass-light rounded-2xl p-6 md:p-8">
                <span className="text-2xl mb-3 block">&#128172;</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-2">
                  how it works
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  we typically pick a new book every few weeks, read at our own
                  pace, and meet up to talk it through. sometimes we agree.
                  sometimes we don't. that's the best part.
                </p>
              </div>
            </Animate>
          </div>

        </div>
      </section>

      <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-16 md:pb-24">
        <WaveDivider fill="var(--color-bg-light)" flip className="h-12 md:h-20" />
        <AmbientDots />
        <div className="max-w-3xl mx-auto px-5 text-center relative z-[2] pt-10 md:pt-16">
          <Animate>
            <SectionLabel dark>follow along</SectionLabel>
            <p className="text-text-muted-dark mt-3 mb-8 max-w-md mx-auto leading-relaxed">
              we post recaps, reading updates, and the occasional hot take. come say hi.
            </p>
            <a
              href="https://www.instagram.com/mt.hopebookclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors"
            >
              @mt.hopebookclub
            </a>
          </Animate>
        </div>
      </section>
    </div>
  );
};

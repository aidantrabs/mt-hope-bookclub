import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { useSignalReadyOnMount } from "@hooks/use-initial-load.ts";

const genres = [
  "fantasy",
  "thriller",
  "romance",
  "mystery",
  "sci-fi",
  "contemporary",
  "horror",
  "non-fiction",
];

export const About = () => {
  useSignalReadyOnMount();

  return (
    <div>
      <section className="gradient-mesh-light noise-overlay py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-5 relative z-[2]">
          <div className="hero-fade-in text-center mb-16 md:mb-28">
            <SectionLabel>who we are</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mt-3 mb-6 leading-tight">
              about the <em className="italic text-accent">club</em>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto mb-20 md:mb-28">
            <Animate>
              <p className="text-xl md:text-3xl font-bold text-text-primary leading-snug mb-8 text-center md:text-left">
                founded by dominique & mohith — two UWI medical sciences
                students who really like{" "}
                <em className="italic text-accent">reading.</em>
              </p>
            </Animate>
            <Animate delay={100}>
              <div className="w-12 h-px bg-accent mx-auto md:mx-0 mb-8" />
            </Animate>
            <Animate delay={150}>
              <p className="text-text-secondary leading-relaxed md:text-lg text-center md:text-left">
                mt. hope book club is a community of readers based in trinidad &
                tobago. we explore stories across every genre and have honest,
                sometimes heated, always fun conversations about the books we
                read. all readers are welcome — you don't need to be a UWI
                student to join.
              </p>
            </Animate>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20 max-w-4xl mx-auto mb-20 md:mb-28">
            <Animate>
              <div>
                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                  01 — rhythm
                </span>
                <p className="text-text-primary leading-relaxed mt-3 md:text-lg">
                  we pick a new book every few weeks, read at our own pace, and
                  meet up to talk it through. sometimes we agree. sometimes we
                  don't. that's the best part.
                </p>
              </div>
            </Animate>
            <Animate delay={100}>
              <div>
                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                  02 — the discussions
                </span>
                <p className="text-text-primary leading-relaxed mt-3 md:text-lg">
                  every book gets a full discussion — ratings, favourite quotes,
                  hot takes, and the occasional argument. we track it all so we
                  can look back and remember why a book hit different.
                </p>
              </div>
            </Animate>
            <Animate delay={200}>
              <div>
                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                  03 — open doors
                </span>
                <p className="text-text-primary leading-relaxed mt-3 md:text-lg">
                  whether you've read a hundred books or you're just getting
                  started, you're welcome here. all you need is curiosity and
                  something to say.
                </p>
              </div>
            </Animate>
            <Animate delay={300}>
              <div>
                <span className="text-xs uppercase tracking-widest font-medium text-accent">
                  04 — what we read
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full px-3.5 py-1 text-xs uppercase tracking-wider font-medium bg-highlight-soft text-highlight"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
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

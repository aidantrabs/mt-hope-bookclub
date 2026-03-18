import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";

export const About = () => (
  <div>
    <section className="bg-bg-light py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="hero-fade-in">
          <SectionLabel>who we are</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-10">
            about the club
          </h1>
        </div>

        <div className="space-y-5 text-text-primary leading-relaxed">
          <Animate as="p">
            mt. hope book club is a small community of readers based in trinidad & tobago.
            we come together to explore stories across every genre — from fantasy and literary
            fiction to romance and thrillers — and have honest, sometimes heated, always fun
            conversations about the books we read.
          </Animate>
          <Animate as="p" delay={100}>
            we started as a group of friends who wanted to read more intentionally and hold
            each other accountable. what we didn't expect was how much the discussions would
            change the way we see the books — and each other.
          </Animate>
          <Animate as="p" delay={200}>
            we typically pick a new book every few weeks, read at our own pace, and meet up
            to talk it through. sometimes we agree. sometimes we don't. that's the best part.
          </Animate>
        </div>
      </div>
    </section>

    <WaveDivider className="h-12 md:h-20" />
    <section className="bg-bg-dark py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5 text-center">
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

import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";

export const Contact = () => (
  <div>
    <section className="bg-bg-light py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="hero-fade-in">
          <SectionLabel>reach out</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-10">
            get in touch
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <Animate>
            <div className="bg-bg-card rounded-2xl p-6 border border-border">
              <SectionLabel>dominique</SectionLabel>
              <a href="tel:+18683477243" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
                (868) 347-7243
              </a>
            </div>
          </Animate>
          <Animate delay={100}>
            <div className="bg-bg-card rounded-2xl p-6 border border-border">
              <SectionLabel>mohith</SectionLabel>
              <a href="tel:+18687322157" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
                (868) 732-2157
              </a>
            </div>
          </Animate>
        </div>

        <div className="space-y-4">
          <Animate delay={200}>
            <div className="bg-bg-card rounded-2xl p-6 border border-border">
              <SectionLabel>email</SectionLabel>
              <a href="mailto:mt.hopebookclub@gmail.com" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
                mt.hopebookclub@gmail.com
              </a>
            </div>
          </Animate>
          <Animate delay={300}>
            <div className="bg-bg-card rounded-2xl p-6 border border-border">
              <SectionLabel>instagram</SectionLabel>
              <a href="https://www.instagram.com/mt.hopebookclub" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
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
      <Animate>
        <div className="max-w-3xl mx-auto px-5 text-center relative z-[2] pt-8 md:pt-12">
          <SectionLabel dark>prefer to message us?</SectionLabel>
          <p className="text-text-muted-dark mt-3 mb-6 max-w-md mx-auto leading-relaxed">
            drop us an email and we'll get back to you.
          </p>
          <a
            href="mailto:mt.hopebookclub@gmail.com"
            className="inline-block bg-accent text-white rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors"
          >
            send an email
          </a>
        </div>
      </Animate>
    </section>
  </div>
);

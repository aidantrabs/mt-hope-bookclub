import { SectionLabel } from "@/components/ui/section-label.tsx";
import { Animate } from "@/components/ui/animate.tsx";

export const Contact = () => (
  <div className="bg-bg-light py-16 md:py-24">
    <div className="max-w-3xl mx-auto px-5">
      <div className="hero-fade-in">
        <SectionLabel>reach out</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl text-text-primary mt-3 mb-10">
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
  </div>
);

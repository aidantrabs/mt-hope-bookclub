import { SectionLabel } from "@/components/ui/section-label.tsx";

export const Contact = () => (
  <div className="bg-bg-light py-16 md:py-24">
    <div className="max-w-3xl mx-auto px-5">
      <SectionLabel>reach out</SectionLabel>
      <h1 className="font-display text-4xl md:text-5xl text-text-primary mt-3 mb-10">
        get in touch
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <SectionLabel>dominique</SectionLabel>
          <a href="tel:+18683477243" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
            (868) 347-7243
          </a>
        </div>
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <SectionLabel>mohith</SectionLabel>
          <a href="tel:+18687322157" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
            (868) 732-2157
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <SectionLabel>email</SectionLabel>
          <a href="mailto:mt.hopebookclub@gmail.com" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
            mt.hopebookclub@gmail.com
          </a>
        </div>
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
          <SectionLabel>instagram</SectionLabel>
          <a href="https://www.instagram.com/mt.hopebookclub" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover text-lg transition-colors block mt-2">
            @mt.hopebookclub
          </a>
        </div>
      </div>
    </div>
  </div>
);

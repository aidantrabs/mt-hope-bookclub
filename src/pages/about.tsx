import { useSignalReadyOnMount } from "@hooks/use-initial-load.ts";
import { Link } from "react-router-dom";
import { AmbientDots } from "@/components/ui/ambient-dots.tsx";
import { Animate } from "@/components/ui/animate.tsx";
import { SectionLabel } from "@/components/ui/section-label.tsx";
import { WaveDivider } from "@/components/ui/wave-divider.tsx";

const genres = ["fantasy", "thriller", "romance", "mystery", "sci-fi", "contemporary", "horror", "non-fiction"];

export const About = () => {
    useSignalReadyOnMount();

    return (
        <div>
            <section className="gradient-mesh-light noise-overlay py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-5 relative z-[2]">
                    <div className="hero-fade-in mb-12 md:mb-20">
                        <SectionLabel>who we are</SectionLabel>
                        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mt-3 leading-tight">
                            read more.
                            <br />
                            talk about <em className="italic text-accent">it.</em>
                        </h1>
                        <p className="text-text-secondary leading-relaxed md:text-lg mt-5 max-w-xl">
                            mt. hope book club was started by dominique & mohith - two UWI medical sciences students who
                            wanted to read more intentionally. all readers are welcome to join.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 md:mb-24">
                        <Animate>
                            <span className="block text-5xl font-bold text-accent/25 leading-none mb-2">01</span>
                            <p className="text-text-primary leading-relaxed">
                                new book every few weeks. read at your own pace. meet up and talk it through.
                            </p>
                        </Animate>
                        <Animate delay={100}>
                            <span className="block text-5xl font-bold text-accent/25 leading-none mb-2">02</span>
                            <p className="text-text-primary leading-relaxed">
                                every book gets rated, quoted, and argued about. we track it all so nothing gets
                                forgotten.
                            </p>
                        </Animate>
                        <Animate delay={200}>
                            <span className="block text-5xl font-bold text-accent/25 leading-none mb-2">03</span>
                            <p className="text-text-primary leading-relaxed">
                                sometimes we agree. sometimes we don't. that's the best part.
                            </p>
                        </Animate>
                    </div>

                    <Animate>
                        <div className="mb-4">
                            <p className="text-xs uppercase tracking-widest font-medium text-text-secondary mb-4">
                                what we read
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        to="/discover"
                                        className="rounded-full px-5 py-2 text-sm font-medium text-text-primary border border-border hover:bg-accent hover:text-white hover:border-accent transition-colors"
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Animate>
                </div>
            </section>

            <section className="gradient-mesh-dark noise-overlay ambient-dots relative pb-16 md:pb-24">
                <WaveDivider fill="var(--color-bg-light)" flip className="h-12 md:h-20" />
                <AmbientDots />
                <div className="max-w-4xl mx-auto px-5 relative z-[2] pt-10 md:pt-16">
                    <Animate>
                        <h2 className="text-2xl md:text-4xl font-bold text-text-on-dark leading-tight">
                            follow <em className="italic text-accent">along.</em>
                        </h2>
                        <p className="text-text-muted-dark mt-3 mb-8 max-w-md leading-relaxed">
                            recaps, reading updates, and the occasional hot take - we share it all on instagram.
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

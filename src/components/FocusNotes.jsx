import { useState } from "react";

const slides = [
  {
    eyebrow: "FOCUS NOTES · 01 / 03",
    mobileEyebrow: "GOOD AFTERNOON",
    title: "Make today count.",
    subtitle: "A little focus goes a long way.",
    previewStatus: "NEXT UP",
    previewTitle: "Design landing page",
    previewProgress: 62,
  },
  {
    eyebrow: "FOCUS NOTES · 02 / 03",
    title: "Small steps, big progress.",
    subtitle: "Keep your priorities in view.",
    previewStatus: "IN PROGRESS",
    previewTitle: "Fix navigation",
    previewProgress: 67,
  },
  {
    eyebrow: "FOCUS NOTES · 03 / 03",
    title: "Celebrate the wins.",
    subtitle: "Every completed task moves you forward.",
    previewStatus: "COMPLETED",
    previewTitle: "Onboarding copy",
    previewProgress: 100,
  },
];

export default function FocusNotes({ tasks, completionRate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const waitingCount = tasks.filter((task) => task.status === "To do").length;
  const progress = activeSlide === 0 ? completionRate : slide.previewProgress;
  const showSlide = (nextIndex) => {
    setActiveSlide((nextIndex + slides.length) % slides.length);
  };

  return (
    <section className="focus-notes" aria-label="Focus Notes">
      <div className="focus-copy" aria-live="polite">
        <p className="eyebrow">
          <span className="desktop-eyebrow">{slide.eyebrow}</span>
          <span className="mobile-eyebrow">{slide.mobileEyebrow ?? slide.eyebrow}</span>
        </p>
        <h2>{slide.title}</h2>
        <p className="focus-subtitle desktop-only">{slide.subtitle}</p>
        <div className="focus-mobile-progress">
          <span>{waitingCount} {waitingCount === 1 ? "task" : "tasks"} waiting for your attention</span>
          <b>{progress}%</b>
        </div>
        <div className="focus-progress" aria-label={`${progress}% task completion`}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <article className="focus-preview" aria-label={`${slide.previewStatus}: ${slide.previewTitle}`}>
        <span className="preview-check" aria-hidden="true">✓</span>
        <div className="preview-content">
          <small>{slide.previewStatus}</small>
          <strong>{slide.previewTitle}</strong>
          <span className="preview-track" aria-hidden="true">
            <i style={{ width: `${progress}%` }} />
          </span>
        </div>
        <b>{progress}%</b>
      </article>
      <div className="carousel-controls" aria-label="Focus Notes navigation">
        <button type="button" aria-label="Previous Focus Note" onClick={() => showSlide(activeSlide - 1)}>‹</button>
        <button type="button" aria-label="Next Focus Note" onClick={() => showSlide(activeSlide + 1)}>›</button>
      </div>
      <div className="carousel-dots" role="group" aria-label="Choose a Focus Note">
        {slides.map((item, index) => (
          <button
            type="button"
            className={index === activeSlide ? "active" : ""}
            aria-label={`Show Focus Note ${index + 1}: ${item.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
            key={item.eyebrow}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

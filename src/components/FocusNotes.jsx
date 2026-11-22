import { useState } from 'react';
import { ChevronLeft, ChevronRight, Timer, Layers, Sunrise } from 'lucide-react';
const slides = [
  { title: 'Start with the hardest task', text: 'Do your most demanding work while your energy is highest.', Icon: Sunrise, tone: 'tone-a' },
  { title: 'Work in 25-minute sprints', text: 'Focus fully, then take a five-minute break to reset.', Icon: Timer, tone: 'tone-b' },
  { title: 'Limit work in progress', text: 'Finish what you started before opening something new.', Icon: Layers, tone: 'tone-c' },
];
export default function FocusNotes() {
  const [i, setI] = useState(0);
  const n = slides.length;
  const { title, text, Icon, tone } = slides[i];
  return (
    <section className={`notes ${tone}`} aria-roledescription="carousel" aria-label="Focus Notes">
      <button className="icon-btn" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous slide"><ChevronLeft /></button>
      <div className="slide" aria-live="polite"><Icon aria-hidden="true" size={32} /><h2>{title}</h2><p>{text}</p>
        <div className="dots" role="group" aria-label="Choose slide">{slides.map((s, k) => (
          <button key={s.title} className={`dot ${k === i ? 'on' : ''}`} onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}: ${s.title}`} aria-current={k === i} />))}</div></div>
      <button className="icon-btn" onClick={() => setI((i + 1) % n)} aria-label="Next slide"><ChevronRight /></button>
    </section>
  );
}

import { useRef } from "react";
import "./Histogram.css";

export default function Histogram({ data }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  return (
    <div className="histogram">
      <div className="histogram__inner">
        <div className="histogram__labels">
          <div className="histogram__label-cell">Период</div>
          <div className="histogram__label-cell">Всего</div>
          <div className="histogram__label-cell">Риски</div>
        </div>
        <div className="histogram__scroll" ref={scrollRef}>
          {data.map((item, i) => (
            <div key={i} className="histogram__column">
              <div className="histogram__cell">{item.period}</div>
              <div className="histogram__cell">{item.total}</div>
              <div className="histogram__cell histogram__cell--risk">{item.risks}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="histogram__footer">
        <button className="histogram__btn" onClick={() => scroll(-1)}>&#8249;</button>
        <button className="histogram__btn" onClick={() => scroll(1)}>&#8250;</button>
      </div>
    </div>
  );
}

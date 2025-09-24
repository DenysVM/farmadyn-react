import React from "react";

function TextSection({ title, paragraphs = [], list }) {
  return (
    <section className="page-section">
      {title && <h2>{title}</h2>}
      <div className="page-section__stack">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      {Array.isArray(list) && list.length > 0 && (
        <ul className="page-section__list">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TextSection;

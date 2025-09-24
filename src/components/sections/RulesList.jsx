import React from "react";

function RulesList({ title, items }) {
  return (
    <section className="page-section page-section--list">
      {title && <h2>{title}</h2>}
      <ul className="rules-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default RulesList;

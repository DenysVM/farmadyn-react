import React from "react";

function Page({ title, lead, children }) {
  return (
    <main className="page">
      <header className="page-hero">
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
      </header>
      <div className="page-content">{children}</div>
    </main>
  );
}

export default Page;

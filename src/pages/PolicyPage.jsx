import React from "react";
import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";

const sections = [
  {
    title: "Data controller",
    paragraphs: [
      "Bookingarray Technologies sp. z o.o. manages the Magic Pumpkin Farm website and processes personal data linked to reservations and enquiries.",
      "The company is registered in Warsaw under KRS 0000915590 and stores data on secured servers in line with current regulations."
    ]
  },
  {
    title: "How we use data",
    paragraphs: [
      "Data is processed only for clearly defined purposes: providing digital services, handling bookings, customer support and legally justified business interests.",
      "If you subscribe to updates or events, we rely on the consent you provided, which can be withdrawn at any time."
    ],
    list: [
      "Service delivery and contract performance",
      "Handling payments and confirmations",
      "Direct marketing with prior consent",
      "Analytics and service improvements"
    ]
  },
  {
    title: "Your rights",
    paragraphs: [
      "Each visitor may request access to their data, ask for corrections or deletion, restrict processing or object to specific activities.",
      "Complaints can be lodged with the national data protection authority (PUODO)."
    ],
    list: [
      "Access, rectification and portability",
      "Erasure and restriction",
      "Objection to processing, including profiling",
      "Withdrawal of consent without affecting past processing"
    ]
  },
  {
    title: "Contact and security",
    paragraphs: [
      "We secure the site with encrypted connections (SSL) and limit access to authorised staff only.",
      "Reach our data protection lead at rodo@warsawexpo.eu for privacy questions or to exercise your rights.",
      "We may share data with authorities when required by law. Website traffic is measured with Google Analytics cookies to improve navigation." 
    ]
  }
];

function PolicyPage() {
  return (
    <Page title="Privacy notice" lead="How Magic Pumpkin Farm processes and protects personal data">
      {sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
    </Page>
  );
}

export default PolicyPage;

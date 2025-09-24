import React from "react";
import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";

const contactDetails = [
  "Address: Wilanow, Warsaw (ul. Drewny 17)",
  "Phone: 692 992 589",
  "Phone: 883 920 388",
  "Office: 506 441 403",
  "Email: biuro@farmadyn.pl"
];

function ContactPage() {
  return (
    <Page title="Contact" lead="Reach out for bookings, school visits or support">
      <TextSection
        title="Get in touch"
        paragraphs={["We respond fastest by phone during opening hours and by email after closing time."]}
        list={contactDetails}
      />
      <TextSection
        title="Opening hours"
        paragraphs={[
          "6 September - 31 October 2025",
          "Open daily 09:00-18:00",
          "We answer group reservation queries year-round via email"
        ]}
      />
    </Page>
  );
}

export default ContactPage;

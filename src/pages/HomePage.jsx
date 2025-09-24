import React from "react";
import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";
import RulesList from "../components/sections/RulesList";
import farmRules from "../content/farmRules";

const infoSections = [
  {
    title: "Season and tickets",
    paragraphs: [
      "Pumpkin season runs 6 September - 31 October 2025 and we are open every day 09:00-18:00.",
      "Individual entry costs 39 PLN; children under one year enter free.",
      "Card payments are accepted and friendly pets on a leash are welcome."
    ]
  },
  {
    title: "On-site attractions",
    paragraphs: [
      "Pick pumpkins straight from the field with more than forty varieties and around seven thousand pumpkins ready for decorating.",
      "Enjoy the cafe and street-food zone with coffee, tea, fries, pumpkin cake and pumpkin soup.",
      "Meet alpacas, goats, rabbits, geese, turkeys and hens in the mini zoo and explore straw pyramids, zip lines, swings, trampolines, a straw maze, inflatable slides, a Nerf battle zone and pedal go-karts."
    ]
  },
  {
    title: "Schools and kindergartens",
    paragraphs: [
      "Educational trips last two and a half hours and start at 09:30 or 10:15.",
      "Guided activities cover the mini zoo with feeding sessions, access to all attractions and a visit to the pumpkin field to take a pumpkin home.",
      "Two 200 m tent halls with tables are ready for picnics. The price is 69 PLN per child or 95 PLN with catering."
    ]
  },
  {
    title: "Events and birthdays",
    paragraphs: [
      "Plan birthday parties, corporate gatherings or special celebrations on the farm.",
      "Packages start from 69 PLN per child and 39 PLN per adult with a minimum total of 990 PLN.",
      "Call 692 992 589, 883 920 388 or email biuro@farmadyn.pl for reservations."
    ]
  }
];

function HomePage() {
  return (
    <Page
      title="Magic Pumpkin Farm"
      lead="Warsaw Powsin | 6 September - 31 October 2025"
    >
      {infoSections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
      <RulesList title="Farm rules" items={farmRules} />
    </Page>
  );
}

export default HomePage;


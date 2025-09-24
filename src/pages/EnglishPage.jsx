import React from "react";
import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";
import RulesList from "../components/sections/RulesList";
import farmRules from "../content/farmRules";

const sections = [
  {
    title: "Visit us",
    paragraphs: [
      "Magic Pumpkin Farm sits at 17 Drewny Street in Warsaw Powsin.",
      "We welcome guests from 6 September to 31 October 2025, seven days a week 09:00-18:00.",
      "Individual entry is 39 PLN. Group programmes with a pumpkin and guided agenda last 2.5 hours and start at 09:30 or 10:15."
    ],
    list: [
      "Phone: 692 992 589 or 883 920 388",
      "Email: biuro@farmadyn.pl",
      "Dogs on a leash are allowed"
    ]
  },
  {
    title: "Attractions",
    paragraphs: [
      "Choose from more than forty pumpkin varieties in the field and visit the decorations zone for ready-made displays.",
      "Enjoy coffee, tea, fries, pumpkin cake and pumpkin soup in the cafe and food court.",
      "The mini zoo features alpacas, goats, rabbits, geese, turkeys and hens. Kids can explore straw pyramids, a 70 m zip line, swings, trampolines, a straw maze, inflatable slides, a Nerf arena and pedal go-karts."
    ]
  },
  {
    title: "Educational trips",
    paragraphs: [
      "School and kindergarten visits combine learning with hands-on fun.",
      "Guides lead feeding sessions in the mini zoo, accompany groups through the attractions and help each child pick a pumpkin to take home.",
      "Two 200 m tent halls with tables are reserved for second breakfast. Pricing: 69 PLN per child or 95 PLN with catering."
    ]
  },
  {
    title: "Parties and events",
    paragraphs: [
      "Celebrate birthdays, team outings or seasonal gatherings at the farm.",
      "Packages start from 69 PLN per child and 39 PLN per adult. Minimum order value 990 PLN.",
      "Contact us by phone or email to tailor the experience for your group."
    ]
  }
];

function EnglishPage() {
  return (
    <Page title="Magic Pumpkin Farm" lead="Essential information in English">
      {sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
      <RulesList title="Safety rules" items={farmRules} />
    </Page>
  );
}

export default EnglishPage;

import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";
import RulesList from "../components/sections/RulesList";
import { useLocale } from "../i18n/LocaleContext";

const HomePage = () => {
  const { messages } = useLocale();
  const { home } = messages;

  return (
    <Page title={home.title} lead={home.lead}>
      {home.sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
      <RulesList title={home.rules.title} items={home.rules.items} />
    </Page>
  );
};

export default HomePage;

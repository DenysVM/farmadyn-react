import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";
import { useLocale } from "../i18n/LocaleContext";

const PolicyPage = () => {
  const { messages } = useLocale();
  const { privacy } = messages;

  return (
    <Page title={privacy.title} lead={privacy.lead}>
      {privacy.sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
    </Page>
  );
};

export default PolicyPage;

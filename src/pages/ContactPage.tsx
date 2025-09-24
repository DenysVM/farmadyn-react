import Page from "../components/layout/Page";
import TextSection from "../components/sections/TextSection";
import { useLocale } from "../i18n/LocaleContext";

const ContactPage = () => {
  const { messages } = useLocale();
  const { contact } = messages;

  return (
    <Page title={contact.title} lead={contact.lead}>
      {contact.sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
    </Page>
  );
};

export default ContactPage;

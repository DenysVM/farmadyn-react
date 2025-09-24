import HeroSlider from "../components/HeroSlider";
import Page from "../components/layout/Page";
import RulesList from "../components/sections/RulesList";
import TextSection from "../components/sections/TextSection";
import { useLocale } from "../i18n/LocaleContext";

const HomePage = () => {
  const { messages } = useLocale();
  const { home } = messages;

  return (
    <Page title={home.title} lead={home.lead}>
      <HeroSlider
        slides={home.slider.slides}
        playLabel={home.slider.play}
        pauseLabel={home.slider.pause}
        previousLabel={home.slider.previous}
        nextLabel={home.slider.next}
      />
      {home.sections.map((section) => (
        <TextSection key={section.title} {...section} />
      ))}
      <RulesList title={home.rules.title} items={home.rules.items} />
    </Page>
  );
};

export default HomePage;

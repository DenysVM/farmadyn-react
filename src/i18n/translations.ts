export type Locale = "pl" | "en";
export type NavLinkKey = "home" | "privacy" | "contact";

interface SectionContent {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

interface SliderSlide {
  image: string;
  alt: string;
  heading: string;
  subheading: string;
}

interface NavigationTranslations {
  menu: string;
  close: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  languageLabel: string;
  languages: Record<Locale, string>;
  links: Record<NavLinkKey, { label: string; description?: string }>;
}

interface HomeTranslations {
  title: string;
  lead: string;
  slider: {
    play: string;
    pause: string;
    next: string;
    previous: string;
    slides: SliderSlide[];
  };
  sections: SectionContent[];
  rules: {
    title: string;
    items: string[];
  };
}

interface ContactTranslations {
  title: string;
  lead: string;
  sections: SectionContent[];
}

interface PrivacyTranslations {
  title: string;
  lead: string;
  sections: SectionContent[];
}

export interface TranslationShape {
  navigation: NavigationTranslations;
  common: {
    scrollToTop: string;
  };
  home: HomeTranslations;
  contact: ContactTranslations;
  privacy: PrivacyTranslations;
}

export const translations: Record<Locale, TranslationShape> = {
  pl: {
    navigation: {
      menu: "Menu",
      close: "Zamknij",
      openMenuLabel: "Otwórz menu nawigacji",
      closeMenuLabel: "Zamknij menu nawigacji",
      languageLabel: "Wybierz język",
      languages: {
        pl: "Polski",
        en: "English"
      },
      links: {
        home: { label: "Strona główna" },
        privacy: { label: "Polityka prywatności" },
        contact: { label: "Kontakt" }
      }
    },
    common: {
      scrollToTop: "Do góry"
    },
    home: {
      title: "Magiczna Farma Dyń",
      lead: "Warszawa Powsin • 6 września – 31 października 2025",
      slider: {
        play: "Wznów pokaz slajdów",
        pause: "Wstrzymaj pokaz slajdów",
        next: "Następny slajd",
        previous: "Poprzedni slajd",
        slides: [
          {
            image: "/images/ny.jpg",
            alt: "Rodzina na polu dyniowym z labiryntem ze słomy",
            heading: "Zwierzęta, labirynt ze słomy i pole dyniowe",
            subheading: "Dzieci uwielbiają Magiczną Farmę Dyń!"
          },
          {
            image: "/images/chicago.jpg",
            alt: "Dynia halloweenowa wśród wielu odmian dyni",
            heading: "MagicPumpkinFarm.pl",
            subheading: "Dynia na Halloween – ponad 30 gatunków do wyboru."
          },
          {
            image: "/images/la.jpg",
            alt: "Różnorodne dynie ułożone na drewnianych półkach",
            heading: "Największy wybór dyni",
            subheading: "Dynie na Halloween i do kuchni w jednym miejscu."
          }
        ]
      },
      sections: [
        {
          title: "Sezon i bilety",
          paragraphs: [
            "Sezon dyniowy trwa od 6 września do 31 października 2025. Farma jest otwarta codziennie w godzinach 09:00–18:00.",
            "Bilet wstępu dla gości indywidualnych kosztuje 39 PLN. Dzieci do ukończenia pierwszego roku życia wchodzą bezpłatnie.",
            "Akceptujemy płatności kartą. Przyjazne psy na smyczy są mile widziane."
          ]
        },
        {
          title: "Atrakcje na terenie",
          paragraphs: [
            "Ponad czterdzieści odmian dyń prosto z pola – około siedmiu tysięcy okazów gotowych do zabrania lub użycia w dekoracjach.",
            "Strefa gastro z kawą, herbatą, frytkami, ciastem dyniowym i zupą dyniową.",
            "Mini zoo z alpakami, kozami, królikami, gęsiami, indykami i kurami, piramidy ze słomy, tyrolka o długości 70 metrów, huśtawki, trampoliny, labirynt, dmuchane zjeżdżalnie, strefa Nerf i gokarty na pedały."
          ]
        },
        {
          title: "Wycieczki edukacyjne",
          paragraphs: [
            "Programy dla szkół i przedszkoli trwają dwie i pół godziny i rozpoczynają się o 09:30 lub 10:15.",
            "Przewodnicy oprowadzają po mini zoo i atrakcjach, a każde dziecko wybiera dynię, którą zabiera do domu.",
            "Dwa 200-metrowe namioty z miejscami do siedzenia czekają na drugie śniadanie. Cena: 69 PLN za dziecko lub 95 PLN z wyżywieniem."
          ]
        },
        {
          title: "Urodziny i wydarzenia",
          paragraphs: [
            "Organizujemy przyjęcia urodzinowe, spotkania firmowe i wydarzenia okolicznościowe na terenie farmy.",
            "Pakiety zaczynają się od 69 PLN za dziecko i 39 PLN za osobę dorosłą. Minimalna kwota rezerwacji wynosi 990 PLN.",
            "Skontaktuj się z nami telefonicznie pod numerami 692 992 589 lub 883 920 388, albo napisz na adres biuro@farmadyn.pl."
          ]
        }
      ],
      rules: {
        title: "Regulamin farmy",
        items: [
          "Dzieci przebywają na farmie pod stałą opieką rodziców lub opiekunów.",
          "Zwierzęta karmią wyłącznie dorośli – nie wkładamy rąk do pysków i trzymamy dystans od ptaków.",
          "Nie podnosimy ani nie ściskamy królików; karmimy tylko te, które podchodzą.",
          "Nie zrywamy dyni i roślin z dekoracji oraz nie wspinamy się powyżej jednego metra na konstrukcje.",
          "W labiryncie ze słomy nie przewracamy balotów.",
          "Huśtamy się ostrożnie, dzieci na trampolinie bawią się bez butów, tyrolka jest dla osób do 65 kg, w strefie Nerf obowiązują okulary ochronne.",
          "Trawy ozdobne mogą być ostre – dbamy o dłonie własne i dzieci. Niestosowanie się do zaleceń obsługi może skutkować opuszczeniem obiektu."
        ]
      }
    },
    contact: {
      title: "Kontakt",
      lead: "Skontaktuj się z nami w sprawie rezerwacji, wizyt grupowych lub pytań",
      sections: [
        {
          title: "Dane kontaktowe",
          paragraphs: [
            "Na wiadomości telefoniczne odpowiadamy najszybciej w godzinach otwarcia farmy, a na e-maile po zamknięciu."
          ],
          list: [
            "Adres: ul. Drewny 17, Warszawa Powsin",
            "Telefon: 692 992 589",
            "Telefon: 883 920 388",
            "Biuro: 506 441 403",
            "E-mail: biuro@farmadyn.pl"
          ]
        },
        {
          title: "Godziny otwarcia",
          paragraphs: [
            "Sezon: 6 września – 31 października 2025",
            "Codziennie od 09:00 do 18:00",
            "Zapytania dotyczące rezerwacji grupowych przyjmujemy przez cały rok drogą mailową"
          ]
        }
      ]
    },
    privacy: {
      title: "Polityka prywatności",
      lead: "Jak Magiczna Farma Dyń przetwarza i chroni dane osobowe",
      sections: [
        {
          title: "Administrator danych",
          paragraphs: [
            "Serwis Magicznej Farmy Dyń prowadzi Bookingarray Technologies sp. z o.o. z siedzibą w Warszawie (KRS 0000915590).",
            "Dane przetwarzamy na zabezpieczonych serwerach zgodnie z obowiązującymi przepisami prawa."
          ]
        },
        {
          title: "Cele przetwarzania danych",
          paragraphs: [
            "Wykorzystujemy dane wyłącznie w jasno określonych celach, takich jak świadczenie usług elektronicznych, obsługa rezerwacji i wsparcie klienta.",
            "Jeżeli zapisujesz się na aktualności lub wydarzenia, przetwarzamy dane na podstawie zgody, którą możesz w dowolnym momencie wycofać."
          ],
          list: [
            "Realizacja usług i umów",
            "Rozliczenia płatności i potwierdzenia",
            "Marketing bezpośredni po uzyskaniu zgody",
            "Analiza i udoskonalanie działania serwisu"
          ]
        },
        {
          title: "Twoje prawa",
          paragraphs: [
            "Masz prawo zażądać dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania lub wniesienia sprzeciwu.",
            "Skargę możesz złożyć do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)."
          ],
          list: [
            "Dostęp do danych i ich przenoszenie",
            "Sprostowanie oraz usunięcie",
            "Ograniczenie przetwarzania i sprzeciw",
            "Wycofanie zgody bez wpływu na zgodność wcześniejszego przetwarzania"
          ]
        },
        {
          title: "Bezpieczeństwo i kontakt",
          paragraphs: [
            "Komunikacja z serwisem jest szyfrowana (SSL), a dostęp do danych mają wyłącznie upoważnione osoby.",
            "W sprawach dotyczących ochrony danych skontaktuj się z nami pod adresem rodo@warsawexpo.eu.",
            "Dane możemy udostępnić organom publicznym, jeśli wymagają tego przepisy. Ruch na stronie analizujemy z użyciem Google Analytics, aby ulepszać nawigację."
          ]
        }
      ]
    }
  },
  en: {
    navigation: {
      menu: "Menu",
      close: "Close",
      openMenuLabel: "Open navigation menu",
      closeMenuLabel: "Close navigation menu",
      languageLabel: "Language",
      languages: {
        pl: "Polish",
        en: "English"
      },
      links: {
        home: { label: "Home" },
        privacy: { label: "Privacy Policy" },
        contact: { label: "Contact" }
      }
    },
    common: {
      scrollToTop: "Back to top"
    },
    home: {
      title: "Magic Pumpkin Farm",
      lead: "Warsaw Powsin • 6 September – 31 October 2025",
      slider: {
        play: "Resume slideshow",
        pause: "Pause slideshow",
        next: "Next slide",
        previous: "Previous slide",
        slides: [
          {
            image: "/images/ny.jpg",
            alt: "Family exploring the straw maze and pumpkin field",
            heading: "Animals, straw maze and pumpkin field",
            subheading: "Kids love Magic Pumpkin Farm!"
          },
          {
            image: "/images/chicago.jpg",
            alt: "Halloween pumpkin among many varieties",
            heading: "MagicPumpkinFarm.pl",
            subheading: "Halloween pumpkins – over 30 varieties to choose from."
          },
          {
            image: "/images/la.jpg",
            alt: "Diverse pumpkins arranged on wooden shelves",
            heading: "Largest pumpkin selection",
            subheading: "Pumpkins for Halloween and for the kitchen."
          }
        ]
      },
      sections: [
        {
          title: "Season and tickets",
          paragraphs: [
            "Pumpkin season runs from 6 September to 31 October 2025. The farm is open every day from 09:00 to 18:00.",
            "Individual entry costs 39 PLN. Children under one year old enter free of charge.",
            "Card payments are accepted. Friendly dogs on a leash are welcome."
          ]
        },
        {
          title: "On-site attractions",
          paragraphs: [
            "More than forty pumpkin varieties straight from the field – around seven thousand pumpkins ready to take home or decorate with.",
            "Food court with coffee, tea, fries, pumpkin cake and pumpkin soup.",
            "A mini zoo with alpacas, goats, rabbits, geese, turkeys and hens, straw pyramids, a 70 m zip line, swings, trampolines, a straw maze, inflatable slides, a Nerf arena and pedal go-karts."
          ]
        },
        {
          title: "Educational trips",
          paragraphs: [
            "School and kindergarten programmes last two and a half hours and start at 09:30 or 10:15.",
            "Guides lead feeding sessions in the mini zoo, accompany groups through the attractions and help every child pick a pumpkin to take home.",
            "Two 200 m tent halls with seating are available for snack breaks. Price: 69 PLN per child or 95 PLN with catering."
          ]
        },
        {
          title: "Parties and events",
          paragraphs: [
            "Celebrate birthdays, company outings or seasonal gatherings on the farm.",
            "Packages start at 69 PLN per child and 39 PLN per adult with a minimum spend of 990 PLN.",
            "Call 692 992 589 or 883 920 388, or email biuro@farmadyn.pl to tailor the experience for your group."
          ]
        }
      ],
      rules: {
        title: "Farm rules",
        items: [
          "Children must remain under the supervision of parents or guardians at all times.",
          "Only adults may feed the animals – keep hands away from their mouths and maintain distance from birds.",
          "Do not lift or squeeze rabbits; feed only the animals that approach you.",
          "Do not remove pumpkins or plants from decorations and do not climb higher than one metre on any structures.",
          "Do not topple the straw in the maze.",
          "Swing carefully, keep shoes off on the trampoline, the zip line is for children up to 65 kg, and safety glasses are required in the Nerf zone.",
          "Decorative grasses can be sharp – protect your hands and follow staff instructions to keep the farm safe for everyone."
        ]
      }
    },
    contact: {
      title: "Contact",
      lead: "Reach out for bookings, school visits or support",
      sections: [
        {
          title: "Get in touch",
          paragraphs: [
            "We answer phone calls fastest during opening hours and reply to emails after closing time."
          ],
          list: [
            "Address: Drewny 17, Warsaw Powsin",
            "Phone: 692 992 589",
            "Phone: 883 920 388",
            "Office: 506 441 403",
            "Email: biuro@farmadyn.pl"
          ]
        },
        {
          title: "Opening hours",
          paragraphs: [
            "Season: 6 September – 31 October 2025",
            "Open daily 09:00-18:00",
            "We answer group reservation enquiries year-round via email"
          ]
        }
      ]
    },
    privacy: {
      title: "Privacy notice",
      lead: "How Magic Pumpkin Farm processes and protects personal data",
      sections: [
        {
          title: "Data controller",
          paragraphs: [
            "The Magic Pumpkin Farm website is operated by Bookingarray Technologies sp. z o.o. based in Warsaw (KRS 0000915590).",
            "Data is processed on secured servers in line with current regulations."
          ]
        },
        {
          title: "Why we process data",
          paragraphs: [
            "We use data only for clearly defined purposes such as delivering digital services, managing bookings and supporting visitors.",
            "If you subscribe to updates or events, we rely on your consent, which you can withdraw at any time."
          ],
          list: [
            "Service delivery and contract performance",
            "Payment handling and confirmations",
            "Direct marketing with prior consent",
            "Service analytics and improvements"
          ]
        },
        {
          title: "Your rights",
          paragraphs: [
            "You may request access, rectification, deletion or restriction of your data, or object to specific processing activities.",
            "Complaints can be lodged with the Polish Data Protection Authority (PUODO)."
          ],
          list: [
            "Access and portability",
            "Rectification and erasure",
            "Restriction and objection",
            "Withdrawal of consent without affecting prior processing"
          ]
        },
        {
          title: "Security and contact",
          paragraphs: [
            "Communication with the site is encrypted (SSL) and only authorised staff can access personal data.",
            "For privacy questions contact rodo@warsawexpo.eu.",
            "We may disclose data to public authorities when required by law. Website traffic is analysed with Google Analytics to improve navigation."
          ]
        }
      ]
    }
  }
};

export const availableLocales: Locale[] = ["pl", "en"];

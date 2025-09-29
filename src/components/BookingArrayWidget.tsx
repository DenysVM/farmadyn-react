import React, { useEffect } from 'react';

/**
 * BookingArrayWidget
 *
 * Эта компонента позволяет интегрировать календарь бронирования BookingArray
 * в проект на React/TypeScript. При монтировании компоненты на страницу
 * динамически добавляются CSS и JS от BookingArray (если они ещё не
 * загружены), а сам виджет активируется при клике на ссылку.
 *
 * Использование:
 *
 * ```tsx
 * import BookingArrayWidget from './BookingArrayWidget';
 *
 * function MyPage() {
 *   return (
 *     <section>
 *       <h2>Забронировать посещение</h2>
 *       <BookingArrayWidget calendarId="d443761a057b92277e7dfcded1bcc8ca/1" buttonText="Rezerwacja" />
 *     </section>
 *   );
 * }
 * ```
 *
 * Обратите внимание: calendarId должен быть получен из личного кабинета
 * BookingArray. В демо используется значение из старого проекта.
 */

interface BookingArrayWidgetProps {
  /**
   * Идентификатор календаря BookingArray. Содержит GUID и номер канала, разделённые
   * косой чертой, например: "d443761a057b92277e7dfcded1bcc8ca/1".
   */
  calendarId: string;
  /** Текст на кнопке бронирования. По умолчанию — 'Rezerwacja'. */
  buttonText?: string;
}

const BookingArrayWidget: React.FC<BookingArrayWidgetProps> = ({ calendarId, buttonText = 'Rezerwacja' }) => {
  useEffect(() => {
    // Добавляем CSS BookingArray, если его ещё нет в документе.
    const cssHref = 'https://system.bookingarray.com/public/bookingarray.css';
    if (!document.querySelector(`link[href='${cssHref}']`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      document.head.appendChild(link);
    }

    // Добавляем скрипт BookingArray, если он ещё не загружен.
    const scriptSrc = 'https://system.bookingarray.com/public/bookingarray.js';
    if (!document.querySelector(`script[src='${scriptSrc}']`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="booking-array-widget">
      {/*
        Элемент с классом calendarReservation и атрибутом data-idCalendarReservation
        используется скриптом BookingArray для открытия модального окна.
      */}
      <a
        href="#"
        className="calendarReservation"
        data-idcalendarreservation={calendarId}
        data-idCalendarReservation={calendarId}
      >
        {buttonText}
      </a>
      {/*
        Контейнер для модального окна. BookingArray будет заполнять
        внутренний <div> iframe'ом с календарём и управлять его
        отображением. Стилевой класс calendarReservationData можно
        настроить в bookingArrayStyles.css.
      */}
      <div className="calendarReservationData">
        <span></span>
        <div></div>
      </div>
    </div>
  );
};

export default BookingArrayWidget;
import React, { useCallback, useEffect, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";

interface BookingArrayWidgetProps {
  calendarId: string;
  buttonText?: string;
}

const BookingArrayWidget: React.FC<BookingArrayWidgetProps> = ({ calendarId, buttonText = "Rezerwacja" }) => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const cssHref = "https://system.bookingarray.com/public/bookingarray.css";
    if (!document.querySelector(`link[href='${cssHref}']`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }

    const ensureBookingScript = () => {
      const scriptSrc = "https://system.bookingarray.com/public/bookingarray.js";
      if (document.querySelector(`script[src='${scriptSrc}']`)) {
        return;
      }
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    };

    const jquerySrc = "https://code.jquery.com/jquery-3.6.4.min.js";
    const hasJquery = typeof window !== "undefined" && (window as any).jQuery;

    if (!hasJquery) {
      if (!document.querySelector(`script[src='${jquerySrc}']`)) {
        const jqueryScript = document.createElement("script");
        jqueryScript.src = jquerySrc;
        jqueryScript.async = true;
        jqueryScript.onload = ensureBookingScript;
        document.body.appendChild(jqueryScript);
      }
    } else {
      ensureBookingScript();
    }
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute("data-idCalendarReservation", calendarId);
    }
  }, [calendarId]);

  const assignButtonRef = useCallback((node: HTMLAnchorElement | null) => {
    buttonRef.current = node;
  }, []);

  return (
    <Box
      className="booking-array-widget"
      display="inline-flex"
      flexDirection="column"
      w={{ base: "full", md: "auto" }}
    >
      <Button
        as="a"
        href="#"
        className="calendarReservation"
        data-idcalendarreservation={calendarId}
        ref={assignButtonRef}
        onClick={(event) => event.preventDefault()}
        variant="pill"
        w={{ base: "full", md: "auto" }}
        justifyContent="center"
      >
        {buttonText}
      </Button>
      <Box className="calendarReservationData">
        <Box as="span" />
        <Box />
      </Box>
    </Box>
  );
};

export default BookingArrayWidget;

import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import HomePage from "./pages/HomePage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <Flex minH="100vh" direction="column">
      <NavigationBar />
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>
      <ScrollToTopButton />
    </Flex>
  );
};

export default App;

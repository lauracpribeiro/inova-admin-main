import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, activityBtn }) {
  return (
    <Box>
      <Box
        id="main"
        backgroundColor="#1b2224"
        color="var(--white)"
        overflow="hidden"
        zIndex="1"
        h="100vh"
      >
        <Flex flexDirection="column" w="100%" zIndex="888">
          <Header activityBtn={activityBtn}/>
          {children}
        </Flex>
      </Box>
    </Box>
  );
}

export default Layout;

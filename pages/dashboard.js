import Layout from '@components/Layout';
import { Button, Flex } from '@chakra-ui/react';
import TrailsContent from '@components/TrailsContent';
import Challenges from '@components/Challenges';
import { useEffect, useState } from 'react';
import api from '@services/api';
import { getAPI } from '@services/axios';

const Dashboard = ({ challengesData, categoriesData }) => {
  const [trailsContentActive, setTrailsContentActive] = useState(true);
  const [challengesActive, setChallengesActive] = useState(false);
  const [challenges, setChallenges] = useState(null);
  const [content, setContent] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`challenges`);
      setChallenges(res.data);
      return null;
    };

    if (!challenges) {
      setChallenges(challengesData);
      return null;
    }

    getData();
    return null;
  }, [setChallenges, reload]);

  return (
    <Layout activityBtn>
      <Flex w="full">
        <Flex
          borderRight="1px"
          borderColor="rgba(255, 255, 255, 0.13)"
          w="full"
          maxW="350px"
          minH="90vh"
        >
          <Flex direction="column" py="50px" px="50px">
            <Button
              variant="ghost"
              display="block"
              _hover={{ bg: 'transparent' }}
              textAlign="left"
              fontSize="1.3rem"
              my="10px"
              size="lg"
              onClick={() => setContent(<TrailsContent />)}
            >
              Conteúdo Trilhas
            </Button>
            <Button
              variant="ghost"
              display="block"
              _hover={{ bg: 'transparent' }}
              textAlign="left"
              fontSize="1.3rem"
              my="10px"
              size="lg"
              onClick={() =>
                setContent(
                  <Challenges
                    challenges={challenges}
                    reload={reload}
                    setReload={setReload}
                  />,
                )
              }
            >
              Desafios
            </Button>
          </Flex>
        </Flex>
        <Flex w="full" h="90vh" bg="whiteAlpha.900" overflowY="auto">
          {content}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  try {
    const apiServer = getAPI(ctx);

    const challenges = await apiServer.get(`challenges`);
    const categories = await apiServer.get(`categories`);

    return {
      props: {
        challengesData: challenges.data,
        categoriesData: categories.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

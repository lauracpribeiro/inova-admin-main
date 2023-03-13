import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Layout from '@components/Layout';
import Link from 'next/link';
import {
  Container,
  Text,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '@contexts/AuthContext';
import api from '../services/api';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(true);
  const { user, signinGoogle } = useAuth();

  useEffect(() => {
    const token = Cookies.get('itkan');

    if (!token) {
      return null;
    }

    if (!user) {
      return null;
    }

    const check = async () => {
      await api
        .get('check')
        .then(() => {
          window.location.href = '/dashboard';
        })
        .catch((err) => console.log('error: ', err));
    };

    return check();
  }, [user, Cookies]);

  return (
    <Layout>
      <Flex w="100vw" minH="89vh" direction="column" align="center">
        <Container maxW="container.xl">
          <Flex direction="column" align="center" pt="15vh">
            <Text
              fontSize={['3rem', '4rem']}
              lineHeight="4rem"
              fontWeight="bold"
              mb="3rem"
              textTransform="uppercase"
              fontFamily="fontastique"
            >
              admin
            </Text>
            <Flex justify="center">
              <Button
                size="lg"
                mb="50px"
                bg="#1a73e8"
                _hover={{ bg: '1a73e8' }}
                color="white"
                fontWeight="400"
                pl="0"
                onClick={signinGoogle}
              >
                <Image
                  src="/images/google.jpg"
                  width="38px"
                  borderTopLeftRadius="4px"
                  borderBottomLeftRadius="4px"
                  alt="Logo Google"
                  mr="var(--chakra-space-4)"
                  ml="5px;"
                />
                Login com Google
              </Button>
            </Flex>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="highlight">
                {login ? 'Entrar' : 'Criar uma nova conta'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column">
                  <Flex justify="center">
                    <Button
                      mb="50px"
                      bg="#1a73e8"
                      _hover={{ bg: '1a73e8' }}
                      color="white"
                      fontWeight="400"
                      pl="0"
                      onClick={signinGoogle}
                    >
                      <Image
                        src="/images/google.jpg"
                        width="36px"
                        borderTopLeftRadius="4px"
                        borderBottomLeftRadius="4px"
                        alt="Logo Google"
                        mr="var(--chakra-space-4)"
                        ml="3px;"
                      />
                      {login ? 'Login com Google' : 'Criar conta com Google'}
                    </Button>
                  </Flex>
                  <Text fontSize=".9rem" maxW="300px" mx="auto">
                    Ao utilizar a plataforma você concorda com a{' '}
                    <Link href="politica-de-privacidade">
                      <a style={{ color: '#9e2a96' }}>
                        Política de Privacidade
                      </a>
                    </Link>
                  </Text>
                  <Text fontSize=".9rem" maxW="300px" mx="auto">
                    Se tiver alguma dúvida ou dificuldade, envie um e-mail para{' '}
                    <strong>inovacao@unis.edu.br</strong>
                  </Text>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Flex>
    </Layout>
  );
};

export default Home;

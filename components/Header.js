/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Container,
  Box,
  Image,
  Spacer,
  Center,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../lib/firebase';

export default function Header({ profile, activityBtn, painel }) {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { user, leader, isAuthenticated } = useAuth();
  const [team, setTeam] = useState({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-team/${trailId}`)
        .then((res) => {
          setTeam(res.data);
        })
        .catch((err) => {
          if (err.response) {
            return console.log(err.response.data.error);
          }
          return console.log('Ocorreu um erro. Tente novamente, por favor.');
        });
    };

    if (trailId && !painel) {
      getData();
    }
  }, [trailId, user]);

  const deleteAccount = async () => {
    await user
      .delete()
      .then(() => {
        toast({
          title: 'Conta deletada',
          status: 'success',
          duration: 3000,
        });
        Router.push('/');
      })
      .catch((err) => {
        onCloseAlert();
        toast({
          title: 'Houve um erro',
          status: 'error',
          duration: 3000,
        });
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log('Ocorreu um erro. Tente novamente, por favor.');
        }
      });
  };

  return (
    <Box
      borderBottom="solid 0.5px rgba(255, 255, 255, 0.13)"
      zIndex="999"
      py="10px"
      px="70px"
    >
      <Flex>
        <Center
          cursor="pointer"
          onClick={() => {
            if (isAuthenticated) {
              Router.push('/dashboard');
            }
          }}
        >
          <Box maxWidth="100px">
            <Image src="/images/logo.png" alt="Logo UaiInovei" />
          </Box>
        </Center>
        <Spacer />

        {activityBtn && (
          <Flex align="center">
            <Menu>
              <MenuButton zIndex="999" ml={['10px', '30px']}>
                <Avatar src={user?.photoURL} bg="transparent" size="md" />
              </MenuButton>
              <MenuList zIndex="999">
                <Box p=".8rem">
                  <Text color="gray.700">{user?.displayName}</Text>
                  <Text color="gray.700" fontSize=".9rem">
                    {user?.email}
                  </Text>
                </Box>
                <MenuItem
                  justifyContent="center"
                  border="1px"
                  borderRadius="3px"
                  maxW="100px"
                  mx="auto"
                  color="highlight"
                  onClick={async () => {
                    await firebase.auth().signOut();
                    window.location.href = '/';
                  }}
                >
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
        {painel && (
          <Link href="/dashboard">
            <a>
              <Button
                bgColor="highlight"
                color="white"
                _hover={{ bg: 'highlight' }}
              >
                Voltar
              </Button>
            </a>
          </Link>
        )}
      </Flex>
    </Box>
  );
}

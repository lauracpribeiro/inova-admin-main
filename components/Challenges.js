/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import {
  Select,
  Box,
  Flex,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Challenges = ({ challenges, reload, setReload }) => {
  const [category, setCategory] = useState(null);
  const [select, setSelect] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSelect(e) {
    const categorySelect = challenges.find(
      (item) => item._id === e.target.value,
    );
    setCategory(categorySelect.challenges);
  }

  const handleModal = (response) => {
    setSelect(response);
    onOpen();
  };

  function createMarkup(content) {
    if (content) {
      return {
        __html: content,
      };
    }
  }

  return (
    <Box p="50px">
      <Box pb="30px">
        <Heading color="black">Desafios</Heading>
      </Box>
      <Select
        placeholder="Selecione"
        color="black"
        borderColor="black"
        size="lg"
        mb="30px"
        onChange={(e) => handleSelect(e)}
      >
        {challenges?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        ))}
      </Select>
      <Flex>
        <Flex direction="column">
          {category?.map((challenge) => (
            <Flex>
              <Button
                variant="ghost"
                color="gray.700"
                bg="white"
                fontSize="1.1rem"
                my="10px"
                onClick={() => handleModal(challenge)}
              >
                {challenge.title}
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{select?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              dangerouslySetInnerHTML={
                select?.content && createMarkup(select?.content)
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Challenges;

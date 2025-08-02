// components/DeleteConfirmModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: string;
  type: "bike" | "review";
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="10" w="2000px" h="300px">
        <ModalHeader
          textAlign="center"
          color={
            action === "Delete"
              ? "red.500"
              : action === "Edit"
              ? "blue.500"
              : "gray.700"
          }
          fontWeight="bold"
        >
          {action} {type}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="15px">
          <Text textAlign="center" fontSize="25px" fontWeight="700">
            Are you sure, you want to{" "}
            <Text
              as="span"
              color={
                action === "Delete"
                  ? "red.500"
                  : action === "Edit"
                  ? "blue.500"
                  : "gray.700"
              }
              fontWeight="bold"
            >
              {action}
            </Text>{" "}
            this {type}?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap={4}>
          <Button
            bgColor="#1B263B"
            color="#D4AF37"
            borderRadius="full"
            _hover={{}}
            px={8}
            onClick={onConfirm}
            width="150px"
          >
            Save
          </Button>
          <Button
            border="1px solid #1B263B"
            textColor="#1B263B"
            borderRadius="full"
            px={8}
            onClick={onClose}
            width="150px"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

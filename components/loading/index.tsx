import { Modal, ModalBody, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react';

export const LoadingPopup = ({ isOpen }: { isOpen: boolean }) => {
  useEffect(() => {
    if (isOpen) {
      // Add class or styles to prevent scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      document.body.style.overflow = '';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" color="primary.500" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}


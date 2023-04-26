import React, {FC} from 'react';
import {Modal as DefaultModal, Pressable, ModalProps} from 'react-native';
import {Card, Typography} from '../theme';

export const Modal: FC<ModalProps> = ({onRequestClose, children, ...props}) => {
  return (
    <DefaultModal transparent animationType="slide" {...props}>
      <Card {...styles.centeredView}>
        <Card {...styles.modalView}>
          <Card {...styles.header}>
            <Pressable onPress={onRequestClose}>
              <Typography>Hide</Typography>
            </Pressable>
          </Card>
          {children}
        </Card>
      </Card>
    </DefaultModal>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    mt: 'md',
  },
  modalView: {
    borderRadius: 20,
    bg: 'paper',
    p: 'md',
  },
  header: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
};

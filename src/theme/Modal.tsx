import React, {FC} from 'react';
import {
  Modal as DefaultModal,
  Pressable,
  ModalProps,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Card, Typography} from '../theme';

export const Modal: FC<ModalProps> = ({onRequestClose, children, ...props}) => {
  return (
    <DefaultModal transparent animationType="slide" {...props}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        {...styles.container}>
        <Card {...styles.modalView}>
          <Card {...styles.header}>
            <Pressable onPress={onRequestClose}>
              <Typography>Hide</Typography>
            </Pressable>
          </Card>
          {children}
        </Card>
      </KeyboardAvoidingView>
    </DefaultModal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    mt: 'md',
  },
  modalView: {
    borderTopEndRadius: 20,
    bg: 'paper',
    p: 'md',
    maxHeight: Dimensions.get('window').height - 100,
  },
  header: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
};

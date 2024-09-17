import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { TbLock, TbMail } from 'react-icons/tb';
import { MainContext } from '../context/MainContext';
import { DialogContext } from '../context/DialogContext';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import useInput from '../hooks/useInput';
import fields from '../models/Fields';

const LoginDialog = () => {
  const { handleReturnToHome } = useContext(MainContext);
  const { loginDialogClose, loginDialogIsOpen, loginDialogOpenChange } =
    useContext(DialogContext);
  const { FIELD_EMPTY, LOGIN_SUCCESSFULLY } = fields;
  const { login } = useContext(UserContext);
  const [emailError, setEmailError] = useState(FIELD_EMPTY);
  const [passError, setPassError] = useState(FIELD_EMPTY);
  const [loginError, setLoginError] = useState(FIELD_EMPTY);
  const navigate = useNavigate();
  const email = useInput('');
  const pass = useInput('');

  const checkFormData = async () => {
    try {
      await login(email.value, pass.value);
      loginDialogClose();
      clearModalData();
      navigate('/');
      toast.success(LOGIN_SUCCESSFULLY, {
        position: 'top-right'
      });
    } catch (error) {
      toast.error('Error al iniciar sesión', {
        position: 'top-right'
      });
    }
  };

  const checkEmptyData = (value, type) => {
    let errorMessage = '';
    setLoginError('');

    if (!value) {
      errorMessage = FIELD_EMPTY;
    }

    if (type === 'email') {
      setEmailError(errorMessage);
    } else if (type === 'pass') {
      setPassError(errorMessage);
    }
  };

  const clearModalData = () => {
    setEmailError(FIELD_EMPTY);
    setPassError(FIELD_EMPTY);
  };

  const handleCancel = () => {
    loginDialogClose();
    navigate('/');
  };

  const handleSubmit = () => {
    if (!emailError && !passError) {
      checkFormData();
    }
  };

  return (
    <Modal
      isOpen={loginDialogIsOpen}
      onOpenChange={loginDialogOpenChange}
      onClose={() => {
        handleCancel();
        handleReturnToHome();
      }}
      isDismissable={false}
      isKeyboardDismissDisabled
      size='xs'
      backdrop='blur'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 modal-header'>
          Ingresa
        </ModalHeader>
        <ModalBody>
          <div className='card flex justify-content-center min-height-300'>
            <div className='flex flex-column gap-2rem width-100 min-height-200'>
              <div>
                <label>Correo electrónico</label>
                <Input
                  startContent={<TbMail />}
                  type='email'
                  variant='bordered'
                  isInvalid={!!emailError}
                  value={email.value}
                  onChange={(e) => {
                    email.onChange(e);
                    checkEmptyData(email.value, 'email');
                  }}
                  errorMessage={emailError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>

              <div>
                <label>Contraseña</label>
                <Input
                  startContent={<TbLock />}
                  type='password'
                  variant='bordered'
                  isInvalid={!!passError}
                  value={pass.value}
                  onChange={(e) => {
                    pass.onChange(e);
                    checkEmptyData(pass.value, 'pass');
                  }}
                  errorMessage={passError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='flex-column align-items-center'>
            <div className='display-flex justify-center gap-1rem modal-buttons'>
              <Button onClick={handleCancel} variant='ghost' color='default'>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} variant='ghost' color='warning'>
                Aceptar
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginDialog;

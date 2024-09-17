import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { CartPizzaCard } from '../pages';
import fields from '../models/Fields';
import { MainContext } from '../context/MainContext';
import { DialogContext } from '../context/DialogContext';
import { UserContext } from '../context/UserContext';
import { checkoutCart } from '../service/fetchPizzas';
import { toast } from 'react-hot-toast';

const CartDialog = () => {
  const { pizzaAdded, totalPrice, handleReturnToHome, setPizzaAdded, setTotalPrice } = useContext(MainContext);
  const { cartClose, cartIsOpen, cartOpenChange } = useContext(DialogContext);
  const { token, tokenValue } = useContext(UserContext);
  const { CART_DIALOG_TITLE } = fields;
  const navigate = useNavigate();

  const handleClose = () => {
    cartClose();
    handleReturnToHome();
    navigate('/');
  };

  const handleCheckout = async (pizzaAdded) => {
    try {
      await checkoutCart(pizzaAdded, tokenValue);
      cartClose();
      handleReturnToHome();
      navigate('/');
      toast.success('Pago realizado exitosamente', {
        position: 'top-right'
      });
      setPizzaAdded([])
      setTotalPrice(0)
    } catch (error) {
      toast.error('Error al realizar el pago, intente nuevamente', {
        position: 'top-right'
      });
    }
  };

  return (
    <Modal
      isOpen={cartIsOpen}
      onOpenChange={cartOpenChange}
      onClose={handleClose}
      size='xl'
      backdrop='blur'
      isDismissable={false}
      isKeyboardDismissDisabled
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1rem modal-header'>
          {CART_DIALOG_TITLE}
        </ModalHeader>
        <ModalBody className='flex flex-column gap-1rem width-100'>
          {pizzaAdded && pizzaAdded.length > 0 ? (
            pizzaAdded.map((pizza, index) => (
              <CartPizzaCard key={index} {...pizza} />
            ))
          ) : (
            <h2>No tienes productos en tu carrito de compras</h2>
          )}
        </ModalBody>
        <ModalFooter>
          <div className='flex-column align-items-center gap-1rem'>
            <div className='display-flex gap-1rem'>
              <div>Total a pagar: </div>
              <h2 style={{ color: 'orange' }}>
                ${parseInt(totalPrice).toLocaleString('es-CL')}
              </h2>
            </div>
            <div className='display-flex justify-center gap-1rem modal-buttons'>
              <Button onClick={handleClose} variant='ghost' color='default'>
                Cancelar
              </Button>
              <Button
                onClick={() => handleCheckout(pizzaAdded)}
                variant='ghost'
                color='warning'
                isDisabled={!token || totalPrice == 0}
              >
                Pagar
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartDialog;

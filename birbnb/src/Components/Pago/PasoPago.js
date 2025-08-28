import React from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';
import './PasoPago.css';

const PasoPago = ({ onNext, onBack, formDataPago, setFormDataPago }) => {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    meta
  } = usePaymentInputs();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataPago(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    const hasErrors = Object.keys(meta.erroredInputs).length > 0;
    if (hasErrors) {
      
      onNext({
          lastFour: formDataPago.cardNumber.slice(-4),
          cardType: meta.cardType,
          expiryDate: formDataPago.expiryDate
        });
      e.preventDefault();
    } else {
      alert('Por favor corregí los errores en el formulario de pago.');
    }
  };
  const renderCardIcon = () => {
    switch (meta.cardType) {
      case 'visa': return <FaCcVisa size={36} />;
      case 'mastercard': return <FaCcMastercard size={36} />;
      case 'amex': return <FaCcAmex size={36} />;
      case 'discover': return <FaCcDiscover size={36} />;
      default: return (
        <>
          <FaCcVisa size={28} />
          <FaCcMastercard size={28} />
          <FaCcAmex size={28} />
          <FaCcDiscover size={28} />
        </>
      );
    }
  };

  const hasErrors = Object.keys(meta.erroredInputs).length > 0;

  return (
    <div className="pago-container">
      <h2 className="pago-titulo">Confirmar Pago</h2>
      <p className="pago-subtitulo">Por favor, ingresá los datos de tu tarjeta</p>

      <div className="pago-preview">
        <div className="pago-iconos">{renderCardIcon()}</div>
        <div className="pago-numero">{formDataPago.cardNumber || '**** **** **** ****'}</div>
        <div className="pago-detalles">
          <span className="pago-nombre">NOMBRE EN TARJETA</span>
          <span className="pago-exp-cvc">
            {formDataPago.expiryDate || 'MM/AA'} · {formDataPago.cvc ? '*'.repeat(formDataPago.cvc.length) : '***'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pago-formulario">
        <div className="pago-input-group">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            {...getCardNumberProps({
              onChange: handleInputChange,
              value: formDataPago.cardNumber,
              name: 'cardNumber',
              id: 'cardNumber',
              placeholder: 'Ej: 1234 5678 9012 3456'
            })}
            className="pago-input"
          />
        </div>

        <div className="pago-row">
          <div className="pago-input-group">
            <label htmlFor="expiryDate">Fecha de vencimiento</label>
            <input
              {...getExpiryDateProps({
                onChange: handleInputChange,
                value: formDataPago.expiryDate,
                name: 'expiryDate',
                id: 'expiryDate',
                placeholder: 'MM/AA'
              })}
              className="pago-input"
            />
          </div>

          <div className="pago-input-group">
            <label htmlFor="cvc">CVV</label>
            <input
              {...getCVCProps({
                onChange: handleInputChange,
                value: formDataPago.cvc,
                name: 'cvc',
                id: 'cvc',
                placeholder: 'Ej: 123'
              })}
              className="pago-input"
            />
          </div>
        </div>

        {meta.isTouched && meta.error && (
          <div className="pago-error">{meta.error}</div>
        )}

        <div className="pago-acciones">
          <button type="button" className="pago-btn pago-secundario" onClick={onBack}>
            Volver
          </button>
          <button
            type="submit"
            className="pago-btn pago-primario"
            onClick={handleSubmit}
            // disabled={hasErrors} Porque trae problemas pero en si esta la funcionalidad hecha
          >
            Siguente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasoPago;

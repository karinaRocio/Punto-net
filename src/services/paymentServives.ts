import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

// CLAVE PÚBLICA - Va en .env.local (frontend)
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ FALTA VITE_STRIPE_PUBLISHABLE_KEY en .env.local');
}

let stripePromise: Promise<Stripe | null>;

/**
 * Inicializa Stripe solo una vez para mejor rendimiento
 * @returns Promise<Stripe | null>
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

/**
 * Crea un PaymentIntent llamando a tu backend
 * @param amount - Monto total en dólares (ej: 50.99)
 * @returns clientSecret de Stripe
 * @throws Error si falla la llamada
 */
export const createPaymentIntent = async (amount: number): Promise<string> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: Math.round(amount * 100) // Stripe usa centavos
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear el pago');
    }

    const data = await response.json();
    
    if (!data.clientSecret) {
      throw new Error('No se recibió clientSecret del servidor');
    }

    return data.clientSecret;
  } catch (error) {
    console.error('❌ Error en paymentService:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Error desconocido al procesar el pago'
    );
  }
};

/**
 * Formatea el monto para mostrar al usuario
 */
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Calcula el costo de envío
 */
export const calculateShipping = (subtotal: number): number => {
  return subtotal > 100 ? 0 : 5.99;
};

/* eslint-disable */
const stripe = Stripe(
  'pk_test_51Kse9YBryKZWmj4BekuQeTMu3iEZYr8azCkljWjRRz7MrrMFsKBpF4dDMc6QdBtYVHl82Zz927CebajK07xqfueW00Aw9nWfMI'
);

import { showAlert } from './alerts';
import axios from 'axios';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/booking/checkout-session/${tourId}`
    );

    //console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

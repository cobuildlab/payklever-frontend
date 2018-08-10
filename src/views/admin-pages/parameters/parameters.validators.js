/*
Availity reactstrap Validation
 */
const parametersAvForm = {
  FRONT_URL: {
    required: true,
  },
  BACK_URL: {
    required: true,
  },
  SHORTENER_URL: {
    required: true,
  },
  TZ: {
    required: true,
  },
  TWILIO_NUMBER: {
    required: true,
  },
  TWILIO_ACCOUNT_SID: {
    required: true,
  },
  TWILIO_AUTH_TOKEN: {
    required: true,
  },
  STRIPE_PUBLIC_KEY: {
    required: true,
  },
  STRIPE_SECRET_KEY: {
    required: true,
  },
  FIXED_VALUE_PER_MSG: {
    required: true,
    min: 0,
    step: 0.1,
  },
  TAX: {
    required: true,
    min: 0,
    step: 0.1,
  },
  CONFIRMATION_SUCCESS_URL: {
    required: true,
  },
  CONFIRMATION_ERROR_URL: {
    required: true,
  },
  FIXED_GEOPOSITION_RADIUS_IN_MILES: {
    required: true,
    min: 0,
    step: 0.1,
  },
  PAGINATION_LIMIT: {
    required: true,
    min: 1,
    step: 1,
  },
  SEARCH_LIMIT: {
    required: true,
    min: 1,
    step: 1,
  },
}

export { parametersAvForm };

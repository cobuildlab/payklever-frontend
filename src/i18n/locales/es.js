export default {
  APP: {
    youHaveLoggedOut: 'Has cerrado la sesión',
    invalidForm: 'Formulario inválido',
  },
  LOGIN: {
    login: 'Iniciar Sesión',
    email: 'Correo',
    password: 'Contraseña',
    register: '¿No tienes cuenta? Registrate',
    recoverPassword: 'Recuperar contraseña',
    invalidEmail: 'Email inválido',
    emptyEmail: 'Correo Requerido',
    emptyPassword: 'Contraseña requerida',
    youHaveLoggedIn: 'Has iniciado sesión',
    loggingIn: 'Iniciando Sesión',
  },
  SIGNUP: {
    signup: 'Registrarse',
    firstName: 'Nombres',
    lastName: 'Apellidos',
    email: 'Correo',
    password: 'Contraseña',
    recoverLogin: '¿Ya tienes cuenta? Inicia Sesión',
    repeatPassword: 'Repetir Contraseña',
    privacyPolicy: 'Política de Privacidad',
    invalidFirstName: 'Solo letras: min: 3, max: 40',
    invalidLastName: 'Solo letras: min: 3, max: 40',
    invalidEmail: 'Email inválido',
    invalidPassword: 'Caracteres: min: 8, max: 20',
    passwordNotMatch: 'Las Contraseñas no coinciden',
    emptyFirstName: 'Nombres requeridos',
    emptyLastName: 'Apellidos requeridos',
    emptyEmail: 'Correo Requerido',
    emptyPassword: 'Contraseña requerida',
    acceptPrivacy: 'Debes aceptar las Políticas de Privacidad',
    youHaveRegistered: 'Te has Registrado!',
    signingUp: 'Registrando Usuario',
    emailInUse: 'El Correo esta siendo usado por otro usuario',
  },
  PROFILE: {
    profile: 'Perfil',
    editProfile: 'Editar Perfil',
    nameAndSurname: 'Nombre y Apellido',
    email: 'Correo',
    paymentMethods: 'Métodos de Pago',
    accounts: 'Cuentas',
  },
  ACCOUNTS: {
    cancel: 'Cancelar',
    createAccount: 'Crear Cuenta',
    loadingAccounts: 'Cargando Cuentas',
    name: 'Nombre de la Cuenta',
    status: 'Estatus',
  },
  CREATE_ACCOUNT: {
    createAccount: 'Crear Cuenta',
    accountName: 'Nombre de la Cuenta',
    emptyName: 'Nombre requerido',
    location: 'Ubicación',
    paymentMethod: 'Método de pago',
    selectPaymentMethod: 'Selecciona un Método de Pago',
    invalidPaymedia: 'Invalid Payment Method',
    invalidName: 'Solo letras: min: 4, max: 10',
    InvalidLocation: 'Campo obligatorio: Solo letras',
    accountCreated: 'Cuenta Creada!',
    creatingAccount: 'Creando Cuenta',
  },
  PAYMENT_METHODS: {
    createPayment: 'Crear Método de Pago',
    loadingPayments: 'Cargando metodos de Pago',
    user: 'Nombre',
    card: 'Tarjeta de Credito',
    cancel: 'Cancelar',
  },
  CREATE_PAYMENT: {
    createPayment: 'Crear Método de Pago',
    firstName: 'Nombre',
    lastName: 'Apellido',
    cardNumber: 'Número de tarjeta',
    expirationDate: 'Vencimiento',
    expireMonth: 'Mes',
    expireYear: 'Año',
    securityCode: 'Código',
    country: 'País',
    zipCode: 'Código Postal',
    emptyFirstName: 'Nombre requerido',
    emptyLastName: 'Apellido requerido',
    emptyCardNumber: 'Número de tarjeta requerido',
    emptyExpireMonth: 'Mes de expiración requerido',
    emptyExpireYear: 'Año de expiración requerido',
    emptySecurityCode: 'Código de seguridad requerido',
    emptyZipCode: 'Código Postal requerido',
    invalidFirstName: 'Solo letras: min: 3, max: 20',
    invalidLastName: 'Solo letras: min: 3, max: 20',
    invalidCardNumber: 'Número de tarjeta Inválido',
    invalidExpirationDateMonth: 'Mes de expiración inválido',
    invalidExpirationDateYear: 'Año de expiración inválido',
    invalidSecurityCode: 'Código de seguridad Inválido',
    invalidCountry: 'Campo obligatorio: Solo letras',
    invalidPostalCode: 'Código Postal inválido',
    paymentCreated: 'Método de Pago Creado!',
    creatingPayment: 'Creando Método de Pago',
  },
  CAMPAIGNS: {
    createCampaign: 'Crear Campaña',
    campaigns: 'Campañas',
    loadingCampaigns: 'Cargando Campañas',
    name: 'Nombre',
    title: 'Título',
    status: 'Estatus',
  },
  CREATE_CAMPAIGN: {
    campaignInfo: 'Información de la Campaña',
    accountInfo: 'Información de la Cuenta',
    accountName: 'Nombre de la Cuenta',
    accountPayment: 'Método de Pago',
    accountLocation: 'Ubicación',
    budget: 'Presupuesto',
    createCampaign: 'Crear Campaña',
    name: 'Nombre de la Campaña',
    emptyName: `Nombre de la Campaña requerido`,
    emptyMessageTitle: `Título del mensaje requerido`,
    emptyMessageDescription: `Descripción del mensaje requerida`,
    invalidName: 'Solo letras: min: 6, max: 40',
    messageTitle: 'Título del mensaje de texto',
    invalidMessageTitle: 'Solo letras: min: 6, max: 40',
    messageDescription: `Descripción del mensaje de texto`,
    invalidMessageDescription: 'Solo letras: min: 40, max: 160',
    gender: 'Género',
    age: 'Edad',
    education: 'Educación',
    civilStatus: 'Estado Civil',
    income: 'Ingresos',
    invalidGender: 'Género requerido',
    hourHand: 'Horario',
    invalidHourHand: 'Horario requerido',
    matchedAudiences: 'Audiencia',
    budgetAndProgramming: 'Presupuesto y programación',
    startDate: 'Fecha de inicio',
    stopDate: 'Fecha de culminación',
    bidPerClick: 'Oferta por clic',
    campaignCreated: 'Campaña Creada!',
    creatingCampaign: 'Creando Campaña',
    cancel: 'Cancelar',
    saveDraft: 'Guardar Borrador',
  },
  MAIN_NAV: {
    logout: 'Cerrar Sesión',
    profile: 'Perfil',
    rules: 'Reglas de Publicación',
  },
  FETCH: {
    noInternet: 'Verifica tu conexión a internet e intentalo de nuevo',
    error: 'Ha ocurrido un error',
  },
  ADMIN: {
    client: 'Clientes',
    campaign: 'Campañas',
    message: 'Mensajes',
  },
}

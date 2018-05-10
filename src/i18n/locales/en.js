export default {
  APP: {
    youHaveLoggedOut: 'You have Logged Out',
    invalidForm: 'Formulario inválido',
    accept: 'Accept',
    cancel: 'Cancel',
  },
  CAMPAIGN_ADMIN_STATUS: {
    ap: 'Approved',
    wa: 'Waiting Approval',
    na: 'Draft',
    re: 'Rejected',
  },
  CAMPAIGN_USER_STATUS: {
    ac: 'Active',
    ia: 'Inactive',
    de: 'deleted',
  },
  LOGIN: {
    login: 'Log In',
    email: 'Email',
    password: 'Password',
    register: 'You do not have an account? Sign up',
    recoverPassword: 'Recover Password',
    invalidEmail: 'Invalid Email',
    emptyEmail: 'Empty Email',
    passwordRequired: 'Password required',
    youHaveLoggedIn: 'You have logged in',
    loggingIn: 'Logging In',
  },
  SIGNUP: {
    signup: 'Sign Up',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    recoverLogin: 'Already have an account? Log in',
    repeatPassword: 'Repeat Password',
    privacyPolicy: 'Privacy Policy',
    invalidFirstName: 'Letters only: min: 3, max: 40',
    invalidLastName: 'Letters only: min: 3, max: 40',
    invalidEmail: 'Invalid Email',
    invalidPassword: 'Characters: min: 8, max: 20',
    passwordNotMatch: 'Passwords do not match',
    emptyFirstName: 'Firstname required',
    emptyLastName: 'Lastname required',
    emptyEmail: 'Email required',
    emptyPassword: 'Password required',
    acceptPrivacy: 'You must accept Privacy Policy',
    youHaveRegistered: 'You have Signed Up!',
    signingUp: 'Signing Up',
    emailInUse: 'The Email is being used by another user',
  },
  PROFILE: {
    profile: 'Profile',
    editProfile: 'Edit Profile',
    nameAndSurname: 'Name and Surname',
    email: 'Email',
    paymentMethods: 'Payment Methods',
    accounts: 'Accounts',
  },
  ACCOUNTS: {
    cancel: 'Cancel',
    createAccount: 'Create Account',
    loadingAccounts: 'Loading Accounts',
    name: 'Account Name',
    status: 'Status',
  },
  CREATE_ACCOUNT: {
    createAccount: 'Create Account',
    accountName: 'Account name',
    emptyName: 'Name required',
    location: 'Location',
    emptyLocation: 'Location required',
    city: 'City',
    emptyCity: 'City required',
    state: 'State',
    emptyState: 'State required',
    country: 'Country',
    emptyCountry: 'Country required',
    zipCode: 'Zip Code',
    emptyZipCode: 'Zip Code required',
    invalidLvl2: 'Invalid administrative_area_level_2',
    emptyLatitude: 'Latitude required',
    emptyLongitude: 'Longitude required',
    invalidLatitude: 'Invalid Latitude',
    invalidLongitude: 'Invalid Longitude',
    paymentMethod: 'Payment Method',
    selectPaymentMethod: 'Select Payment Method',
    invalidPaymedia: 'Invalid Payment Method',
    invalidName: 'Letters only: min: 6, max: 40',
    InvalidLocation: 'Required: Letters only',
    accountCreated: 'Account Created!',
    creatingAccount: 'Creating Account',
    createPayment: 'Create Payment Method',
    noPayment: 'You must have at least one Payment Method before you can create an Account',
    cancel: 'Cancel',
  },
  PAYMENT_METHODS: {
    createPayment: 'Create Payment Method',
    loadingPayments: 'Loading Payment Methods',
    user: 'Name and Surname',
    card: 'Credit Card',
    cancel: 'Cancel',
  },
  CREATE_PAYMENT: {
    createPayment: 'Create Payment Method',
    firstName: 'First Name',
    lastName: 'Last Name',
    cardNumber: 'Card Number',
    expirationDate: 'Expiration',
    expireMonth: 'Month',
    expireYear: 'Year',
    expirationMonth: 'Expiration Month',
    expirationYear: 'Expiration Year',
    securityCode: 'Security Code',
    country: 'Country',
    zipCode: 'Postal Code',
    emptyFirstName: 'Firstname required',
    emptyLastName: 'Lastname required',
    emptyCardNumber: 'Card Number Required',
    emptyExpireMonth: 'Expire month required',
    emptyExpireYear: 'Expire Year required',
    emptySecurityCode: 'Security Code required',
    emptyZipCode: 'Zip Code required',
    invalidFirstName: 'Letters only: min: 3, max: 20',
    invalidLastName: 'Letters only: min: 3, max: 20',
    invalidCardNumber: 'Invalid Card Number',
    invalidExpirationDateMonth: 'Invalid Expire Month',
    invalidExpirationDateYear: 'Invalid Expire Year',
    invalidSecurityCode: 'Invalid Security Code',
    invalidCountry: 'Required: Letters only',
    invalidPostalCode: 'Invalid Postal Code',
    paymentCreated: 'Payment Method Created!',
    creatingPayment: 'Creating Payment Method',
    cancel: 'Cancel',
  },
  CAMPAIGNS: {
    createCampaign: 'Create Campaign',
    campaigns: 'Campaigns',
    loadingCampaigns: 'Loading Campaigns',
    name: 'Name',
    title: 'Title',
    status: 'Status',
    adminStatus: 'Admin Status',
  },
  CREATE_CAMPAIGN: {
    campaignInfo: 'Campaign Information',
    accountInfo: 'Account Information',
    accountName: 'Account Name',
    accountPayment: 'Payment Method',
    accountLocation: 'Location',
    budget: 'Budget',
    emptyBudget: 'Budget required',
    invalidBudget: 'Invalid Budget',
    createCampaign: 'Create Campaign',
    name: `Campaign's Name`,
    emptyName: `Campaign's name required`,
    emptyMessageTitle: `Message's tittle required`,
    emptyMessageDescription: `Message's description required`,
    invalidName: 'Characters: min: 6, max: 40',
    messageTitle: `Text message's Title`,
    invalidMessageTitle: 'Characters: min: 6, max: 40',
    messageDescription: `Text message's description`,
    invalidMessageDescription: 'Characters: min: 40, max: 160',
    gender: 'Gender',
    age: 'Age',
    emptyAge: 'You must select at least one Age',
    invalidAge: 'Invalid Ages',
    education: 'Education',
    civilStatus: 'Civil Status',
    income: 'income',
    emptyIncome: 'You must select at least one Estimated Income',
    invalidIncome: 'Invalid Estimated Incomes',
    emptyGender: 'Genre required',
    invalidGender: 'Invalid Genre',
    hourHand: 'Hour Hand',
    emptyHourHand: 'You must select at least one Hour Hand',
    invalidHourHand: 'Invalid Hour hand',
    matchedAudiences: 'Matched Audiences',
    budgetAndProgramming: 'Budget and Programming',
    startDate: 'Start date',
    emptyStartDate: 'Start Date required',
    invalidStartDate: 'Invalid Start Date',
    endDate: 'stop Date',
    emptyEndDate: 'End Date required',
    invalidEndDate: 'Invalid End Date',
    bidPerClick: 'Bid per click',
    campaignCreated: 'Campaign Created!',
    creatingCampaign: 'Creating Campaign',
    createAccount: 'Create Account',
    noAccount: 'You must have at least one Account before you can create a Campaign',
    cancel: 'Cancel',
    saveDraft: 'Save Draft',
    male: 'Male',
    female: 'Female',
    all: 'All',
    to: 'to',
  },
  MAIN_NAV: {
    logout: 'Log Out',
    profile: 'Profile',
    rules: 'Publication Rules',
  },
  FETCH: {
    noInternet: 'Check your internet connection and try again',
    error: 'An error has ocurred',
  },
  CAMPAIGN_MANAGER: {
    client: 'Clients',
    campaign: 'Campaigns',
    message: 'Messages',
  },
  CLIENTS: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'Email',
    loadingClients: 'Loading Clients',
  },
  CLIENT_CAMPAIGNS: {
    campaignName: 'Campaign name',
    messageTitle: 'Message Title',
    status: 'status',
    adminStatus: 'Admin Status',
    loadingCampaigns: 'Loading Campaigns',
    approve: 'Approve Campaign',
    reject: 'Reject Campaign',
    approveHeader: 'Approve Campaign?',
    approveBody: 'Are you sure you want to approve the Campaign: {{campaignName}}?',
    rejectHeader: 'Reject Campaign?',
    rejectBody: 'Are you sure you want to reject the Campaign: {{campaignName}}?',
    approvingCampaign: 'Approving Campaign',
    rejectingCampaign: 'Rejecting Campaign',
    campaignApproved: 'The Campaign was succesfully Approved',
    campaignRejected: 'The Campaign was succesfully Rejected',
  },
}

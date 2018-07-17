export default {
  APP: {
    youHaveLoggedOut: 'You have logged out',
    invalidForm: 'Formulario inválido',
    optionalMsg: 'Optional message',
    accept: 'Accept',
    cancel: 'Cancel',
  },
  CAMPAIGN_ADMIN_STATUS: {
    ap: 'Approved',
    wa: 'Waiting approval',
    na: 'Draft',
    re: 'Rejected',
    su: 'Suspended',
    fi: 'Finished',
  },
  CAMPAIGN_USER_STATUS: {
    ac: 'Active',
    ia: 'Paused',
    de: 'Deleted',
  },
  PROMOTION_TYPES: {
    sc: 'Sms',
    ac: 'Money',
    sp: 'Special',
  },
  PROMOTION_STATUS: {
    ac: 'Active',
    ia: 'Paused',
  },
  LOGIN: {
    login: 'Log In',
    email: 'Email',
    password: 'Password',
    register: 'You do not have an account? Sign Up',
    recoverPassword: 'Recover password',
    forgotPassword: 'Forgot your password?',
    invalidEmail: 'Invalid email',
    emptyEmail: 'Email required',
    emptyPassword: 'Password required',
    youHaveLoggedIn: 'You have logged in!',
    loggingIn: 'Logging In',
    emailConfirmed: 'Your email was succesfully confirmed',
    emailConfirmedError: 'Error trying to confirm the email, please try again',
  },
  SIGNUP: {
    signup: 'Sign Up',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    recoverLogin: 'Already have an account? Log in',
    repeatPassword: 'Repeat password',
    privacyPolicy: 'I accept the Terms and Conditions and Privacy Policy',
    invalidFirstName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidLastName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidEmail: 'Invalid email',
    invalidPassword: 'Characters: min: 8, max: 20',
    passwordNotMatch: 'Passwords do not match',
    emptyFirstName: 'Firstname required',
    emptyLastName: 'Lastname required',
    emptyEmail: 'Email required',
    emptyPassword: 'Password required',
    acceptPrivacy: 'You must accept the Terms and Conditions and Privacy Policy',
    youHaveRegistered: 'You have signed up!',
    signingUp: 'Signing Up',
    emailInUse: 'The email is being used by another user',
  },
  TERMS: {
    terms: 'Terms and Conditions',
  },
  PRIVACY_POLICY: {
    privacyPolicy: 'Privacy Policy',
  },
  RECOVER_PASSWORD: {
    recoverPassword: 'Recover password',
    submitEmail: 'Submit email',
    submittingEmail: 'Submitting email',
    emailSubmitted: 'An email has been sent with the instructions to reset your password',
    resetPassword: 'Already have a code? Reset your password',
  },
  RESET_PASSWORD: {
    newPassword: 'New password',
    resetPassword: 'Reset password',
    code: 'Code',
    emptyCode: 'Code required',
    resettingPassword: 'Resetting password',
    passwordChanged: 'Password succesfully changed!',
  },
  EDIT_PROFILE: {
    profileUpdated: 'Profile successfully updated!',
    editProfile: 'Edit profile',
    updatingProfile: 'Updating profile',
    invalidUserId: 'Invalid user',
    cancel: 'Cancel',
  },
  PROFILE: {
    profile: 'Profile',
    editProfile: 'Edit profile',
    nameAndSurname: 'Name and surname',
    email: 'Email',
    paymentMethods: 'Payment methods',
    accounts: 'Accounts',
    uploadingPhoto: 'Uploading photo',
    photoUploaded: `Profile's photo successfully updated!`,
    invalidPhoto: 'Invalid photo: JPG or PNG only',
    changePhoto: 'Change photo',
    invoices: 'Invoices',
  },
  ACCOUNTS: {
    cancel: 'Cancel',
    createAccount: 'Create account',
    loadingAccounts: 'Loading accounts',
    name: 'Account name',
    status: 'Status',
    editAccount: 'Edit account',
  },
  CREATE_ACCOUNT: {
    createAccount: 'Create account',
    editAccount: 'Update account',
    loadingAccount: 'Loading account',
    updatingAccount: 'Updating account',
    accountUpdated: 'Account successfully updated!',
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
    zipCode: 'Zip code',
    emptyZipCode: 'Zip code required',
    invalidLvl2: 'Invalid administrative_area_level_2',
    emptyLatitude: 'Latitude required',
    emptyLongitude: 'Longitude required',
    invalidLatitude: 'Invalid latitude',
    invalidLongitude: 'Invalid longitude',
    paymentMethod: 'Payment method',
    selectPaymentMethod: 'Select payment method',
    invalidPaymedia: 'Invalid payment method',
    invalidName: 'Characters: min: 6, max: 40',
    InvalidLocation: 'Required: Letters only',
    accountCreated: 'Account successfully created!',
    creatingAccount: 'Creating account',
    createPayment: 'Create payment method',
    noPayment: 'You must have at least one payment method before you can create an account',
    cancel: 'Cancel',
    invalidAccountId: 'Invalid account',
  },
  PAYMENT_METHODS: {
    createPayment: 'Create payment method',
    loadingPayments: 'Loading payment methods',
    user: 'Name and surname',
    card: 'Credit card',
    cancel: 'Cancel',
    deletePayment: 'Delete payment method',
    deletingPayment: 'Deleting payment method',
    paymentDeleted: 'Payment method successfully deleted',
    deleteHeader: 'Delete payment method?',
    deleteBody: 'Are you sure you want to delete the payment method: {{cardNumber}}?',
  },
  CREATE_PAYMENT: {
    createPayment: 'Create payment method',
    firstName: 'First name',
    lastName: 'Last name',
    cardNumber: 'Card number',
    expirationDate: 'Expiration',
    expireMonth: 'Month',
    expireYear: 'Year',
    expirationMonth: 'Expiration month',
    expirationYear: 'Expiration year',
    securityCode: 'Security code',
    country: 'Country',
    zipCode: 'Postal code',
    emptyFirstName: 'Firstname required',
    emptyLastName: 'Lastname required',
    emptyCardNumber: 'Card number required',
    emptyExpireMonth: 'Expire month required',
    emptyExpireYear: 'Expire year required',
    emptySecurityCode: 'Security code required',
    emptyZipCode: 'Zip code required',
    invalidFirstName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidLastName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidCardNumber: 'Invalid Card Number',
    invalidExpirationDateMonth: 'Invalid expire month',
    invalidExpirationDateYear: 'Invalid expire year',
    invalidSecurityCode: 'Invalid security code',
    invalidCountry: 'Required: Letters only',
    invalidPostalCode: 'Invalid postal code',
    paymentCreated: 'Payment method successfully created!',
    creatingPayment: 'Creating payment method',
    cancel: 'Cancel',
  },
  CAMPAIGNS: {
    createCampaign: 'Create campaign',
    campaigns: 'Campaigns',
    loadingCampaigns: 'Loading campaigns',
    editCampaign: 'Edit campaign',
    name: 'Name',
    title: 'Title',
    status: 'Status',
    adminStatus: 'Admin status',
  },
  CREATE_CAMPAIGN: {
    campaignInfo: 'Campaign information',
    accountInfo: 'Account information',
    accountName: 'Account name',
    accountPayment: 'Payment method',
    accountLocation: 'Location',
    budget: 'Budget',
    emptyBudget: 'Budget required',
    invalidBudget: 'Invalid budget',
    createCampaign: 'Create campaign',
    editCampaign: 'Edit campaign',
    name: `Campaign's name`,
    emptyName: `Campaign's name required`,
    emptyMessageTitle: `Message's tittle required`,
    emptyMessageDescription: `Message's description required`,
    invalidName: 'Characters: min: 6, max: 40',
    messageTitle: `Text message's title`,
    invalidMessageTitle: 'Characters: min: 6, max: 40',
    messageDescription: `Text message's description`,
    invalidMessageDescription: 'Characters: min: 40, max: 160',
    gender: 'Gender',
    age: 'Age',
    emptyAge: 'You must select at least one age',
    invalidAge: 'Invalid ages',
    education: 'Education',
    civilStatus: 'Civil status',
    income: 'Income',
    emptyIncome: 'You must select at least one estimated income',
    invalidIncome: 'Invalid estimated incomes',
    emptyGender: 'Genre required',
    invalidGender: 'Invalid genre',
    hourHand: 'Hour hand',
    emptyHourHand: 'You must select at least one hour hand',
    invalidHourHand: 'Invalid hour hand',
    matchedAudiences: 'Matched audiences',
    budgetAndProgramming: 'Budget and programming',
    startDate: 'Start date',
    emptyStartDate: 'Start date required',
    invalidStartDate: 'Invalid start date',
    endDate: 'Stop date',
    emptyEndDate: 'Stop date required',
    invalidEndDate: 'Invalid stop date',
    bidPerClick: 'Bid per click',
    emptyPaymedia: 'Your account must have a payment method in order to activate the campaign',
    invalidPaymedia: 'Invalid payment method',
    campaignSaved: 'Campaign successfully saved! You can continue editing your campaign until it is ready to be published!',
    savingCampaign: 'Saving campaign',
    createAccount: 'Create account',
    noAccount: 'You must have at least one account before you can create a campaign',
    cancel: 'Cancel',
    saveDraft: 'Save draft',
    male: 'Male',
    female: 'Female',
    all: 'All',
    selectAll: 'Select all',
    unSelectAll: 'Unselect all',
    to: 'to',
    requestApproval: 'Request approval',
    requestingApproval: 'Requesting approval',
    approvalRequested: 'Request for approval sent, please wait for our administrators to review the campaign!',
    resumeCampaign: 'Resume campaign',
    resumingCampaign: 'Resuming campaign',
    canRequestApproval: 'Your campaign is ready! You can request our approval to publish it',
    loadingCampaign: 'Loading campaign',
    cannotEdit: 'Only "Draft" and "Rejected" campaigns can be updated',
    paymentRequired: 'Payment method required',
    mustHavePayment: 'Your account must have a payment method in order to publish the campaign',
  },
  MAIN_NAV: {
    logout: 'Log Out',
    profile: 'Profile',
    rules: 'Publication rules',
  },
  FETCH: {
    noInternet: 'Check your internet connection and try again',
    error: 'An error has ocurred',
  },
  CAMPAIGN_MANAGER: {
    client: 'Clients',
    campaign: 'Campaigns',
    promotions: 'Promotions',
    message: 'Messages',
  },
  CLIENTS: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'Email',
    loadingClients: 'Loading clients',
  },
  CLIENT_CAMPAIGNS: {
    campaignName: 'Campaign name',
    messageTitle: 'Message title',
    status: 'Status',
    adminStatus: 'Admin status',
    adminStatusFilter: 'Filter by admin status',
    loadingCampaigns: 'Loading campaigns',
  },
  CAMPAIGN_DETAILS: {
    campaignDetails: 'Campaign details',
    accountPayment: 'Payment method',
    accountInfo: 'Account information',
    accountLocation: 'Location',
    accountName: 'Account name',
    timeFrame: 'Hour hand',
    gender: 'Gender',
    age: 'Age',
    income: 'Income',
    budgetAndProgramming: 'Budget and programming',
    matchedAudiences: 'Matched audiences',
    budget: 'Budget',
    startDate: 'Start date',
    endDate: 'Stop date',
    approveCampaign: 'Approve campaign',
    rejectCampaign: 'Reject campaign',
    suspendCampaign: 'Suspend',
    adminStatus: 'Admin Status',
    status: 'Status',
    approveHeader: 'Approve campaign?',
    approveBody: 'Are you sure you want to approve the campaign: {{campaignName}}?',
    rejectHeader: 'Reject campaign?',
    rejectBody: 'Are you sure you want to reject the campaign: {{campaignName}}?',
    resumeHeader: 'Resume campaign?',
    resumeBody: 'Are you sure you want to resume the campaign: {{campaignName}}?',
    pauseHeader: 'Pause campaign?',
    pauseBody: 'Are you sure you want to pause the campaign: {{campaignName}}?',
    resumeCampaign: 'Resume campaign',
    pauseCampaign: 'Pause campaign',
    resumingCampaign: 'Resuming campaign',
    pausingCampaign: 'Pausing campaign',
    suspendHeader: 'Suspend campaign?',
    suspendBody: 'Are you sure you want to suspend the campaign: {{campaignName}}?',
    suspendingCampaign: 'Suspending campaign',
    campaignSuspended: 'The campaign was successfully suspended',
    campaignPaused: 'The campaign was successfully paused',
    loadingCampaign: 'Loading campaign',
    editCampaign: 'Edit campaign',
    duplicateCampaign: 'Duplicate campaign',
    duplicateHeader: 'Duplicate campaign?',
    duplicateBody: 'Are you sure you want to duplicate the campaign: {{campaignName}}?',
    campaignDuplicated: 'The campaign was successfully duplicated',
    duplicatingCampaign: 'Duplicating campaign',
    approvingCampaign: 'Approving campaign',
    rejectingCampaign: 'Rejecting campaign',
    campaignApproved: 'The campaign was successfully approved',
    campaignRejected: 'The campaign was successfully rejected',
    campaignResumed: 'The campaign was successfully resumed',
  },
  STATISTICS: {
    lastCountDays: 'Last {{days}} days',
    smsSentCount: 'Sent Messages ({{count}})',
    smsToBeSentCount: 'Messages to be sent ({{count}})',
    smsErrorsCount: 'Failed messages ({{count}})',
    loadingStatistics: 'Loading statistics',
  },
  CLIENT_DETAILS: {
    clientDetails: 'Client details',
    accounts: 'Accounts',
    loadingClient: 'Loading client',
  },
  INVOICES: {
    invoices: 'Invoices',
    smsSent: 'Sent sms',
    smsPrice: 'Sms price',
    tax: 'Tax',
    subTotal: 'Sub total',
    total: 'Total',
    campaignId: 'Campaign Id',
    loadingInvoices: 'Loading invoices',
  },
  INVOICE_DETAILS: {
    invoiceDetails: 'Invoice Details',
    campaignInfo: 'Campaign information',
    smsInfo: 'Sms information',
    cardInfo: 'Card info',
    loadingInvoice: 'Loading Invoice',
  },
  PROMOTIONS: {
    name: 'Promotion Name',
    type: 'Type',
    amount: 'Amount',
    status: 'Status',
    loadingPromotions: 'Loading promotions',
    createCouponPromotion: 'Create coupon promotion',
    createSpecialPromotion: 'Create special promotion',
  },
  CREATE_PROMOTION: {
    createPromotion: 'Create promotion',
    createCouponPromotion: 'Create coupon promotion',
    createSpecialPromotion: 'Create special promotion',
    creatingPromotion: 'Creating promotion',
    promotionCreated: 'Promotion succesfully created',
    promotionName: 'Promotion name',
    invalidName: 'Characters: min: 6, max: 40',
    description: 'Description',
    invalidDescription: 'Characters: min: 10, max: 60',
    startDate: 'Start date',
    invalidStartDate: 'Invalid start date',
    endDate: 'End date',
    invalidEndDate: 'Invalid end date',
    amount: 'Amount',
    invalidAmount: 'Number: (5 digits max)',
    invalidSpecialAmount: 'Number: (1 to 100)',
    type: 'Promotion Type',
    selectType: 'Select promotion type',
    invalidType: 'You must select a valid type',
    users: 'Users',
    emptyUserIds: 'You must select at least one user',
    invalidUserIds: 'Invalid Users',
    searchForUsers: 'Search for users',
    searchUsers: 'Search users',
    searchingUsers: 'Searching Users',
    emptyLabel: 'No matches found',
    emptyName: 'Empty promotion name',
    emptyStartDate: 'Empty start date',
    emptyEndDate: 'Empty end date',
    emptyAmount: 'Empty amount',
    emptyType: 'Empty promotion type',
    cancel: 'Cancel',
  },
  PROMOTION_DETAILS: {
    promotionDetails: 'Promotion details',
    loadingPromotion: 'Loading Promotion',
    userInfo: 'User information',
    nameAndSurname: 'Name and surname',
    email: 'Email',
    promotionInfo: 'Promotion information',
    name: 'Name',
    description: 'Description',
    type: 'Type',
    amount: 'Amount',
    status: 'Status',
    startDate: 'Start date',
    endDate: 'End date',
  },
}

export default {
  APP: {
    youHaveLoggedOut: 'You have Logged Out',
    invalidForm: 'Formulario inválido',
    optionalMsg: 'Optional Message',
    accept: 'Accept',
    cancel: 'Cancel',
  },
  CAMPAIGN_ADMIN_STATUS: {
    ap: 'Approved',
    wa: 'Waiting Approval',
    na: 'Draft',
    re: 'Rejected',
    su: 'Suspended',
  },
  CAMPAIGN_USER_STATUS: {
    ac: 'Active',
    ia: 'Paused',
    de: 'Deleted',
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
    youHaveLoggedIn: 'You have logged in!',
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
    privacyPolicy: 'I accept the terms and conditions',
    invalidFirstName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidLastName: 'Characters: min: 3, max: 40, (No numbers)',
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
  EDIT_PROFILE: {
    profileUpdated: 'Profile successfully updated!',
    editProfile: 'Edit Profile',
    updatingProfile: 'Updating Profile',
    invalidUserId: 'Invalid UserId',
    cancel: 'Cancel',
  },
  PROFILE: {
    profile: 'Profile',
    editProfile: 'Edit Profile',
    nameAndSurname: 'Name and Surname',
    email: 'Email',
    paymentMethods: 'Payment Methods',
    accounts: 'Accounts',
    uploadingPhoto: 'Uploading Photo',
    photoUploaded: `Profile's Photo successfully updated!`,
    invalidPhoto: 'Invalid Photo: JPG or PNG only',
    changePhoto: 'Change Photo',
  },
  ACCOUNTS: {
    cancel: 'Cancel',
    createAccount: 'Create Account',
    loadingAccounts: 'Loading Accounts',
    name: 'Account Name',
    status: 'Status',
    editAccount: 'Edit Account',
  },
  CREATE_ACCOUNT: {
    createAccount: 'Create Account',
    editAccount: 'Update Account',
    loadingAccount: 'Loading Account',
    updatingAccount: 'Updating Account',
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
    invalidName: 'Characters: min: 6, max: 40',
    InvalidLocation: 'Required: Letters only',
    accountCreated: 'Account successfully created!',
    creatingAccount: 'Creating Account',
    createPayment: 'Create Payment Method',
    noPayment: 'You must have at least one Payment Method before you can create an Account',
    cancel: 'Cancel',
    invalidAccountId: 'Invalid AccountId',
  },
  PAYMENT_METHODS: {
    createPayment: 'Create Payment Method',
    loadingPayments: 'Loading Payment Methods',
    user: 'Name and Surname',
    card: 'Credit Card',
    cancel: 'Cancel',
    deletePayment: 'Delete Payment Method',
    deletingPayment: 'Deleting Payment Method',
    paymentDeleted: 'Payment Method successfully deleted',
    deleteHeader: 'Delete Payment Method?',
    deleteBody: 'Are you sure you want to delete the Payment Method: {{cardNumber}}?',
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
    invalidFirstName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidLastName: 'Characters: min: 3, max: 40, (No numbers)',
    invalidCardNumber: 'Invalid Card Number',
    invalidExpirationDateMonth: 'Invalid Expire Month',
    invalidExpirationDateYear: 'Invalid Expire Year',
    invalidSecurityCode: 'Invalid Security Code',
    invalidCountry: 'Required: Letters only',
    invalidPostalCode: 'Invalid Postal Code',
    paymentCreated: 'Payment Method successfully created!',
    creatingPayment: 'Creating Payment Method',
    cancel: 'Cancel',
  },
  CAMPAIGNS: {
    createCampaign: 'Create Campaign',
    campaigns: 'Campaigns',
    loadingCampaigns: 'Loading Campaigns',
    editCampaign: 'Edit Campaign',
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
    editCampaign: 'Edit Campaign',
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
    income: 'Income',
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
    endDate: 'Stop date',
    emptyEndDate: 'End Date required',
    invalidEndDate: 'Invalid End Date',
    bidPerClick: 'Bid per click',
    emptyPaymedia: 'Your Account must have a Payment Method in order to activate the Campaign',
    invalidPaymedia: 'Invalid Payment Method',
    campaignSaved: 'Campaign successfully saved! You can continue editing your campaign until it is ready to be published!',
    savingCampaign: 'Saving Campaign',
    createAccount: 'Create Account',
    noAccount: 'You must have at least one Account before you can create a Campaign',
    cancel: 'Cancel',
    saveDraft: 'Save Draft',
    male: 'Male',
    female: 'Female',
    all: 'All',
    selectAll: 'Select All',
    unSelectAll: 'Unselect All',
    to: 'to',
    requestApproval: 'Request Approval',
    requestingApproval: 'Requesting Approval',
    approvalRequested: 'Request for approval sent, please wait for our administrators to review the campaign!',
    resumeCampaign: 'Resume Campaign',
    resumingCampaign: 'Resuming Campaign',
    canRequestApproval: 'Your Campaign is ready! You can request our approval to publish it',
    loadingCampaign: 'Loading Campaign',
    cannotEdit: 'Only Draft and Rejected campaigns can be updated',
    paymentRequired: 'Payment Method required',
    mustHavePayment: 'Your account must have a payment method in order to publish the campaign',
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
    status: 'Status',
    adminStatus: 'Admin Status',
    loadingCampaigns: 'Loading Campaigns',
  },
  CAMPAIGN_DETAILS: {
    campaignDetails: 'Campaign details',
    accountPayment: 'Payment Method',
    accountInfo: 'Account Information',
    accountLocation: 'Location',
    accountName: 'Account Name',
    timeFrame: 'Hour Hand',
    gender: 'Gender',
    age: 'Age',
    income: 'Income',
    budgetAndProgramming: 'Budget and Programming',
    matchedAudiences: 'Matched Audiences',
    budget: 'Budget',
    startDate: 'Start date',
    endDate: 'Stop date',
    approveCampaign: 'Approve Campaign',
    rejectCampaign: 'Reject Campaign',
    suspendCampaign: 'Suspend',
    adminStatus: 'Admin Status',
    status: 'Status',
    approveHeader: 'Approve Campaign?',
    approveBody: 'Are you sure you want to approve the Campaign: {{campaignName}}?',
    rejectHeader: 'Reject Campaign?',
    rejectBody: 'Are you sure you want to reject the Campaign: {{campaignName}}?',
    resumeHeader: 'Resume Campaign?',
    resumeBody: 'Are you sure you want to resume the Campaign: {{campaignName}}?',
    pauseHeader: 'Pause Campaign?',
    pauseBody: 'Are you sure you want to pause the Campaign: {{campaignName}}?',
    resumeCampaign: 'Resume Campaign',
    pauseCampaign: 'Pause Campaign',
    resumingCampaign: 'Resuming Campaign',
    pausingCampaign: 'Pausing Campaign',
    suspendHeader: 'Suspend Campaign?',
    suspendBody: 'Are you sure you want to suspend the Campaign: {{campaignName}}?',
    suspendingCampaign: 'Suspending Campaign',
    campaignSuspended: 'The Campaign was successfully suspended',
    campaignPaused: 'The Campaign was successfully paused',
    loadingCampaign: 'Loading Campaign',
    editCampaign: 'Edit Campaign',
    duplicateCampaign: 'Duplicate Campaign',
    duplicateHeader: 'Duplicate Campaign?',
    duplicateBody: 'Are you sure you want to duplicate the Campaign: {{campaignName}}?',
    campaignDuplicated: 'The Campaign was successfully duplicated',
    duplicatingCampaign: 'Duplicating Campaign',
    approvingCampaign: 'Approving Campaign',
    rejectingCampaign: 'Rejecting Campaign',
    campaignApproved: 'The Campaign was successfully Approved',
    campaignRejected: 'The Campaign was successfully Rejected',
    campaignResumed: 'The Campaign was successfully Resumed',
  },
  CLIENT_DETAILS: {
    clientDetails: 'Client details',
    accounts: 'Accounts',
    loadingClient: 'Loading Client',
  },
}

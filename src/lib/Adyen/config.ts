export const adyen_configuration = {
  // When you're ready to accept live payments, change the value to one of our live environments.
  environment: 'test',
  clientKey: 'test_6FZIJFSBNVHKRBZJIMOI5PHIMANUOPTU',
  // For iOS, this is the URL to your app. For Android, this is automatically overridden by AdyenCheckout.
  returnUrl: 'your-app://',
  // Must be included to show the amount on the Pay button.
  countryCode: 'CH',
  amount: {currency: 'CHF', value: 1000},
};

export const paymentMethods = {
  paymentMethods: [
    // {
    //   brands: ['mc', 'visa', 'amex', 'cup', 'diners', 'discover', 'maestro'],
    //   name: 'Kreditkarte',
    //   type: 'scheme',
    // },
    {
      brands: ['mc', 'visa', 'amex', 'cup', 'diners', 'discover', 'maestro'],
      name: 'Credit Card',
      type: 'scheme',
    },
  ],
};

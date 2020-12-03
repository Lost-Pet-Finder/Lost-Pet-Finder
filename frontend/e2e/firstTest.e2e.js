const login_test = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_one = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('eece');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruon982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_two = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_three = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('eece');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruon982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_lost = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
  await element(by.id('SignInLoserButton_detox')).tap();
};

const browse_test = async () => {
  await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
  await element(by.id('BrowseButton_detox')).tap();
  await waitFor(element(by.id('BrowseView_detox'))).toBeVisible().withTimeout(4000);
  await expect(element(by.id('BrowseView_detox'))).toBeVisible() && expect(element(by.id('ScrollViewCell_detox'))).toBeVisible();
}

const contact_test = async () => {
  await waitFor(element(by.id('HomeContactButton_detox'))).toBeVisible().withTimeout(4000);
  await element(by.id('HomeContactButton_detox')).tap();
  await waitFor(element(by.id('Pending_detox'))).toBeVisible().withTimeout(4000);
  await expect(element(by.id('Pending_detox'))).toBeVisible() && expect(element(by.id('Sent_detox'))).toBeVisible();
  await element(by.id('Pending_detox')).tap();
  await waitFor(element(by.id('PendingView_detox'))).toBeVisible().withTimeout(4000);
  await expect(element(by.id('PendingView_detox'))).toBeVisible();
}

describe('Testing application', () => {
  it('first login screen and corresponding elements are visible', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('LoginScreen_detox'))).toBeVisible() && expect(element(by.id('SignInFinderButton_detox'))).toBeVisible() && expect(element(by.id('SignInLoserButton_detox'))).toBeVisible() && expect(element(by.id('EmailInput_detox'))).toBeVisible() && expect(element(by.id('PasswordInput_detox'))).toBeVisible() && expect(element(by.id('AppLogo_detox'))).toBeVisible();
  });

  // Tap login:found button
  it('signing in as finder takes us to home page', async () => {
    await element(by.id('SignInFinderButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible() && expect(element(by.text('Login Information cannot be empty, please try again'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  // Tap login:lost button
  it('signing in as loser takes us to home page', async () => {
    await device.reloadReactNative();
    await element(by.id('SignInLoserButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible() && expect(element(by.text('Login Information cannot be empty, please try again'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  //Test login functionality
  it('Should not login as finder with incorrect email address and password', async () => {
    await device.reloadReactNative();
    await login_test_one();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
    await waitFor(element(by.text('Invalid email, please check if your account is correct'))).toBeVisible().withTimeout(4000);
    await element(by.text('OK')).tap();
  });

  it('Should not login as finder with incorrect password', async () => {
    await device.reloadReactNative();
    await login_test_two();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
    await waitFor(element(by.text('Wrong password, please check if your password is correct'))).toBeVisible().withTimeout(4000);
    await element(by.text('OK')).tap();
  });

  it('Should not login as finder with incorrect email', async () => {
    await device.reloadReactNative();
    await login_test_three();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
    await waitFor(element(by.text('Invalid email, please check if your account is correct'))).toBeVisible().withTimeout(4000);
    await element(by.text('OK')).tap();
  });

  it('Should login with correct email address and password as lost', async () => {
    await device.reloadReactNative();
    await login_test_lost();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('ReportButton_detox'))).toBeVisible();
  });

  // Test login use case
  it('Should login as finder with correct email address and password and show required elements in home page', async () => {
    await device.reloadReactNative();
    await login_test();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('ReportButton_detox'))).toBeVisible() && expect(element(by.id('BrowseButton_detox'))).toBeVisible() && expect(element(by.id('HomeContactButton_detox'))).toBeVisible();
  });

});

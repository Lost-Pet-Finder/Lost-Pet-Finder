const login_test = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_one = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('eece@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
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
  await element(by.id('EmailInput_detox')).typeText('rdjo@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Ldswcnu');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const report_test = async () => {
  await element(by.id('ReportButton_detox')).tap();
  await element(by.id('DateInput_detox')).tap();
  await element(by.id('DateInput_detox')).typeText('2020-08-18 01-23');
  await element(by.id('Reportsubmit_detox')).tap();
}

const report_test_one = async () => {
  await element(by.id('ReportButton_detox')).tap();
  await element(by.id('DateInput_detox')).tap();
  await element(by.id('DateInput_detox')).typeText('2020-08');
  await element(by.id('Reportsubmit_detox')).tap();
}

const browse_test = async () => {
  await element(by.id('BrowseButton_detox')).tap();
}

describe('Testing application', () => {
  it('first login screen and corresponding elements are visible', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('LoginScreen_detox'))).toBeVisible() 
        && expect(element(by.id('SignInFinderButton_detox'))).toBeVisible()
        && expect(element(by.id('SignInLoserButton_detox'))).toBeVisible();
  });

  // Tap login:found button
  it('signing in as finder takes us to home page', async () => {
    await element(by.id('SignInFinderButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeVisible();
  });

  // Tap login:lost button
  it('signing in as loser takes us to home page', async () => {
    await element(by.id('SignInLoserButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeVisible();
  });

  // Test login functionality
  it('Should not login as finder with incorrect email address', async () => {
    await device.reloadReactNative();
    await login_test_one();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
  });

  it('Should not login as finder with incorrect password', async () => {
    await device.reloadReactNative();
    await login_test_two();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
  });

  it('Should not login as finder with incorrect email and password', async () => {
    await device.reloadReactNative();
    await login_test_three();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible();
  });

  it('Should login as finder with correct email address and password', async () => {
    await device.reloadReactNative();
    await login_test();
    await expect(element(by.id('HomePage_detox'))).toBeVisible();
  });

  // Test report page functionality
  it('Should alert user to upload photos', async () => {
    await device.reloadReactNative();
    await login_test();
    await report_test();
    await expect(element(by.text('Upload Picture First!'))).toBeVisible();
  });

  it('Should alert user to enter correct date information', async () => {
    await device.reloadReactNative();
    await login_test();
    await report_test_one();
    await expect(element(by.text('Incomplete Submission!'))).toBeVisible();
  });


  // Test browse page functionality
  it('Should see pet posts', async () => {
    await device.reloadReactNative();
    await login_test();
    await browse_test();
    await expect(element(by.id('BrowseView_detox'))).toBeVisible();
  });

});

const login_test = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
  await element(by.id('SignInFinderButton_detox')).tap();
};

const login_test_lost = async () => {
  await element(by.id('EmailInput_detox')).tap();
  await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
  await element(by.id('PasswordInput_detox')).tap();
  await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
  await element(by.id('SignInLoserButton_detox')).tap();
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

const report_test = async () => {
  await element(by.id('DateInput_detox')).tap();
  await element(by.id('DateInput_detox')).typeText('2020-08-18 01-23\n');
  await waitFor(element(by.id('Reportsubmit_detox'))).toBeVisible().withTimeout(4000);
  await element(by.id('Reportsubmit_detox')).tap();
}

const report_test_one = async () => {
  await element(by.id('DateInput_detox')).tap();
  await element(by.id('DateInput_detox')).typeText('2020-08\n');
  await waitFor(element(by.id('Reportsubmit_detox'))).toBeVisible().withTimeout(4000);
  await element(by.id('Reportsubmit_detox')).tap();
}

const browse_test = async () => {
  await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
  await element(by.id('BrowseButton_detox')).tap();
}

describe('Testing application', () => {
  it('first login screen and corresponding elements are visible', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('LoginScreen_detox'))).toBeVisible() 
        && expect(element(by.id('SignInFinderButton_detox'))).toBeVisible()
        && expect(element(by.id('SignInLoserButton_detox'))).toBeVisible()
        && expect(element(by.id('EmailInput_detox'))).toBeVisible()
        && expect(element(by.id('PasswordInput_detox'))).toBeVisible()
        && expect(element(by.id('AppLogo_detox'))).toBeVisible();
  });

  // Tap login:found button
  it('signing in as finder takes us to home page', async () => {
    await element(by.id('SignInFinderButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible()
       && expect(element(by.text('Login Information cannot be empty, plese try again'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  // Tap login:lost button
  it('signing in as loser takes us to home page', async () => {
    await device.reloadReactNative();
    await element(by.id('SignInLoserButton_detox')).tap();
    await expect(element(by.id('HomePage_detox'))).toBeNotVisible()
       && expect(element(by.text('Login Information cannot be empty, plese try again'))).toBeVisible();
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

  it('Should login as finder with correct email address and password', async () => {
    await device.reloadReactNative();
    await login_test();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('ReportButton_detox'))).toBeVisible();
  });

  it('Should login with correct email address and password', async () => {
    await device.reloadReactNative();
    await login_test_lost();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('ReportButton_detox'))).toBeVisible();
  });

  // Test report page functionality
  it('Should alert user to upload photos', async () => {
    await device.reloadReactNative();
    await login_test();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await element(by.id('ReportButton_detox')).tap();
    await waitFor(element(by.id('Map_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('Map_detox'))).toBeVisible()
          && expect(element(by.id('DateInput_detox'))).toBeVisible()
          && expect(element(by.id('UploadButton_detox'))).toBeVisible()
          && expect(element(by.id('ReportsubmitButton_detox'))).toBeVisible();
    await report_test();
    await waitFor(element(by.text('Upload Picture First!'))).toBeVisible().withTimeout(4000);
    await expect(element(by.text('Upload Picture First!'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('Should alert user to enter correct date information', async () => {
    await device.reloadReactNative();
    await login_test();
    await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
    await element(by.id('ReportButton_detox')).tap();
    await waitFor(element(by.id('Map_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('Map_detox'))).toBeVisible()
          && expect(element(by.id('DateInput_detox'))).toBeVisible()
          && expect(element(by.id('UploadButton_detox'))).toBeVisible()
          && expect(element(by.id('ReportsubmitButton_detox'))).toBeVisible();
    await report_test_one();
    await waitFor(element(by.text('Upload Picture First!'))).toBeVisible().withTimeout(4000);
    await expect(element(by.text('Upload Picture First!'))).toBeVisible();
    await element(by.text('OK')).tap();
  });


  // Test browse page functionality
  it('Should see pet posts', async () => {
    await device.reloadReactNative();
    await login_test();
    await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
    await browse_test();
    await waitFor(element(by.id('BrowseView_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('BrowseView_detox'))).toBeVisible();
  });

  // it('Should go to camera roll after clicking upload button', async () => {
  //   await device.reloadReactNative();
  //   await login_test();
  //   await waitFor(element(by.id('ReportButton_detox'))).toBeVisible().withTimeout(4000);
  //   await element(by.id('ReportButton_detox')).tap();
  //   await waitFor(element(by.id('Map_detox'))).toBeVisible().withTimeout(4000);
  //   await expect(element(by.id('Map_detox'))).toBeVisible()
  //         && expect(element(by.id('DateInput_detox'))).toBeVisible()
  //         && expect(element(by.id('UploadButton_detox'))).toBeVisible()
  //         && expect(element(by.id('ReportsubmitButton_detox'))).toBeVisible();
  //   await element(by.id('UploadButton_detox')).tap();
  //   await waitFor(element(by.text('Select a Photo'))).toBeVisible().withTimeout(4000);
  //   await element(by.text('Photo Gallery')).tap();
  //   await expect(element(by.text('Camera'))).toBeVisible().withTimeout(6000);
  //   await element(by.text('Camera')).tap();
  // });

});

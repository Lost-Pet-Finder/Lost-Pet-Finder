describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have LOGIN screen visible', async () => {
    await expect(element(by.id("LoginScreen_detox"))).toBeVisible();
  });

  it('should have Sign in: Found button in LOGIN screen', async () => {
    await expect(element(by.id("SignInFinderButton_detox"))).toBeVisible();
  });

  it('should have Sign in: Lost button in LOGIN screen', async () => {
    await expect(element(by.id("SignInLoserButton_detox"))).toBeVisible();
  });

  it('should go to home page after the tap Sign in:Found button', async () => {
    await element(by.id("SignInFinderButton_detox")).tap();
    await expect(element(by.id("HomePage_detox"))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});

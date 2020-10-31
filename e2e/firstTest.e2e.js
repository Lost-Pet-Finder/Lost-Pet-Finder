describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have first screen with two sign in buttons', async () => {
    await device.relaunchApp();
    await expect(element(by.id("finder_button"))).toBeVisible();
  });

  it('should go to home page after the tap', async () => {
    await device.relaunchApp();
    await element(by.id("finder_button")).tap();
    await expect(element(by.id("home_page_screen"))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});

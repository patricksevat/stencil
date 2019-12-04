import { setupDomTests, waitForChanges } from '../util';

describe('dom-reattach-clone', function() {
  const { setupDom, tearDownDom } = setupDomTests(document);
  let app: HTMLElement;

  beforeEach(async () => {
    app = await setupDom('/dom-reattach-clone/index.html');
    await waitForChanges();
  });
  afterEach(tearDownDom);

  const runTest = async (id: string) => {
    const component = app.querySelector(`#${id}`);
    const button = app.querySelector(`#toggle-${id}`) as HTMLButtonElement;
    button.click();
    await waitForChanges();
    button.click();
    await waitForChanges();
    return component;
  };

  it('should not double render', async () => {
    const component = await runTest('simple');
    expect(component.querySelectorAll('.component-mark-up').length).toBe(1);
    expect(component.querySelectorAll('.slotted-content').length).toBe(1);
  });

  it('should not double render with deeper slots', async () => {
    const component = await runTest('deep');
    expect(component.querySelectorAll('.component-mark-up').length).toBe(1);
    expect(component.querySelectorAll('.slotted-content').length).toBe(1);
  });

  it('should not double render with multiple slots', async () => {
    const component = await runTest('multiple');
    expect(component.querySelectorAll('.component-mark-up').length).toBe(1);
    expect(component.querySelectorAll('.slotted-content').length).toBe(1);
  });

  it('should not double render with Host element', async () => {
    const component = await runTest('host');
    expect(component.querySelectorAll('.component-mark-up').length).toBe(1);
    expect(component.querySelectorAll('.slotted-content').length).toBe(1);
  });

  it('should not double render with Nested components', async () => {
    const component = await runTest('host');
    expect(component.querySelectorAll('.component-mark-up').length).toBe(2);
    expect(component.querySelectorAll('.slotted-content').length).toBe(1);
    expect(component.querySelectorAll('.nested-slotted-content').length).toBe(1);
  });
});

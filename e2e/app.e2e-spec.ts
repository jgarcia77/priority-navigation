import { PriorityNavigationPage } from './app.po';

describe('priority-navigation App', () => {
  let page: PriorityNavigationPage;

  beforeEach(() => {
    page = new PriorityNavigationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

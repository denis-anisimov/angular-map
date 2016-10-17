import { AngJsPage } from './app.po';

describe('ang-js App', function() {
  let page: AngJsPage;

  beforeEach(() => {
    page = new AngJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

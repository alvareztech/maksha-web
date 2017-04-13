import { MakshaPage } from './app.po';

describe('maksha App', () => {
  let page: MakshaPage;

  beforeEach(() => {
    page = new MakshaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

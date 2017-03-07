import { TrapezeGuiDummyPage } from './app.po';

describe('trapeze-gui-dummy App', function() {
  let page: TrapezeGuiDummyPage;

  beforeEach(() => {
    page = new TrapezeGuiDummyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

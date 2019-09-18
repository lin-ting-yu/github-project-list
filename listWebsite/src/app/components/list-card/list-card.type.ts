class Contributors {
  name: string;
  url: string;
  constructor(init: ListCard) {
    Object.assign(this, init);
  }
}
class ListCard {
  user: string;
  title: string;
  text: string;
  star: number;
  url: string;
  contributors: Array<Contributors>;
  created: string;
  updated: string;
  constructor(init: ListCard) {
    Object.assign(this, init);
  }
}
export { ListCard, Contributors };

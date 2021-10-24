import Experience from "./Experience";

const lerp = (a: any, b: any, t: any) => {
  return (1 - t) * a + t * b;
};

export default class Scroll {
  experience: Experience;
  DOM: any;
  docScroll: any;
  scrollToRender: any;
  current: any;
  ease: any;
  speed: any;
  speedTarget: any;
  scrollContainer: any;
  app: any;

  constructor() {
    this.experience = new Experience();
    // this.scrollContainer = container;
    this.scrollContainer = document.querySelector(".scroll");
    this.docScroll = 0;
    this.scrollToRender = 0;
    this.current = 0;
    this.ease = 0.2;
    this.speed = 0;
    this.speedTarget = 0;

    this.initEvents();
  }
  setSize() {
    // set the heigh of the body in order to keep the scrollbar on the page
    document.body.style.height = `${this.scrollContainer.scrollHeight}px`;
  }

  getScroll() {
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
    return this.docScroll;
  }

  setPosition() {
    // translates the scrollable element
    if (
      Math.round(this.scrollToRender) !== Math.round(this.current) ||
      this.scrollToRender < 10
    ) {
      this.scrollContainer.style.transform = `translate3d(0,${
        -1 * this.scrollToRender
      }px,0)`;
    }
  }

  initEvents() {
    window.addEventListener("scroll", this.getScroll.bind(this));
  }

  update() {
    this.speed =
      Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
    this.speedTarget += (this.speed - this.speedTarget) * 0.2;

    this.current = this.getScroll();
    this.scrollToRender = lerp(this.scrollToRender, this.current, this.ease);

    // and translate the scrollable element
    this.setPosition();
  }
}

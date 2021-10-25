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
  scrollToRenderHistory: any;
  auto: any;

  constructor() {
    this.experience = new Experience();
    this.scrollContainer = document.querySelector(".scroll");
    this.scrollToRender = 0;
    this.current = 0;
    this.ease = 0.2;
    this.speed = 0;
    this.speedTarget = 0;
    this.scrollToRenderHistory = 0;

    this.experience.on("changeLoaction", (view: any) => {
      if (view === "/") {
        window.scrollTo(0, this.scrollToRenderHistory);
      } else {
        this.scrollToRenderHistory = this.scrollToRender;
        window.scrollTo(0, 0);
      }
    });
  }

  setSize() {
    document.body.style.height = `${this.scrollContainer.scrollHeight}px`;
  }

  getScroll() {
    return window.pageYOffset;
  }

  setPosition() {
    if (Math.round(this.scrollToRender) !== Math.round(this.current)) {
      this.scrollContainer.style.transform = `translate3d(0,${
        -1 * this.scrollToRender
      }px,0)`;
    }
  }

  updateSpeed() {
    this.speed =
      Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
    this.speedTarget += (this.speed - this.speedTarget) * 0.2;
  }

  update() {
    this.updateSpeed();

    this.current = this.getScroll();
    this.scrollToRender = lerp(this.scrollToRender, this.current, this.ease);

    // and translate the scrollable element
    this.setPosition();

    if (document.body.style.height !== this.scrollContainer.scrollHeight) {
      this.setSize();
    }
  }
}

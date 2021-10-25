import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import World from "./World";
import Scroll from "./Scroll";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PostProcessing from "./PostProcessing";

export default class Experience extends EventEmitter {
  static instance: Experience;

  time: number;
  container: HTMLElement;
  scene: THREE.Scene;
  width: number;
  height: number;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  world: World;
  controls: OrbitControls;
  scroll: Scroll;
  postProcessing: PostProcessing;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;
  currentView: String;

  constructor() {
    super();
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.time = 0;

    this.currentView = window.location.pathname;

    this.setLoactionObserver();
  }

  setLoactionObserver() {
    let lastUrl = window.location.href;
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        this.emit("changeLoaction", window.location.pathname);
      }
    }).observe(document, { subtree: true, childList: true });
  }

  initExperience(_options: any = {}) {
    this.container = _options.dom;
    this.scene = new THREE.Scene();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.set(0, 0, 600);

    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({
      // antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0x999999);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.render();
    this.update();
    this.setupResize();
    this.world = new World();
    // this.initScroll();
    this.resize();
    this.setMouse();
    // this.setPostProcessing();
  }

  initScroll() {
    this.scroll = new Scroll();
  }

  setPostProcessing() {
    this.postProcessing = new PostProcessing();
  }

  setMouse() {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
    });
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);
    this.camera.updateProjectionMatrix();

    if (this.scroll) {
      this.scroll.setSize();
    }
    if (this.world) {
      this.world.resize();
    }
  }

  render() {
    if (this.postProcessing) {
      this.postProcessing.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  update() {
    // if (
    //   this.scroll &&
    //   Math.round(this.scroll.scrollToRender) !== Math.round(this.scroll.current)
    // ) {
    // }
    this.time += 0.05;
    this.render();
    if (this.world) {
      this.world.update();
    }
    if (this.scroll) {
      this.scroll.update();
    }

    window.requestAnimationFrame(this.update.bind(this));
  }
}

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import imagesLoaded from "imagesloaded";

export default class Sketch {
  time: number;
  container: HTMLElement;
  scene: THREE.Scene;
  width: number;
  height: number;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  //   images: HTMLImageElement[] || null;
  images: any;
  imageStore: any;
  constructor(_options: any) {
    this.time = 0;
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
    this.container.appendChild(this.renderer.domElement);

    this.images = null;
    setTimeout(() => {
      this.images = [...document.querySelectorAll("img")];
      const preloadImages = new Promise((resolve, reject) => {
        imagesLoaded(
          document.querySelectorAll("img"),
          { background: true },
          resolve
        );
      });
      preloadImages.then(() => {
        // this.addObjects();
        this.render();
      });
    }, 3000);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  addObjects() {
    console.log(this.images);
    this.imageStore = this.images.map((img: any) => {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      return {
        texture,
      };
    });

    const geometry = new THREE.PlaneGeometry(600, 900, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: this.imageStore[0].texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

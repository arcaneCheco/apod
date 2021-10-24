import Experience from "./Experience";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import gsap from "gsap";

export default class ImagesHandler {
  experience: Experience;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  materials: any[];
  imageStore: any[];
  currentScroll: any;
  loader: any;
  imageGroup: THREE.Group;
  constructor() {
    this.experience = new Experience();

    this.setGeometry();
    this.setMaterial();
    this.imageStore = [];
    this.imageGroup = new THREE.Group();
    this.currentScroll = 0;
    this.loader = new THREE.TextureLoader();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
  }
  setMaterial() {
    this.materials = [];
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uImage: { value: 0 },
        uHover: { value: new THREE.Vector2(0.5, 0.5) },
        uHoverState: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      //   wireframe: true,
    });
  }

  async loadImage(url: any, elem: any) {
    return new Promise((resolve, reject) => {
      elem.onload = () => resolve(elem);
      elem.onerror = reject;
      elem.src = url;
    });
  }

  async addImage(img: any) {
    const bounds = img.getBoundingClientRect();

    img.addEventListener("click", () => {
      console.log(img.src, "clicked");
    });

    const texture = await this.loader.load(img.src);

    const material = this.material.clone();
    this.materials.push(material);
    material.uniforms.uImage.value = texture;
    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.scale.set(bounds.width, bounds.height, 1);

    // this.imageGroup.add(mesh);

    this.experience.scene.add(mesh);

    if (this.experience.scroll) {
      this.experience.scroll.setSize();
    }
    this.imageStore.push({
      img: img,
      mesh: mesh,
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    });
  }

  setPosition() {
    this.imageStore.forEach((o) => {
      //   this.rescaleImages(o);
      o.mesh.position.x = o.left - this.experience.width / 2 + o.width / 2;
      o.mesh.position.y = -o.top + this.experience.height / 2 - o.height / 2;
      o.mesh.position.y += this.currentScroll;
    });
  }

  rescaleImages(o: any) {
    const bounds = o.img.getBoundingClientRect();
    if (bounds.width !== o.width) {
      o.top = bounds.top + this.currentScroll;
      o.left = bounds.left;
      o.width = bounds.width;
      o.height = bounds.height;
      o.mesh.scale.set(bounds.width, bounds.height, 1);
    }
  }

  resize() {
    // do the rescalng here
    this.imageStore.forEach((o) => {
      this.rescaleImages(o);
    });
  }

  update() {
    this.materials.forEach((m) => {
      m.uniforms.uTime.value = this.experience.time;
    });
    if (this.experience.scroll) {
      this.currentScroll = this.experience.scroll.scrollToRender;
    }
    this.setPosition();

    // const intersects = this.experience.raycaster.intersectObjects(
    //   this.experience.scene.children
    // );
    // if (intersects.length) {
    //   const target = intersects[0].object;
    //   console.log(target);
    //   //   gsap.to(target.scale, {
    //   //     duration: 1,
    //   //     x: this.experience.width / 2,
    //   //     y: this.experience.height / 1.1,
    //   //   });
    // }
  }
}

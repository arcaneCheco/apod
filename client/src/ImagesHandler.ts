import Experience from "./Experience";
import * as THREE from "three";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import gsap from "gsap";
import { throwServerError } from "@apollo/client";

export default class ImagesHandler {
  experience: Experience;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  materials: any[];
  imageStore: any[];
  currentScroll: any;
  loader: any;
  imageGroup: THREE.Group;
  current: any;
  currentView: any;
  transitionFunction: any;
  currentMesh: THREE.Mesh;
  detailImage: any;

  constructor() {
    this.experience = new Experience();

    this.setGeometry();
    this.setMaterial();
    this.imageStore = [];
    this.imageGroup = new THREE.Group();
    this.experience.scene.add(this.imageGroup);
    this.currentScroll = 0;
    this.loader = new THREE.TextureLoader();
    this.currentView = "main";
    this.hideImagesOnChange();
    this.transitionFunction = this.doTransition;
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

    const texture = await this.loader.load(img.src);

    const material = this.material.clone();
    this.materials.push(material);
    material.uniforms.uImage.value = texture;
    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.scale.set(bounds.width, bounds.height, 1);

    img.addEventListener("click", () => {
      this.current = mesh;
    });

    this.imageGroup.add(mesh);

    // this.experience.scene.add(mesh);

    // if (this.experience.scroll) {
    //   this.experience.scroll.setSize();
    // }
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

  doTransition(img: any) {
    this.currentMesh = this.current.clone();
    this.experience.scene.add(this.currentMesh);
    this.experience.scroll.setSize();
    this.currentScroll = 0;
    const bounds = img.getBoundingClientRect();
    this.detailImage = {
      img: img,
      mesh: this.currentMesh,
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    };
    gsap.to(this.currentMesh.scale, {
      x: bounds.width,
      y: bounds.height,
      duration: 2,
    });
    const x = bounds.left - this.experience.width / 2 + bounds.width / 2;
    const y =
      this.currentScroll -
      bounds.top +
      this.experience.height / 2 -
      bounds.height / 2;
    gsap.to(this.currentMesh.position, { x, y, duration: 2 });
    // let currentObj: any = {};
    // this.imageStore.forEach((o) => {
    //   if (o.mesh.name === "current") {
    //     currentObj = { ...o, mesh: o.mesh.clone(), img };
    //   }
    // });
    // const currentObj = this.imageStore.find((o) => o.mesh.name === "current");
  }

  resize() {
    // do the rescalng here
    // if (this.currentView === "main") {
    this.imageStore.forEach((o) => {
      this.rescaleImages(o);
    });
    // }
  }

  hideImagesOnChange() {
    this.experience.on("changeLoaction", (view: any) => {
      if (view !== "/") {
        this.experience.scene.remove(this.imageGroup);
      } else {
        this.experience.scene.remove(this.currentMesh);
        this.experience.scene.add(this.imageGroup);
        this.experience.scroll.setSize();
      }
    });
  }

  update() {
    this.materials.forEach((m) => {
      m.uniforms.uTime.value = this.experience.time;
    });
    if (this.experience.scroll) {
      this.currentScroll = this.experience.scroll.scrollToRender;
    }
    if (this.detailImage) {
      this.detailImage.mesh.position.x =
        this.detailImage.left -
        this.experience.width / 2 +
        this.detailImage.width / 2;
      this.detailImage.mesh.position.y =
        -this.detailImage.top +
        this.experience.height / 2 -
        this.detailImage.height / 2;
      this.detailImage.mesh.position.y += this.currentScroll;
    }
    this.setPosition();

    // const intersects = this.experience.raycaster.intersectObjects(
    //   this.imageGroup.children
    // );
    // if (intersects.length) {
    //   this.current = intersects[0].object;
    // } else {
    //   this.current = null;
    // }

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

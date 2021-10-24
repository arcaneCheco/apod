import Experience from "./Experience";
import * as THREE from "three";
import ImagesHandler from "./ImagesHandler";

export default class World {
  experience: Experience;
  imagesHandler: ImagesHandler;

  constructor() {
    this.experience = new Experience();
    this.setImagesHandler();
  }

  setImagesHandler() {
    this.imagesHandler = new ImagesHandler();
  }

  resize() {
    // do the rescalng here
    if (this.imagesHandler) {
      this.imagesHandler.resize();
    }
  }

  update() {
    if (this.imagesHandler) {
      this.imagesHandler.update();
    }
  }
}

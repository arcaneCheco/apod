import Experience from "./Experience";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import vertexShader from "./shaders/colorShift/vertex";
import fragmentShader from "./shaders/colorShift/fragment";

export default class PostProcessing {
  experience: any;
  composer: any;
  renderPass: any;
  colorShiftEffect: any;
  colorShiftPass: any;

  constructor() {
    this.experience = new Experience();

    this.setComposer();
    this.setColorShiftPass();
  }

  setComposer() {
    this.composer = new EffectComposer(this.experience.renderer);
    this.renderPass = new RenderPass(
      this.experience.scene,
      this.experience.camera
    );
    this.composer.addPass(this.renderPass);
  }

  setColorShiftPass() {
    this.colorShiftEffect = {
      uniforms: {
        tDiffuse: { value: null },
        uScrollSpeed: { value: null },
        uTime: { value: null },
      },
      vertexShader,
      fragmentShader,
    };
    this.colorShiftPass = new ShaderPass(this.colorShiftEffect);
    this.colorShiftPass.renderToScreen = true;
    this.composer.addPass(this.colorShiftPass);
  }
}

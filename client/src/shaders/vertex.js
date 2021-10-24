const shader = `
    uniform float uTime;

    varying vec2 vUv;

    #define PI 3.14159265358979323846

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.);

      float dist = distance(uv, vec2(0.5, 0.5));
      modelPosition.z += 10. * sin(dist * 10. + uTime);

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
      vUv = uv;
    }
`;

export default shader;

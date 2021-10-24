const shader = `
    uniform sampler2D uImage;
    uniform float uTime;
    
    varying vec2 vUv;
    
    void main() {
        vec4 image = texture2D(uImage, vUv);
        gl_FragColor = vec4(vUv, 0., 1.);
        gl_FragColor = image;
    }
`;

export default shader;

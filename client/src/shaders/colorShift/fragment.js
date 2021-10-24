const shader = `
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {
        vec2 nUv = vUv;
        float area = smoothstep(1., .8, vUv.y) * 2. - 1.;
        nUv.y = vUv.y * area;
        gl_FragColor = texture2D(tDiffuse, nUv);
        gl_FragColor.r += texture2D(tDiffuse, nUv + vec2(0., 0.05)).r;
        gl_FragColor.g += texture2D(tDiffuse, nUv + vec2(0., 0.1)).g;
        gl_FragColor.b += texture2D(tDiffuse, nUv + vec2(0., 0.2)).b;
        // gl_FragColor = mix(vec4(1.), gl_FragColor, area);
    }
`;

export default shader;

import {mat4} from 'gl-matrix';
import {createProgram} from './utils/shaderProgram';

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    attribute vec2 textureCoord;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    varying highp vec2 vTextureCoord;

    void main(void)
    {
        vTextureCoord = textureCoord;
        gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
    }
`;

const fragmentShaderSource = `
    uniform sampler2D aSampler;

    varying highp vec2 vTextureCoord;

    void main(void)
    {
        gl_FragColor = texture2D(aSampler, vTextureCoord);
    }
`;

export function drawTexture(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number): void {
    const {program, locations} = createProgram({
        gl,
        vertexShaderSource,
        fragmentShaderSource,
        attributeKeys: ['vertexPosition', 'textureCoord'],
        uniformKeys: ['projectionMatrix', 'modelViewMatrix', 'aSampler']
    });
    const buffers = createBuffers(gl);
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = document.createElement('img');
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
}

function createBuffers(gl: WebGLRenderingContext): {
    position: WebGLBuffer;
    textureCoord: WebGLBuffer;
    index: WebGLBuffer;
} {
    const buffers = {
        position: gl.createBuffer(),
        textureCoord: gl.createBuffer(),
        index: gl.createBuffer()
    };
    const positions = [
        // front
        -1, 1, 1,
        -1, -1, 1,
        1, -1, 1,
        1, 1, 1,
        // back
        1, 1, -1,
        1, -1, -1,
        -1, -1, -1,
        -1, 1, -1,
        //top
        -1, 1, -1,
        -1, 1, 1,
        1, 1, 1,
        1, 1, -1,
        //bottom
        -1, -1, 1,
        -1, -1, -1,
        1, -1, -1,
        1, -1, 1,
        //left
        -1, 1, -1,
        -1, -1, -1,
        -1, -1, 1,
        -1, 1, 1,
        //right
        1, 1, 1,
        1, -1, 1,
        1, -1, -1,
        1, 1, -1,
    ];

    const textureCoord = new Array(48);
    let indexes: number[] = [];

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // get vertexes index of every triangle
    // 6 faces, 12 trangles(two triangle per face), 36 vertexes
    for (let i = 0; i < 6; i++) {
        const s = i * 4;
        indexes = indexes.concat([
            // first triangle
            s, s + 1, s + 2,
            // second triangle
            s, s + 2, s + 3
        ]);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);

    for (let i = 0; i < 6; i++) {
        const s = i * 256;
    }


    // cancel bind
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return buffers;
}
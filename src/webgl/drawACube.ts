import {mat4} from 'gl-matrix';
import { createShader, ShaderType, createProgram } from './utils/shaderProgram';

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    attribute vec4 vertexColor;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    varying lowp vec4 vColor;

    void main(void)
    {
        vColor = vertexColor;
        gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
    }
`;

const fragmentShaderSource = `
    varying lowp vec4 vColor;

    void main(void)
    {
        gl_FragColor = vColor;
    }
`;


export function drawACube(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number) {
    const programInfo = createProgram({
        gl,
        vertexShaderSource,
        fragmentShaderSource,
        attributeKeys: ['vertexPosition', 'vertexColor'],
        uniformKeys: ['projectionMatrix', 'modelViewMatrix'],
    });
    const {program, locations} = programInfo;
    const buffers = initBuffers(gl);
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();

    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvasWidth / canvasHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.uniform.projectionMatrix, false, projectionMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -10]);
    mat4.rotateX(modelViewMatrix, modelViewMatrix, 45);
    gl.uniformMatrix4fv(locations.uniform.modelViewMatrix, false, modelViewMatrix);

    // set vertexPosition
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(locations.attribute.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.attribute.vertexPosition);

    // set vertexColor
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(locations.attribute.vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.attribute.vertexColor);

    // draw triangles
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    function draw() {
        mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.02);
        gl.uniformMatrix4fv(locations.uniform.modelViewMatrix, false, modelViewMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}

function initBuffers(gl: WebGLRenderingContext): {
    position: WebGLBuffer;
    color: WebGLBuffer;
    index: WebGLBuffer;
} {
    const buffers = {
        position: gl.createBuffer(),
        color: gl.createBuffer(),
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

    const faceColors = [
        // front
        [1, 0, 0, 1],
        // back
        [0, 1, 0, 1],
        // top
        [0, 0, 1, 1],
        // bottom
        [1, 1, 0, 1],
        // left
        [1, 0, 1, 1],
        // right
        [0, 1, 1, 1]
    ];

    let indexes: number[] = [];
    let colors: number[] = [];

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

    // get colors of every vertex
    // 6 faces, 24 vertexes(4 vertexes per face)
    for (let i = 0; i < 6; i++) {
        colors = colors.concat(faceColors[i], faceColors[i], faceColors[i], faceColors[i]);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // cancel bind
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return buffers;
}
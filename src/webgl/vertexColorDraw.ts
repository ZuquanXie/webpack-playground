import {mat4} from 'gl-matrix';

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    attribute vec4 vertexColor;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    varying lowp vec4 vColor;

    void main(void)
    {
        gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
        vColor = vertexColor;
    }
`;

const fragmentShaderSource = `
    varying lowp vec4 vColor;

    void main(void)
    {
        gl_FragColor = vColor;
    }
`;

export default function vertexColorDraw(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    const vertexBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const locations = {
        vertexPosition: null,
        vertexColor: null,
        projectionMatrix: null,
        modelViewMatrix: null
    };
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();

    // init program
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    locations.vertexPosition = gl.getAttribLocation(program, 'vertexPosition');
    locations.vertexColor = gl.getAttribLocation(program, 'vertexColor');
    locations.projectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
    locations.modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');

    // set transform
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvasWidth / canvasHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.projectionMatrix, false, projectionMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -10]);
    gl.uniformMatrix4fv(locations.modelViewMatrix, false, modelViewMatrix);

    // clear
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set vertex position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 1, 0,
        -1, -1, 0,
        1, -1, 0
    ]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(locations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.vertexPosition);

    // set vertex color
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1
    ]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(locations.vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.vertexColor);

    function draw() {
        mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.02);
        gl.uniformMatrix4fv(locations.modelViewMatrix, false, modelViewMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
        window.requestAnimationFrame(draw);
    }
    draw();
}
import { mat4 } from "gl-matrix";

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    void main(void){

        gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
    }
`;

const fragmentShaderSource = `
    void main(void) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

export default function simpleDraw(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number): void {
    const positionBuffer = gl.createBuffer();
    const positions = new Float32Array([
        0, 2, 0,
        1, 1, 0,
        -1, 1, 0
    ]);
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    const locations = {
        vertexPosition: null,
        projectionMatrix: null,
        modelViewMatrix: null
    };
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();

    // init buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // create shader
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // init program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // get location
    locations.vertexPosition = gl.getAttribLocation(program, 'vertexPosition');
    locations.projectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
    locations.modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');

    // set matrix
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvasWidth / canvasHeight, 0.1, 100);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -10]);

    // set value
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(locations.vertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(locations.vertexPosition);
    gl.uniformMatrix4fv(locations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(locations.modelViewMatrix, false, modelViewMatrix);

    // render
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.flush();

    const positionBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 0,
        1, -1, 0,
        0, -2, 0
    ]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(locations.vertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(locations.vertexPosition);
    gl.uniformMatrix4fv(locations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(locations.modelViewMatrix, false, modelViewMatrix);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.flush();
}
import {mat4} from 'gl-matrix';
import {createProgram} from './utils/shaderProgram';

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    attribute vec3 vertexNormal;
    attribute vec2 textureCoord;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 normalMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void)
    {
        vTextureCoord = textureCoord;
        gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;

        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 lightVector = normalize(vec3(0.7, 0.8, 0.75));

        highp vec4 transformedNormal = normalMatrix * vec4(vertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, lightVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
    }
`;

const fragmentShaderSource = `
    uniform sampler2D aSampler;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void)
    {
        highp vec4 textureColor = texture2D(aSampler, vTextureCoord);
        gl_FragColor = vec4(textureColor.rgb * vLighting, textureColor.a);
    }
`;

export function lightingACube(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number): void {
    const {locations} = createProgram({
        gl,
        vertexShaderSource,
        fragmentShaderSource,
        attributeKeys: ['vertexPosition', 'vertexNormal', 'textureCoord'],
        uniformKeys: ['projectionMatrix', 'modelViewMatrix', 'normalMatrix', 'aSampler']
    });
    const texture = loadTexture(gl, '/yang.jpg');
    //const texture = loadTexture(gl, '/yangPowerOf2.jpg');
    const buffers = createBuffers(gl);
    const projectionMatrix = mat4.create();
    const modelViewMatrix = mat4.create();
    const normalMatrix = mat4.create();

    // set transform matrix
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvasWidth / canvasHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.uniform.projectionMatrix, false, projectionMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -10]);
    gl.uniformMatrix4fv(locations.uniform.modelViewMatrix, false, modelViewMatrix);

    // set normalMatrix
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix4fv(locations.uniform.normalMatrix, false, normalMatrix);

    // set vertexPosition
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(locations.attribute.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.attribute.vertexPosition);

    // set vertexNormal
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(locations.attribute.vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.attribute.vertexNormal);

    // set texture coordinate
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(locations.attribute.textureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locations.attribute.textureCoord);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // set texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(locations.uniform.aSampler, 0);

    // clear
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    function draw() {
        mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.01);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, 0.01);
        gl.uniformMatrix4fv(locations.uniform.modelViewMatrix, false, modelViewMatrix);
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix4fv(locations.uniform.normalMatrix, false, normalMatrix);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}

function loadTexture(gl: WebGLRenderingContext, src: string): WebGLTexture {
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([233, 233, 233, 255]));

    loadImage(src)
    .then((image) => {
        gl.bindTexture(gl.TEXTURE_2D, texture);

        if (image.currentSrc.match(/\.png/gi)) {
            // png
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        } else {
            // others
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        }

        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    });

    return texture;
}

function isPowerOf2(value: number): boolean {
    return (value & (value - 1)) === 0;
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
    normal: WebGLBuffer;
    textureCoord: WebGLBuffer;
    index: WebGLBuffer;
} {
    const buffers = {
        position: gl.createBuffer(),
        normal: gl.createBuffer(),
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

    let normals: number[] = []

    let indexes: number[] = [];
    let textureCoord: number[] = [];

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // 1 normal per vertex, 36 vertexes
    let normal: [number, number, number] = [0, 0, 0];
    for (let i = 0, j = 0, l = positions.length; i < l; i++, j++) {
        if (j < 3) {
            normal[j] = positions[i];
        } else {
            normal[j%3] = positions[i] === normal[j%3] ? positions[i] : 0;
        }
        if (j + 1 === 12) {
            // 4 vertexes per face
            normals = normals.concat(normal, normal, normal, normal);
            normal = [0, 0, 0];
            j = -1;
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

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

    // get coordinate of texture
    // 6 faces, 48 points(8 points per face)
    for (let i = 0; i < 6; i++) {
        const x1 = i / 6;
        const x2 = (i + 1) / 6;
        textureCoord = textureCoord.concat([
            x1, 0,
            x2, 0,
            x2, 1,
            x1, 1,
        ]);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);

    // cancel bind
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return buffers;
}
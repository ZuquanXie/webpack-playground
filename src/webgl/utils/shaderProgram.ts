export enum ShaderType {
    vertex, fragment
}

export function createShader(gl: WebGLRenderingContext, type: ShaderType, source: string): WebGLShader {
    let shader: WebGLShader;

    switch(type) {
        case ShaderType.vertex:
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;
        case ShaderType.fragment:
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;
        default:
            throw new Error('[createShader]: Wrong type');
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const msg = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`[createShader]: Compile failed. ${msg}`);
    }

    return shader;
}

export interface ShaderProgram {
    program: WebGLProgram;
    locations: {
        attribute?: {
            [key: string]: number;
        };
        uniform?: {
            [key: string]: WebGLUniformLocation;
        };
    }
}

export function createProgram({
    gl,
    vertexShaderSource,
    fragmentShaderSource,
    attributeKeys,
    uniformKeys
}: {
    gl: WebGLRenderingContext;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    attributeKeys?: string[];
    uniformKeys?: string[];
}): ShaderProgram {
    const vertexShader = createShader(gl, ShaderType.vertex, vertexShaderSource);
    const fragmentShader = createShader(gl, ShaderType.fragment, fragmentShaderSource);
    const program = gl.createProgram();
    const result: ShaderProgram = {
        program,
        locations: {}
    };

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const msg = gl.getProgramInfoLog(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteProgram(program);
        throw new Error(`[createProgram]: Link failed. ${msg}`);
    }

    if (attributeKeys && attributeKeys.length > 0) {
        result.locations.attribute = {};
        attributeKeys.forEach((value) => {
            result.locations.attribute[value] = gl.getAttribLocation(program, value);
        });
    }

    if (uniformKeys && uniformKeys.length > 0) {
        result.locations.uniform = {};
        uniformKeys.forEach((value) => {
            result.locations.uniform[value] = gl.getUniformLocation(program, value);
        });
    }

    return result;
}
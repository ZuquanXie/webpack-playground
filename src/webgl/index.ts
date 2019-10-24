import simplyDraw from './simplyDraw';
import vertexColorDraw from './vertexColorDraw';
import { drawACube } from './drawACube';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
window.addEventListener('load', () => {
    const rootEle = document.getElementById('root');
    const canvas = document.createElement('canvas');

    /* initialize html element */
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.setAttribute('style', 'background-color: #ffffff;');
    document.documentElement.setAttribute('style', 'background-color: #efefef;');
    rootEle.appendChild(canvas);

    /* draw */
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.warn('Your browser is not support webgl');
        return;
    }

    drawACube(gl, CANVAS_WIDTH, CANVAS_HEIGHT);
}, false);

import Hue from './hue-api/hue.js';
import createControls from './ui/controls.js';

const hue = new Hue();

const createControlPanel = lights => {
  for (let i in lights) {
    document.body.appendChild(createControls(hue, i, lights[i]));
  }
}

hue.getLights()
  .then(createControlPanel)
  .catch(e => console.log('Failed', e));
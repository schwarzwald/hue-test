const createControls = (hue, id, light) => {
  let container = document.createElement('div');
  container.classList.add('controls');

  let slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0;
  slider.max = 254;
  slider.addEventListener('change', e => hue.setLightState(id, { bri: +e.target.value }));

  let button = document.createElement('button');
  button.innerText = light.name;
  button.dataset.id = id;
  button.addEventListener('click', () => toggleButton(hue, button, slider));
  updateControls(button, slider, light.state);


  container.appendChild(button);
  container.appendChild(slider);

  return container;
}

const toggleButton = (hue, button, slider) => {
  hue.toggleLight(button.dataset.id)
    .then(state => updateControls(button, slider, state));
}

const updateControls = (button, slider, state) => {
  button.dataset.state = state.on;
  slider.disabled = !state.on;
  slider.value = state.bri ? state.bri : slider.value;

  if (state.on) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
}

export default createControls;
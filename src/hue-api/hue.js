const LIGHTS = 'lights';

export default class Hue {

  constructor(root = location.href) {
    this.root = root;
  }

  get(path) {
    return fetch(`${this.root}api/${path}`);
  }

  getLight(id) {
    return this.get(`${LIGHTS}/${id}`).then(r => r.json());
  }

  getLights() {
    return this.get(LIGHTS).then(r => r.json());
  }

  setLightState(id, state) {
    return fetch(`${this.root}api/${LIGHTS}/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify(state)
    }).then(d => d.json());
  }

  toggleLight(id) {
    return this.getLight(id).then(d =>
      this.setLightState(id, { on: !d.state.on })
    ).then(d => new Object({ on: d[0].success[`/lights/${id}/state/on`] }));
  }

  getLightIdByName(name) {
    return this.getLights()
      .then(d => {
        for (let i in d) {
          let light = d[i];
          if (light.name == name) {
            return i;
          }
        }

        throw "Not found";
      });
  }
}

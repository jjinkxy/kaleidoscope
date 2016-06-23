import {
  WebGLRenderer,
  SphereGeometry,
  Matrix4,
  MeshBasicMaterial,
  Mesh,
  PointLight,
  Object3D,
} from 'threejs360'

export default class Renderer {
  constructor(options) {
    Object.assign(this, options);
    this.renderer = new WebGLRenderer({antialias: false});
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.el = this.renderer.domElement;

    this.target = this.container ? this.container : document.querySelector(this.containerId);
    this.target.appendChild(this.el);
  }

  setTexture(texture) {
    this.texture = texture;
    this.mesh = this.createMesh();
  }

  setSize(size) {
    this.height = size.height;
    this.width = size.width;
    this.renderer.setSize(size.width, size.height);
  }

  createMesh() {
    let material = new MeshBasicMaterial({map: this.texture});
    let geometry = new SphereGeometry(1, 50, 50);
    geometry.scale(-1, 1, 1);
    let mesh = new Mesh(geometry, material);
    return mesh;
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
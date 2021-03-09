class Mapgrid {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.wallPoints = [];
    this.car = new Car();
    this.scene.add(this.car);

    let body = document.querySelector('body');
    if (body) {
      // drawings of wall
      body.addEventListener('mousedown', (e) => {
        this.addwall({ x: e.clientX, y: e.clientY });
        body.onmousemove = (e) => {
          this.addwall({ x: e.clientX, y: e.clientY });
        };
      });
      body.addEventListener('mouseup', (e) => {
        body.onmousemove = undefined;
      });
    }
  }

  addwall(coords) {
    let vector = new THREE.Vector3();
    var pos = new THREE.Vector3();
    vector.set(
      (coords.x / window.innerWidth) * 2 - 1,
      -(coords.y / window.innerHeight) * 2 + 1,
      0
    );
    vector.unproject(this.camera);
    vector.sub(this.camera.position).normalize();
    let distance = -this.camera.position.z / vector.z;
    pos.copy(this.camera.position).add(vector.multiplyScalar(distance));
    //all the above is to convert mouse coords to canvas space coords
    // the canvas space coords sare stored in pos

    const lineSegments = new THREE.LineSegments(geometry, material);

    this.wallPoints.push(new THREE.Vector3(pos.x, pos.y, 1));

    this.scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(this.wallPoints),
        new THREE.LineBasicMaterial({ color: 0x0000ff })
      )
    );
  }
  frameupdate() {
    this.car.frameupdate();
  }
}

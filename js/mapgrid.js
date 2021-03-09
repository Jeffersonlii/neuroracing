class Mapgrid {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    //add car
    this.car = new Car();
    scene.add(this.car);

    //grid each cube is 10000/2000 = 50 => 50x50
    let grid = new THREE.GridHelper(10000, 200, 0x98afc7, 0x98afc7);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);

    //hovering red box
    this.hoverOverMesh = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true,
      })
    );
    scene.add(this.hoverOverMesh);

    //black plane for mouse collisions
    this.collidingPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({ color: 'black' })
    );
    scene.add(this.collidingPlane);

    document.addEventListener('mousemove', (e) => {
      // show the red box on hover
      this.hoverOverGrid(e);
    });

    document.addEventListener('mousedown', (e) => {
      // add wall when mouse down
      this.addwall(e);
      document.onmousemove = (e) => {
        // continue adding wall if draggin
        this.addwall(e);
      };
    });
    document.addEventListener('mouseup', (e) => {
      document.onmousemove = undefined;
    });
  }

  hoverOverGrid(e) {
    e.preventDefault();
    const intersects = this.getCollisions(e);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      this.hoverOverMesh.position
        .copy(intersect.point)
        .add(intersect.face.normal);
      this.hoverOverMesh.position
        .divideScalar(50)
        .floor()
        .multiplyScalar(50)
        .addScalar(25);
    }
  }

  addwall(e) {
    e.preventDefault();
    const intersects = this.getCollisions(e);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      // delete cube

      let wallUnit = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 50),
        new THREE.MeshBasicMaterial({
          color: 'blue',
        })
      );
      wallUnit.position.copy(intersect.point).add(intersect.face.normal);
      wallUnit.position
        .divideScalar(50)
        .floor()
        .multiplyScalar(50)
        .addScalar(25);
      this.scene.add(wallUnit);
    }
  }
  getCollisions(e) {
    this.mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.mouse, this.camera);
    //list of inteersects between mouse and plane
    const intersects = this.raycaster.intersectObjects([this.collidingPlane]);
    return intersects;
  }

  frameupdate() {
    // this.grid.rotation.x += 0.001;
    this.car.frameupdate();
  }
}

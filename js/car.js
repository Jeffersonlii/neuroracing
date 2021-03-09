class Car {
  constructor() {
    this.onDown = {
      left: false,
      right: false,
      forward: false,
      reverse: false,
    };

    const geometry = new THREE.BoxGeometry(200, 100, 20);

    this.rad = 0;
    this.velo = 0;
    this.x = 0;
    this.maxvelo = 10;

    this.object = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );

    this.object.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: 'red',
          linewidth: 2,
        })
      )
    );
    document.onkeydown = (e) => {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 87: // w
          this.onDown.forward = true;
          break;
        case 65: //a
          this.onDown.left = true;
          break;
        case 83: //s
          this.onDown.reverse = true;
          break;
        case 68: //d
          this.onDown.right = true;
          break;
        default:
      }
    };
    document.onkeyup = (e) => {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 87: // w
          this.onDown.forward = false;
          break;
        case 65: //a
          this.onDown.left = false;
          break;
        case 83: //s
          this.onDown.reverse = false;
          break;
        case 68: //d
          this.onDown.right = false;
          break;
        default:
      }
    };
    this.frameupdate();
    return this.object;
  }
  frameupdate() {
    setTimeout(() => {
      this.frameupdate();
    }, 10);
    if (this.onDown.forward) {
      this.velo = Math.min(this.velo + 0.2, this.maxvelo);
    }
    if (this.onDown.reverse) {
      this.velo = Math.max(this.velo - 0.1, 0);
    }
    if (this.onDown.left && this.velo !== 0) {
      this.rad += 0.1;
      if (this.rad === 2 * Math.PI) this.rad = 0;
      this.object.rotation.z = this.rad;
    }
    if (this.onDown.right && this.velo !== 0) {
      this.rad -= 0.1;
      if (this.rad === 0) this.rad = 2 * Math.PI;
      this.object.rotation.z = this.rad;
    }

    this.object.position.x += Math.cos(this.rad) * this.velo;
    this.object.position.y += Math.sin(this.rad) * this.velo;

    this.velo = Math.max(this.velo - 0.05, 0);
  }
}

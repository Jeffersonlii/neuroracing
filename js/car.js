class Car {
  constructor() {
    const onDown = {
      left: false,
      right: false,
      forward: false,
      reverse: false,
    };

    const geometry = new THREE.BoxGeometry(40, 20, 1);

    this.rad = 0;
    this.velo = 0;
    this.x = 0;
    this.maxvelo = 10;

    this.object = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );

    document.onkeydown = (e) => {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 87: // w
          onDown.forward = true;
          break;
        case 65: //a
          onDown.left = true;
          break;
        case 83: //s
          onDown.reverse = true;
          break;
        case 68: //d
          onDown.right = true;
          break;
        default:
      }
    };
    document.onkeyup = (e) => {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 87: // w
          onDown.forward = false;
          break;
        case 65: //a
          onDown.left = false;
          break;
        case 83: //s
          onDown.reverse = false;
          break;
        case 68: //d
          onDown.right = false;
          break;
        default:
      }
    };
    this.object.frameupdate = () => {
      if (onDown.forward) {
        this.velo = Math.min(this.velo + 0.2, this.maxvelo);
      }
      if (onDown.reverse) {
        this.velo = Math.max(this.velo - 0.1, 0);
      }
      if (onDown.left && this.velo !== 0) {
        this.rad += 0.1;
        if (this.rad === 2 * Math.PI) this.rad = 0;
        this.object.rotation.z = this.rad;
      }
      if (onDown.right && this.velo !== 0) {
        this.rad -= 0.1;
        if (this.rad === 0) this.rad = 2 * Math.PI;
        this.object.rotation.z = this.rad;
      }
      console.log(this.velo);
      this.object.position.x += Math.cos(this.rad) * this.velo;
      this.object.position.y += Math.sin(this.rad) * this.velo;

      this.velo = Math.max(this.velo - 0.05, 0);
    };
    return this.object;
  }
}

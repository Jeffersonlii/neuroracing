class HexagonGeometry {
  constructor() {
    var geom = new THREE.BufferGeometry();

    var object = new THREE.Mesh(
      geom,
      new THREE.MeshLambertMaterial({ color: 0xffcc00 })
    );

    object.position.z = -100; //move a bit back - size of 500 is a bit big
    object.rotation.y = -Math.PI * 0.5; //triangle is pointing in depth, rotate it -90 degrees on Y

    return object;
  }
}

class Mapgrid {
  constructor(scene) {
    this.scene = scene;

    this.addwall();

    this.car = new Car();
    this.scene.add(this.car);
  }

  addwall() {
    this.scene.add(new HexagonGeometry());
  }
  frameupdate() {
    this.car.frameupdate();
  }
}

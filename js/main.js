//browser-sync start --server --no-online --files="**/*"

class Main {
  constructor() {
    let stats = new Stats();
    stats.showPanel(1);
    document.body.appendChild(stats.domElement);

    //setup canvas
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 1000);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setClearColor('white'); //background colour
    this.renderer.setSize(window.innerWidth, window.innerHeight); //size of canvas

    window.addEventListener('resize', () => {
      //fix scene onresize
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    let mg = new Mapgrid(this.scene, this.camera);

    const animate = () => {
      stats.begin();

      requestAnimationFrame(animate);
      mg.frameupdate();
      this.renderer.render(this.scene, this.camera);
      stats.end();
    };
    document.body.appendChild(this.renderer.domElement); // add the renderer to the actual html
    animate();
  }
}
new Main();

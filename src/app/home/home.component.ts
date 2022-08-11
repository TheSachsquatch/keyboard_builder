import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef !: ElementRef

  constructor(){
  }
  get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.canvasRef);
    let renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    let scene = new THREE.Scene();
    let loader = new GLTFLoader();
    let camera = new THREE.PerspectiveCamera(11, 
    window.innerWidth/window.innerHeight, 0.1, 1000);
    console.log(this.canvas.width)
    renderer.setSize(window.innerWidth-300, window.innerHeight-300);
    loader.load('../assets/keeb.glb', function(this: HomeComponent, gltf){
      console.log(gltf.scene)
      scene.add(gltf.scene)
      gltf.scene.localToWorld(scene.position)
      scene.add(new THREE.AmbientLight(new THREE.Color("rgb(255,255,255)"), 0.2))
      const light = new THREE.PointLight(new THREE.Color("rgb(255,255,255)"), 0.9)
      light.position.set(10,30,40)
      scene.add(light)
      camera.position.set( gltf.scene.position.x, gltf.scene.position.y, gltf.scene.position.z);
      camera.translateZ(20);
      camera.translateY(10);
      camera.translateX(-20);
      camera.zoom=1.2;
      var controls = new OrbitControls( camera, renderer.domElement );
      camera.lookAt(gltf.scene.position)
      scene.background = new THREE.Color("rgb(255,255,255)")
      var animate = function () {
        requestAnimationFrame(animate);
        scene.rotateY(0.01)
        renderer.render(scene, camera)
      }
      animate();
    })

    

    
  }
}

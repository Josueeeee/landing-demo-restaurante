"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function FirePlate(){
  const mountRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const mount=mountRef.current;if(!mount)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,.2,8);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;mount.appendChild(renderer.domElement);
    const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(new RoomEnvironment(),.04).texture;
    const plate=new THREE.Group();plate.rotation.set(-.18,.18,-.12);scene.add(plate);
    const ceramic=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.32,.22,96),new THREE.MeshPhysicalMaterial({color:0x26241f,roughness:.32,metalness:.08,clearcoat:.35}));ceramic.rotation.x=Math.PI/2;plate.add(ceramic);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(2.12,.09,20,96),new THREE.MeshStandardMaterial({color:0x6b604e,roughness:.7}));rim.position.z=.16;plate.add(rim);
    const steakGeo=new THREE.CapsuleGeometry(.72,1.35,16,32);const steakMat=new THREE.MeshPhysicalMaterial({color:0x6f281d,roughness:.62,clearcoat:.14,bumpScale:.08});const steak=new THREE.Mesh(steakGeo,steakMat);steak.rotation.z=Math.PI/2;steak.scale.z=.34;steak.position.set(-.05,-.02,.31);plate.add(steak);
    const charMat=new THREE.MeshStandardMaterial({color:0x180e09,roughness:.95});for(let i=-2;i<=2;i++){const mark=new THREE.Mesh(new THREE.BoxGeometry(.1,1.35,.035),charMat);mark.position.set(i*.27,0,.57);mark.rotation.z=-.28;plate.add(mark)}
    const pepperCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.45,-.95,.45),new THREE.Vector3(-.8,-1.3,.54),new THREE.Vector3(.15,-1.22,.52),new THREE.Vector3(.85,-1.45,.5)]);const pepper=new THREE.Mesh(new THREE.TubeGeometry(pepperCurve,64,.12,18,false),new THREE.MeshPhysicalMaterial({color:0xdb351d,roughness:.32,clearcoat:.8,clearcoatRoughness:.18}));plate.add(pepper);
    const limeMat=new THREE.MeshPhysicalMaterial({color:0x9eb443,roughness:.55,transmission:.08,thickness:.4});[[-1.35,.85,.5],[1.28,.92,.47]].forEach(([x,y,z],i)=>{const lime=new THREE.Mesh(new THREE.SphereGeometry(.38,32,18,0,Math.PI*2,0,Math.PI/2),limeMat);lime.position.set(x,y,z);lime.rotation.x=i?.35:-.25;plate.add(lime);const center=new THREE.Mesh(new THREE.CircleGeometry(.29,24),new THREE.MeshStandardMaterial({color:0xd3cf65,roughness:.75}));center.position.set(x,y,z+.25);plate.add(center)});
    const leafMat=new THREE.MeshStandardMaterial({color:0x405634,side:THREE.DoubleSide,roughness:.8});for(let i=0;i<11;i++){const leaf=new THREE.Mesh(new THREE.CircleGeometry(.1+Math.random()*.06,12),leafMat);const a=i*2.18;leaf.position.set(Math.cos(a)*(1.2+Math.random()*.75),Math.sin(a)*(1+Math.random()*.7),.58);leaf.scale.y=.45;leaf.rotation.z=a;plate.add(leaf)}
    const emberGeo=new THREE.BufferGeometry();const emberPos=new Float32Array(80*3);for(let i=0;i<80;i++){emberPos[i*3]=(Math.random()-.5)*6;emberPos[i*3+1]=(Math.random()-.5)*5;emberPos[i*3+2]=(Math.random()-.5)*2}emberGeo.setAttribute("position",new THREE.BufferAttribute(emberPos,3));const embers=new THREE.Points(emberGeo,new THREE.PointsMaterial({color:0xff6a2b,size:.035,transparent:true,opacity:.8}));scene.add(embers);
    const light=new THREE.DirectionalLight(0xfff1cf,5);light.position.set(-3,4,6);scene.add(light);const fire=new THREE.PointLight(0xff3c10,35,12);fire.position.set(3,-2,4);scene.add(fire);scene.add(new THREE.AmbientLight(0x8c6d55,.7));
    const pointer={x:0,y:0};const move=(e:PointerEvent)=>{const r=mount.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width-.5)*.5;pointer.y=((e.clientY-r.top)/r.height-.5)*.35};mount.addEventListener("pointermove",move);
    const resize=()=>{const{width,height}=mount.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()};const observer=new ResizeObserver(resize);observer.observe(mount);resize();
    const timer=new THREE.Timer();let frame=0;const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;const animate=()=>{timer.update();const t=timer.getElapsed();if(!reduced){plate.rotation.y+=(pointer.x-plate.rotation.y)*.035;plate.rotation.x+=(-.18-pointer.y-plate.rotation.x)*.035;plate.position.y=Math.sin(t*.7)*.06;embers.rotation.z=t*.035;fire.intensity=31+Math.sin(t*5)*4}renderer.render(scene,camera);frame=requestAnimationFrame(animate)};animate();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();mount.removeEventListener("pointermove",move);scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Points){object.geometry.dispose();const material=object.material as THREE.Material|THREE.Material[];(Array.isArray(material)?material:[material]).forEach(m=>m.dispose())}});pmrem.dispose();renderer.dispose();renderer.domElement.remove()};
  },[]);
  return <div ref={mountRef} className="fire-plate" role="img" aria-label="Plato tridimensional de cocina al fuego con carne, chile, cítricos y brasas"/>;
}

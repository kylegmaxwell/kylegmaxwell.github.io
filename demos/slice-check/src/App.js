'use-strict';

import * as THREE from '../lib/three.module.js';

import { STLLoader } from '../lib/STLLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';
import { MeshCut } from "./MeshCut.js"

// TODO this is hard coded to the sample data
const SLICE_HEIGHT_SEPARATION = 20;

/**
 * App - Application entry point
 */
export class App {
    constructor() {
        this.imageCtx = null
        this.loader = new STLLoader();
        this.scene = new THREE.Scene();
        this.meshesObj = new THREE.Object3D();
        this.scene.add(this.meshesObj);
        this.slicesObj = new THREE.Object3D();
        this.scene.add(this.slicesObj);
        this.testObj = new THREE.Object3D();
        this.scene.add(this.testObj);
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentSlice = -1;
        this.sortedSlices = [];
        // TODO this is hard coded to the sample data
        this.globalPlanes = [
            new THREE.Plane(new THREE.Vector3(0, 1, 0), 140),
            new THREE.Plane(new THREE.Vector3(0, -1, 0), -120)
        ];
        this.noClip = Object.freeze([]);
    }


    /**
     * Turn on or off global clipping planes to trim mesh to slice
     * @param {Boolean} active  Whether clipping is on or off
     * @param {Number} minDist Minimum distance from origin in slice direction to render
     * @param {Number} maxDist Maximum distance from origin in slice direction to render
     *
     * @return {type} Description
     */
    setClipping(active, minDist, maxDist) {
        if (!active) {
            this.renderer.clippingPlanes = this.noClip;
            return;
        }
        if (minDist !== undefined)
            this.globalPlanes[0].constant = -1 * minDist;
        if (maxDist !== undefined)
            this.globalPlanes[1].constant = maxDist;
        this.renderer.clippingPlanes = this.globalPlanes; // Later set it to globalPlanes
    }

    /**
     * Add an object and prepare it for rendering
     *
     * @param {THREE.Object3D} obj    The new object
     * @param {THREE.Object3D} parent The container
     */
    addObj(obj, parent) {
        if (obj.geometry) {
            obj.geometry.computeBoundingSphere(); // needed for focus
        }
        parent.add(obj);
        // THREE.EditorControls is buggy in determining the center point, so focus is disabled here
        // TODO set center point manually
        // this.controls.focus(parent, true);
        this.render();
    }


    /**
     * Change the visible slice based on the percentage selection
     * @param {Number} value Value of slider from 0 to 100
     */
    changeSlice(value, doCrop, ctx) {
        var i = this.currentSlice;
        if (i === -1) return;
        this.sortedSlices[this.currentSlice].mesh.visible = false;
        var slices = this.sortedSlices;
        slices[i].mesh.visible = false;
        i = Math.floor(((100 - value) * 0.01) * (slices.length - 1));
        this.currentSlice = i;
        slices[i].mesh.visible = true;
        var pos = slices[i].mesh.position;
        this.setClipping(doCrop, pos.y - SLICE_HEIGHT_SEPARATION, pos.y + SLICE_HEIGHT_SEPARATION);
        ctx.putImageData(slices[i].imgData, 0, 0);
        this.render();

        this.renderSliceOverlap();
    }


    /**
     * Determine where the mesh overlaps the current slice and render as a line
     */
    renderSliceOverlap() {
        // Get the mesh geometry and transform it into image space
        var mesh = this.sortedSlices[this.currentSlice].mesh;
        mesh.updateMatrixWorld();
        var m = mesh.matrixWorld.clone().invert();
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        var geometry = this.meshesObj.children[0].geometry.clone().applyMatrix4(m);

        // Trim the mesh to just the triangels that cross the image plane
        var cutGeometry = MeshCut.trimMeshToPlane(geometry);
        this.drawCutGeometry(cutGeometry);

        // Draw the trimmed triangles for debugging.
        var cutMesh = new THREE.Mesh(cutGeometry, material);
        if (this.testObj.children.length > 0) {
            this.testObj.children[0].geometry.dispose();
            this.testObj.children[0] = cutMesh;
        } else {
            this.testObj.children.push(cutMesh);
        }
    }

    /**
     * Draw the outline of the cross section where the mesh is cut by the image
     * @param {THREE.BufferGeometry} geometry The trianges that are crossing the image
     */
    drawCutGeometry(geometry) {
        // TODO this canvas should be passed in, not accessed directly
        var canvas = document.querySelector('#dicomImage > canvas');
        if (!canvas) {
            console.warn('Could not find image canvas.');
            return;
        }
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        // TODO not sure why the canvas is 256 pixels, but the height must be 512
        var SCALE_HACK = 2.0;
        var width = SCALE_HACK * canvas.width;
        var height = SCALE_HACK * canvas.height;
        var pos = geometry.attributes.position.array;
        for (var i = 0; i < pos.length; i += 9) {
            var z0 = pos[i + 2];
            var z1 = pos[i + 5];
            var z2 = pos[i + 8];
            var offsets = MeshCut.findCrossingOffsets([z0, z1, z2]);
            if (offsets == null) { console.warn(i, 'not crossing'); }
            var c0 = MeshCut.findCrossingPoint(offsets[0], pos, i, width, height);
            var c1 = MeshCut.findCrossingPoint(offsets[1], pos, i, width, height);
            ctx.moveTo(c0[0], c0[1]);
            ctx.lineTo(c1[0], c1[1]);
        }
        ctx.stroke();
    }

    /**
     * Load a dicom texture and create a quad to render it in 3D
     *
     * @param {String} imgUrl   Path to image data that can render on a canvas
     * @param {Object} metadata DICOM header converted to human readable properties
     *
     * @return {type} Description
     */
    loadTexture(imgUrl, imgData, metadata) {
        var textureLoader = new THREE.TextureLoader();
        var texture1 = textureLoader.load(imgUrl, () => {
            this.render();
        });
        var width = 512;
        var height = 512;
        var pixelWidth = 1.0;
        var pixelHeight = 1.0;

        var offset = [0, 0, 0];
        if (metadata) {
            width = metadata.columns ? metadata.columns : width;
            height = metadata.rows ? metadata.rows : height;
            if (metadata.pixelSpacing) {
                var dims = metadata.pixelSpacing.split('\\');
                pixelWidth = parseFloat(dims[0]);
                pixelHeight = parseFloat(dims[1]);
                width = width * pixelWidth;
                height = height * pixelHeight;
            }
            offset[0] += metadata.imagePositionPatient[0];
            offset[1] += metadata.imagePositionPatient[1];
            offset[2] += metadata.imagePositionPatient[2];

        }

        // Texture card geometry
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture1,
            side: THREE.DoubleSide
        });
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        const mesh = new THREE.Mesh(geometry, material);

        // TODO this is hard coded to the sample data
        // This seems to be somewhat of a lucky guess plus a hack
        const OFFSET_HACK = 2;
        mesh.position.x += OFFSET_HACK + offset[0] * pixelWidth;
        mesh.position.z -= offset[1] + height / 2;
        mesh.position.y -= offset[2] - 0;

        mesh.scale.x = width;
        mesh.scale.y = height;

        //TODO this should use imageOrientationPatient
        mesh.rotation.y = Math.PI;
        // TODO this is hard coded to the sample data
        mesh.rotation.x = Math.PI / 2;

        if (this.currentSlice !== -1) {
            this.sortedSlices[this.currentSlice].mesh.visible = false;
        }
        this.addObj(mesh, this.slicesObj);
        this.currentSlice = this.insertSortedSlice({
            imgUrl: imgUrl,
            imgData: imgData,
            metadata: metadata,
            mesh: mesh,
            z: metadata.imagePositionPatient[2]
        });
    }

    /**
     * Insert a new slice into the sorted list
     * @param {Object} newSlice JSON object map containing slice info
     * @return {Number} The position in the list where it was inserted
     */
    insertSortedSlice(newSlice) {
        // Check if the new slice can simply go on the end
        if (this.sortedSlices.length === 0 || newSlice.z >= this.sortedSlices[this.sortedSlices.length - 1].z) {
            this.sortedSlices.push(newSlice);
            return this.sortedSlices.length - 1;
        }
        //TODO binary search
        for (var i = 0; i < this.sortedSlices.length; i++) {
            var slice = this.sortedSlices[i];
            if (newSlice.z < slice.z) {
                this.sortedSlices.splice(i, 0, newSlice);
                return i;
            }
        }
    }

    /**
     * loadStl - Function to load an stl file for rendering as a mesh
     * @param {String} stlUrl The url of the mesh file
     * @param {Function} cb Callback function to indicate completion
     */
    loadStl(relativeStlUrl, cb) {
        const dataUrl = SAMPLE_SLICE_DATA.get(relativeStlUrl) ?? relativeStlUrl;
        this.loader.load(dataUrl, (geometry) => {
            var material = new THREE.MeshPhysicalMaterial({
                color: 0xff5533,
                roughness: 0.7,
                metalness: 0.6,
                side: THREE.DoubleSide
            });
            // TODO this is hard coded to the sample data
            geometry.rotateX(Math.PI / 2);
            var mesh = new THREE.Mesh(geometry, material);

            this.addObj(mesh, this.meshesObj);
            mesh.geometry.computeBoundingSphere();
            this.controls.target = mesh.geometry.boundingSphere.center;
            this.controls.update();

            cb();
        });
    }

    /**
     * initThree - Setup three.js scene
     *
     * @param {Element} container DOM element to contain the render canvas
     */
    initThree(container) {
        var width = container.clientWidth;
        var height = container.clientHeight;
        // narrow field of view to reduce perspective distortion
        const FOV = 10;
        this.camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.sortObjects = false;
        this.renderer.setClearColor(0xcccccc);
        this.renderer.setSize(width, height);
        this.setClipping(false);
        container.appendChild(this.renderer.domElement);
        // TODO this is hard coded to the sample data
        this.camera.position.x = 900;
        this.camera.position.y = 900;
        this.camera.position.z = 900;
        this.controls = new OrbitControls(this.camera, container);
        this.controls.addEventListener('change', () => {
            this.render();
        });

        // Keep a separate scene so that this doesnt affect focusing of controls
        var axisHelper = new THREE.AxesHelper(100);
        this.scene.add(axisHelper);

        this.addLights();
        this.render();
    }

    /**
     * addLights - Add some lights to the three.js scene
     */
    addLights() {
        var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight1.position.set(1, -1, 0);
        this.scene.add(directionalLight1);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(0, 1, 0);
        this.scene.add(directionalLight2);

        var directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight3.position.set(-1, -1, 1);
        this.scene.add(directionalLight3);

        var directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight4.position.set(0, 0, -1);
        this.scene.add(directionalLight4);

        var light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);
    }

    /**
     * render - Render the scene
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize(container) {
        var width = Math.floor(container.clientWidth);
        var height = Math.floor(container.clientHeight);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.render();
    }
}

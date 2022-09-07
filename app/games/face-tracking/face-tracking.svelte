<page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" class="page" xmlns:AR="nativescript-ar">
    <stackLayout class="p-1" >
        <flexboxLayout justifyContent="center" class="py-3">
            <AR
              row="2"
              trackingMode="FACE"
          ></AR>
        </flexboxLayout>
    </stackLayout>
</page>
<script type="ts">
import { createEventDispatcher } from "svelte";
import { AR, ARTrackingFaceEventData, ARLoadedEventData } from 'nativescript-ar';

import type { Game } from "~/types";

import GameNav from "~/components/game-nav.svelte";

export let game:Game;

let isFaceStreamSupported = false;

$: values = 0;


const dispatch = createEventDispatcher();

function arLoaded(args: ARLoadedEventData): void {
    this.ar = args.object;
    console.log(">> arLoaded, ar: " + this.ar);

    try {
      this.ar.trackImage({
        image: "https://raw.githubusercontent.com/EddyVerbruggen/nativescript-ar/master/demo/app/App_Resources/Android/src/main/assets/tnsgranite-diffuse.png",
        onDetectedImage: (args) => {
          args.imageTrackingActions.addModel({
            // name: isIOS ? "Models.scnassets/Teapot.usdz" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
            name: isIOS ? "Models.scnassets/Car.dae" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
            position: {
              x: args.position.x,
              y: args.position.y,
              z: args.position.z - 0.1
            },
            scale: 0.1
          });
        }
      });
    } catch (e) {
      console.error(e);
    }


   
  }

  function trackingFaceDetected(args: ARTrackingFaceEventData): void {
    if (args.properties) {
      // console.log(JSON.stringify(args.properties));
    }

    if (args.faceTrackingActions) {

      let textModel;

      setTimeout(() => {
        args.faceTrackingActions.addText({
          text: "Ray-Ban model S",
          depth: 0.3,
          materials: [new Color("red")],
          scale: {
            x: 0.002,
            y: 0.002,
            z: 0.002
          },
          position: {
            x: -0.1, // a bit to the left
            y: 0.15, // and a bit up
            z: 0
          },
        }).then(result => textModel = result);
      }, 500);

      args.faceTrackingActions.addModel({
        name: "Models.scnassets/glasses-vv-1.dae",
        position: {
          x: 0.001,
          y: 0.01,
          z: 0
        },
        scale: {
          x: 1.03,
          y: 1.03,
          z: 1.03
        },
        onTap: (interaction: ARNodeInteraction) => {
          // let's remove the current glasses, and replace it by a different model
          interaction.node.remove();

          args.faceTrackingActions.addModel({
            name: "Models.scnassets/Glasses9.dae",
            position: {
              x: 0,
              y: 0, // a little lower
              z: 0.04 // a little closer to the camera
            },
            scale: {
              x: 0.17,
              y: 0.17,
              z: 0.17
            },
            onTap: (interaction: ARNodeInteraction) => {
              interaction.node.remove();
              textModel.remove();
            }
          });

          // textModel.remove();
          args.faceTrackingActions.addText({
            text: "Ray-Ban Opaque",
            materials: [new Color("orange")],
            depth: 1,
            scale: {
              x: 0.002,
              y: 0.002,
              z: 0.002
            },
            position: {
              x: -0.1, // a bit to the left
              y: 0.15, // and a bit up
              z: 0
            },
          }).then(result => textModel = result);
        }
      });
    }
  }

</script>
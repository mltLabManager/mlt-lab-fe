import React, { useEffect } from "react";
import Quagga from "quagga";

//does not work yet
function Test() {
  // const [showAlert, setShowAlert] = React.useState(false);
  useEffect(() => {
    Quagga.init(
      {
        numOfWorkers: 4,
        locate: true,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-quagga"), // Or '#yourElement' (optional){
          constraints: {
            width: window.innerWidth - 20,
            height: 450,

            facingMode: "environment",
            // deviceId: "7832475934759384534",
          },
          area: {
            // defines rectangle of the detection/localization area
            top: "0%", // top offset
            right: "0%", // right offset
            left: "0%", // left offset
            bottom: "0%", // bottom offset
          },
          singleChannel: false, // true: only the red color-channel is read
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
        locator: {
          halfSample: true,
          patchSize: "medium", // x-small, small, medium, large, x-large
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected(detection);
    return () => {
      Quagga.stop();
      Quagga.offDetected(detection);
    };
  }, []);

  const detection = (result) => {
    // window.alert(JSON.stringify(result));

    if (result.codeResult) {
      console.log("result", result.codeResult.code);
    } else {
      console.log("not detected");
    }
  };

  return (
    <div id="barcode-quagga" style={{ textAlign: "center", marginTop: "24px" }}>
      {/* <BarcodeReader onError={this.handleError} onScan={this.handleScan} /> */}
      {/* <p>{this.state.result}</p> */}
    </div>
  );
}

export default Test;

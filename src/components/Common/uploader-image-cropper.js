import React, { useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import LocaleStrings from "../../languages";

export default function ImageCropper(props) {
  var {
    displaySize,
    cropperSize,
    requiredSize,
    className,
    insideImage,
    insideImageStyle,
    insideText,
  } = props;
  var [canvasRecource, setCanvasRecource] = useState(props.canvasRecource);
  var [imageUrl, setImagepath] = useState(props.imagepath);
  var [scale, setScale] = useState(1.2);
  var [imageErrorMsg, setImageErrorMsg] = useState("");

  var imageErrorClsName = "alert-danger";
  var scaleStep = 0.05;
  var defaultScale = 1.2;
  var minScale = 1;
  var maxScale = 2;
  var editor = "";

  // This function is added by vinay as it requires in course cover image display on 29/12/2020. I have tested others component where this component is import, not any issue found. if in future any issue occures then need to change this function.
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     if (nextProps.imagepath !== '' && this.state.imagepath === '') {
  //       this.setState({ imagepath: nextProps.imagepath });
  //     }
  //   }
  // }

  const setEditorRef = (edit) => (editor = edit);

  const onClickSave = () => {
    saveImage(null);
  };

  const saveImage = (callback) => {
    if (editor) {
      var imageType = props.imageType;
      if (!imageType) imageType = "jpg";

      var img;
      if (imageType === "png") img = editor.getImage().toDataURL();
      else img = editor.getImage().toDataURL("image/jpeg", 0.9);
      setImagepath(img);
      props.onImageSave(img);
      if (callback) {
        setTimeout(() => {
          callback();
        }, 2000);
      }
    }
  };

  const resetImage = () => {
    setCanvasRecource("");
    setImagepath("");
    setScale(defaultScale);
    setImageErrorMsg("");

    props.onImageSave("");
    props.onImageChange(false);
  };

  const onDropFile = (files) => {
    // console.log('files :- ', files);
    let file = files[0];
    let requiredWidth = requiredSize.width;
    let requiredHeight = requiredSize.height;
    let reader = new FileReader();
    if (file && file.type.indexOf("image") != -1) {
      reader.onload = (e) => {
        let img = new Image();
        img.src = reader.result;
        img.onload = function (obj) {
          let width = this.width;
          let height = this.height;

          if (width < requiredWidth || height < requiredHeight) {
            setImageErrorMsg(LocaleStrings.invalid_profile_image_size);
            props.onImageChange(false);
          } else {
            setImageErrorMsg("");
            setCanvasRecource(reader.result);
            props.onImageChange(true);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const onZoomOut = () => {
    var scale1 = scale;
    scale1 = scale1 - scaleStep;
    if (scale1 < minScale) scale1 = minScale;
    setScale(scale1);
  };

  const onZoomIn = () => {
    var scale1 = scale;
    scale1 = scale1 + scaleStep;
    if (scale1 > maxScale) scale1 = maxScale;
    setScale(scale1);
  };

  var hideDropZoneClass = "";
  var hideCropZoneClass = "d-none";
  var hideControlButton = "d-none";
  var imageDisplayContaner = {
    width: displaySize.width,
    height: displaySize.height,
  };

  if (imageUrl && imageUrl !== "file object not found") {
    hideDropZoneClass = "d-none";
    hideCropZoneClass = "d-none";
    hideControlButton = "";
  }

  if (canvasRecource && !imageUrl) {
    hideDropZoneClass = "d-none";
    hideCropZoneClass = "";
    imageDisplayContaner = {
      width: displaySize.width,
      height: displaySize.height,
      // marginBottom: 10
    };
  }
  if (imageErrorMsg != "") {
    hideControlButton = "";
    hideDropZoneClass = "d-none";
  }

  var imageErrorStyle = {
    padding: "5px",
    margin: "5px 0px",
  };

  return (
    <>
      <div style={imageDisplayContaner} className={`${hideDropZoneClass}`}>
        <Dropzone onDrop={onDropFile} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            // <section className={`${hideDropZoneClass}`}>
            <div {...getRootProps()} className={`${className}`}>
              <input {...getInputProps()} />
              <img src={insideImage} style={insideImageStyle} />
              <div className="custom-text3-normal">{insideText}</div>
            </div>
            // </section>
          )}
        </Dropzone>
      </div>

      {imageErrorMsg && imageErrorMsg != "" ? (
        <>
          <div className={imageErrorClsName} style={imageErrorStyle}>
            {imageErrorMsg}
          </div>

          <button
            type="button"
            className="custom-button-primary-md"
            onClick={resetImage}
          >
            {LocaleStrings.button_upload_new_image}
          </button>
        </>
      ) : (
        <>
          <div
            className={`image-section ${hideControlButton}`}
            style={imageDisplayContaner}
          >
            <img src={imageUrl} alt="" className={`img-responsive`} />
            <div className={`cropper-remove-button-position`}>
              <button
                type="button"
                className={`custom-button-secondary-sm`}
                onClick={resetImage}
              >
                {LocaleStrings.button_remove}
              </button>
            </div>
          </div>

          <div className={hideCropZoneClass}>
            <AvatarEditor
              image={canvasRecource}
              color={[0, 0, 0, 0.5]} // RGBA
              scale={scale}
              rotate={0}
              ref={setEditorRef}
              disabledrop="true"
              width={cropperSize.width}
              height={cropperSize.height}
              className="editor-canvas"
              style={{ background: "#777" }}
            />
            <div className="dropzone-control-button">
              <button
                type="button"
                className="custom-icon-button-primary-md"
                onClick={onZoomIn}
              >
                <i className="fa fa-search-plus"></i>
              </button>
              <button
                type="button"
                className="custom-icon-button-primary-md"
                onClick={onZoomOut}
              >
                <i className="fa fa-search-minus"></i>
              </button>
              <button
                type="button"
                className="custom-button-primary-md"
                onClick={onClickSave}
              >
                {LocaleStrings.button_crop}
              </button>
              <button
                type="button"
                className="custom-icon-button-danger-md"
                onClick={resetImage}
              >
                x
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import trashIcon from "../../assets/img/icons/trash.svg";
import downloadIcon from "../../assets/img/icons/download.png";

export default function AllFilesDrop(props) {
  var {
    fileName,
    fileOld,
    className,
    insideImage,
    insideImageStyle,
    insideText,
    accept,
  } = props;
  var [fileUrl, setFilepath] = useState(props.filepath);
  // console.log('fileUrl : - ', fileUrl);
  // console.log('====================');

  useEffect(() => {
    if (props && props.filepath !== "" && fileUrl === "") {
      setFilepath(props.filepath);
    }
  }, [props]);

  const onDropFile = (files) => {
    let file = files[0];
    // console.log('file :- ', file);
    let reader = new FileReader();
    reader.onloadend = () => {
      var item = reader.result;
      var data = { file: item, filename: file.name.replace(/ /g, "-") };
      // console.log('data :- ', data);
      props.onFileSave(data);
      props.onFileChnageLocally(true);
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setFilepath("");
    var data = {};
    props.onFileSave(data);
    props.onFileChnageLocally(true);
  };

  var hideDropZoneClass = "";
  var hideControlButton = "d-none";
  if (fileUrl && fileUrl !== "") {
    hideDropZoneClass = "d-none";
    hideControlButton = "";
  }

  return (
    <>
      <div className={`${hideDropZoneClass}`}>
        <Dropzone
          onDrop={onDropFile}
          accept={accept ? accept : "*"}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            // <section className={`${hideDropZoneClass}`}>
            <div {...getRootProps()} className={`${className}`}>
              <input {...getInputProps()} />
              <img src={insideImage} style={insideImageStyle} />
              <span className="text-sm">{insideText}</span>
            </div>
            // </section>
          )}
        </Dropzone>
      </div>

      <div className={`uploaded-attachment-displaybox ${hideControlButton}`}>
        <div className="row m-0">
          <div className="col-8 col-sm-10 col-md-10 custom-text1-normal-secondary">
            <div className="file-name">{fileName}</div>
          </div>
          <div className="col-4 col-sm-4 col-md-2 text-right d-flex">
            {fileOld ? (
              <a
                className="action-button"
                href={`${fileUrl}`}
                title="Download"
                download
              >
                <img
                  className="action-button cursor-pointer"
                  src={downloadIcon}
                  alt=""
                  style={{ height: 17 }}
                />
              </a>
            ) : (
              ""
            )}
            <img
              onClick={resetImage}
              className="action-button cursor-pointer"
              src={trashIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

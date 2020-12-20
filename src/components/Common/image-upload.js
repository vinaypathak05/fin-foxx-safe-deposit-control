import React, {Component} from 'react';
import {Button} from 'reactstrap';
import Dropzone from 'react-dropzone';
import LocaleStrings from '../../languages';

export default class ImagesDrop extends Component {
    constructor(props){
        super(props);

        this.imageCallback=null;

        this.state = {
            imagePreviewUrl: props.imagePreviewUrl,
            filepath: props.filepath,
        };
        this.resetImage = this.resetImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps){
            if(nextProps.filepath !== '' && this.state.filepath === ''){
                this.setState({filepath:nextProps.filepath});
            }
        }
    }

    onDropFile = files => {
        var that=this;
        let file = files[0];
        // console.log('file :- ', file)
        let reader = new FileReader();
        reader.onloadend = () => {
            var item=reader.result;
            var data = {file: item, filename:(file.name).replace(/ /g, '-')};
            that.props.onFileSave(data);
            that.props.onFileChnageLocally(true);
        }
        reader.readAsDataURL(file);
    }

    resetImage = () => {
        this.setState({filepath: ''});
        this.props.onFileSave('');
        this.props.onFileChnageLocally(true);
    }

    render() {
        let fileUrl = this.state.filepath;
        let {fileName, fileOld} = this.props;
        // console.log('fileUrl : - ', fileUrl)

        var hideDropZoneClass = '';
        var hideControlButton = 'd-none';

        if(fileUrl && fileUrl != '') {
        // if(fileUrl && fileUrl !== 'file object not found') {
            hideDropZoneClass = 'd-none';
            hideControlButton = '';
        }

        var aStyle = {
            padding: '5px',
            width: this.props.width,
            height: this.props.height,
            border: '1px solid #2676ea',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderRadius: 5
        };

        var dropStyle = {
            // width: this.props.width,
            // height: this.props.height,
        }

        return (
            <div className="col-md-12 mb-3">
                <label className="custom-label">{this.props.label}*</label>
                <Dropzone 
                    onDrop={this.onDropFile}
                    accept="image/*"
                >
                {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}> */}
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className={`${this.props.className} ${hideDropZoneClass}`} style={dropStyle}>
                            <input {...getInputProps()} />
                            {this.props.innerText}
                        </div>
                    )}
                </Dropzone>
                
                {/* <Dropzone
                    // onDrop={this.onDropFile}
                    // accept="image/*"
                    // multiple={false}
                    // className={`${this.props.className} ${hideDropZoneClass}`}
                    // style={dropStyle}
                >
                    {this.props.innerText}
                </Dropzone> */}
                {fileOld ? 
                    <a className={`${hideControlButton}`} href={`${fileUrl}&/${fileName}`} style={aStyle} target="_blank" download title="Download">{fileName}</a>
                :
                    <div className={`${hideControlButton}`} style={aStyle}>{fileName}</div>
                }            

                <div className={hideControlButton}>
                    <button type="button" className="btn btn-sm btn-primary mt-1" onClick={this.resetImage}> {LocaleStrings.button_upload_new_file} </button>
                </div>
            </div>
        );
    }
}
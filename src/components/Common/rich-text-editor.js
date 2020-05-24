import React, {Component} from 'react';
import {EditorState, ContentState, RichUtils, convertFromHTML, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

var initialized=false;
var inputHadValue=false;

class RichTextEditor extends Component {

    constructor(props) {
        super(props);
        // here we create the empty state
        var editorState = EditorState.createEmpty();
        // if the redux-form field has a value
        if (props.value && props.value.length>0) {
            const blocksFromHtml = htmlToDraft(props.value);
            const contentState = ContentState.createFromBlockArray(blocksFromHtml);
            editorState = EditorState.createWithContent(contentState);

            // convert the editorState to whatever you'd like
            /*var contentState = stateFromHTML(props.value);
            editorState = EditorState.createWithContent(contentState);*/
            inputHadValue=true;
        }

        this.state = {editorState: editorState};

        this.onChange = (editorState) => {
            // debugger
            // converting to the raw JSON on change
            let html = draftToHtml(convertToRaw(editorState.getCurrentContent())); //stateToHTML(editorState.getCurrentContent());
            // console.log("HTML ",html);
            
            // Set it on the state
            this.setState({ editorState });
            this.sendBackUpdatedData(html, props.name);
        };
        
        initialized=true;
        // console.log('field :- ', this.props)
    }

    componentWillReceiveProps(newProps){        
        if(initialized && newProps.value && newProps.value.length>0){
            const blocksFromHtml = htmlToDraft(newProps.value);
            const contentState = ContentState.createFromBlockArray(blocksFromHtml);
            const editorNewState = EditorState.createWithContent(contentState);
            this.setState({editorState: editorNewState});
            inputHadValue=true;

            // this.sendBackUpdatedData(newProps.value, newProps.name);
        }
    }

    sendBackUpdatedData(data, name) {
        this.props.updateData(data, name);
    }

    render() {
        var {editorState} = this.state;
        var height=120;
        var tooloptions = {
            options: ['inline', 'fontSize', 'fontFamily', 'list', 'colorPicker'],
            inline: {
                options: ['bold','italic', 'underline'],
            },
            fontFamily: {
                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
            }
        };    

        return (
            <div className="rdw-storybook-root">
                <Editor
                    spellCheck
                    placeholder={this.props.placeholder}
                    ref="editor"
                    editorState={editorState}
                    toolbarClassName="rdw-storybook-toolbar"
                    wrapperClassName="rdw-storybook-wrapper"
                    editorClassName="rdw-storybook-editor"
                    onEditorStateChange={this.onChange}
                    editorStyle={{height:height,background:'white',paddingLeft:10,paddingRight:10}}
                    toolbar={tooloptions}
                    stripPastedStyles={true}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        session:state.session
    }
}

export default connect(mapStateToProps)(RichTextEditor);
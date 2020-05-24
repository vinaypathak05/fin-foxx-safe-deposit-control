import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hideError} from './actions';
import styles from './errorbar.module.css';

export var SHOWTIME = 3000; //time to keep the bar showing
export var ANIMATION_DURATION = 1; //time for show/hide animation
var barShown=false;

class ErrorBar extends Component{
  constructor(props){
    super(props);
    this.props.hideError(true);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.toShow && !barShown){
      barShown=true;

      setTimeout(() => {
        this.props.hideError(this.props.isError);
      },SHOWTIME);

    }else if(nextProps.toHide && barShown){
      barShown=false;
    }
  }

  render(){
    var classcss='';
    var title='';
    var icon='';
    if(this.props.isError){
      title="Error";
      icon=<i className="fa fa-times-circle" style={{color:'#CC0000',fontSize:16}}></i>;
      if(!this.props.toShow && !this.props.toHide){
        classcss=styles.errorbarDefault;
      }else if(this.props.toShow){
        classcss=`${styles.errorbarDefault} ${styles.slideErrorIn}`;
      }else if(this.props.toHide){
        classcss=`${styles.errorbarDefault} ${styles.slideErrorOut}`;
      }
    }else{
      title="Success";
      icon=<i className="fa fa-check-circle" style={{color:'green',fontSize:16}}></i>;
      if(!this.props.toShow && !this.props.toHide){
        classcss=styles.slideErrorOut;
      }else if(this.props.toShow){
        classcss=`${styles.successbarDefault} ${styles.slideErrorIn}`;
      }else if(this.props.toHide){
        classcss=`${styles.successbarDefault} ${styles.slideErrorOut}`;
      }
    }
    return(
      <div className={classcss} style={{zIndex:99999, position: 'fixed'}}>
        <div className={styles.notiftitle}>{icon}{" "}{title}</div>
        <div style={{paddingLeft:18}}>{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
      message:state.errorBar.message,
      toShow:state.errorBar.toShowError,
      toHide:state.errorBar.toHideError,
      isError:state.errorBar.isError
    }
}

export default connect(mapStateToProps,{hideError})(ErrorBar);

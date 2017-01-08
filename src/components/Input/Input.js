import React, {Component} from 'react';
import './Input_styles.css'

// TODO: Replace this. 
const KEY_ENTER = 13;

class Input extends Component {

  static propTypes = {
    socket: (props, propName) => {
      if (!(propName in props)) {
        throw new Error('socket must be set.');
      }
    },
  }

  constructor (props) {
    super(props);
    this.socket = props.socket;
  }

  onKeyPress = (event) => {
    const {key, keyCode, shiftKey, ctrlKey, altKey, input} = event;
    console.log(`INPUT KEYPRESS ${key} (${keyCode}), SHIFT ${shiftKey}, CTRL ${ctrlKey}, ALT ${altKey}`);

    if (keyCode === KEY_ENTER) {
      if (!shiftKey) {
        console.log('SENDING MESSAGE ...');
        // Send data
        this.socket.emit('client:message', event.target.value);

        // Update message list
        store.dispatch({ type: UI_HARD_ENTER, message: event.target.value });
        store.dispatch({ type: CHAT_MESSAGE_CLIENT, message: event.target.value });

        event.preventDefault();
        input.value = '';
      } else {
        // Update input height
        store.dispatch({ type: UI_SOFT_ENTER });
      }
    }

    this.socket.emit('client:typing');
  }


  render() {
    return (
      <textarea
        type="text"
        className="Input-input"
        placeholder="Type a message&hellip;"
        onKeyDown={this.onKeyPress}
      />
    );
  }
}

export default Input;

// import React, { Component, PropTypes } from 'React';


// // @injectSheet(style('Input'))
// class Input extends Component {
//   static propTypes = {
//     socket: (props, propName) => {
//       if (!(propName in props)) {
//         throw new Error('socket must be set.');
//       }
//     },
//     // sheet: (props, propName) => {
//     //   if (!(propName in props)) {
//     //     throw new Error('sheet must be set.');
//     //   }
//     // },
//   }
//   constructor (props) {
//     super(props);

//     this.socket = props.socket;
//   }


//   // Event Handler

//   onKeyPress (event) {
//     const key = event.key;
//     const keyCode = event.keyCode;
//     const shiftKey = event.shiftKey;
//     const ctrlKey = event.ctrlKey;
//     const altKey = event.altKey;
//     const input = event.target;

//     console.log(`INPUT KEYPRESS ${key} (${keyCode}), SHIFT ${shiftKey}, CTRL ${ctrlKey}, ALT ${altKey}`);

//     if (keyCode === KEY_ENTER) {
//       if (!shiftKey) {
//         console.log('SENDING MESSAGE ...');
//         // Send data
//         this.socket.emit('client:message', event.target.value);

//         // Update message list
//         store.dispatch({ type: UI_HARD_ENTER, message: event.target.value });
//         store.dispatch({ type: CHAT_MESSAGE_CLIENT, message: event.target.value });

//         event.preventDefault();
//         input.value = '';
//       } else {
//         // Update input height
//         store.dispatch({ type: UI_SOFT_ENTER });
//       }
//     }

//     this.socket.emit('client:typing');
//   }


//   render () {
//     // const { sheet: { classes } } = this.props;

//     return (
//       <textarea
//         type="text"
//         className="Input-input"
//         placeholder="Type a message&hellip;"
//         onKeyDown={this.onKeyPress.bind(this)}
//       />
//     );
//   }
// }
  
// export default Input;
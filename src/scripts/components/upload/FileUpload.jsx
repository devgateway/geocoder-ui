import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import Dropzone from 'react-dropzone';
import {ListGroup,ListGroupItem,Pagination,Grid,Row,Col,FormControl,Button}  from 'react-bootstrap';



class Upload extends React.Component {


  constructor() {
     super()
     this.state = {
       accepted: [],
       rejected: []
     }
   }



  onDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach(file => {
           const reader = new FileReader();
           reader.onload = () => {
               const fileAsBinaryString = reader.result;
           };
           reader.onabort = () => console.log('file reading was aborted');
           reader.onerror = () => console.log('file reading has failed');
           reader.readAsBinaryString(file);
       });
  }

  uploadFiles(){


  }

  render() {

    return (
        <div className="container">
        <h1>Upload XML File</h1>
            <section>
       <div className="dropzone">
         <Dropzone accept="text/xml, application/xml" onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}>
           <p>Try dropping some files here, or click to select files to upload.</p>
           <p>Only *.xml files will be accepted</p>
         </Dropzone>
       </div>
       <aside>
         <ul>
           {
             this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes (remove)</li>)
           }
         </ul>
       </aside>
     </section>

            <FormControl type="checkbox" name="autocode" label="Autocode Activities" value="yes"/>
            <Button bsStyle='success' className="pull-right">Load  </Button>

        </div>)
  }

}

export default Upload

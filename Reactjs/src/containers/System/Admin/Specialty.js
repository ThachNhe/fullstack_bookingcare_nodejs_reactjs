import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { createNewSpecialty } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class Specialty extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: '',
               imageBase64: '',
               descriptionHTML: '',
               descriptionMarkdown: '',
          };
     }
     async componentDidMount() {}

     async componentDidUpdate(prevProps, prevState, snapshot) {}
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     handleEditorChange = ({ html, text }) => {
          this.setState({
               descriptionHTML: html,
               descriptionMarkdown: text,
          });
     };

     handleOnchangeImage = async (event) => {
          let data = event.target.files;
          let file = data[0];
          if (file) {
               let base64 = await CommonUtils.getBase64(file);
               this.setState({
                    imageBase64: base64,
               });
          }
     };
     handleSaveSpecialty = async () => {
          let { name, descriptionHTML, descriptionMarkdown, imageBase64 } = this.state;
          let res = await createNewSpecialty({
               name: name,
               descriptionHTML: descriptionHTML,
               descriptionMarkdown: descriptionMarkdown,
               imageBase64: imageBase64,
          });
          // console.log('check res : ', res);
          if (res && res.errCode === 0) {
               toast.success('create specialty success');
          } else {
               toast.error('missing parameter');
          }
     };
     render() {
          return (
               <>
                    <div className="manage-specialty-container">
                         <div className="ms-title">Quản lí chuyên khoa</div>
                         <div className="add-new-specialty row">
                              <div className="col-6 form-group">
                                   <label>Tên chuyên khoa</label>
                                   <input
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                   ></input>
                              </div>
                              <div className="col-6 form-group">
                                   <label>Ảnh chuyên khoa</label>
                                   <input
                                        className="form-control-file"
                                        type="file"
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                   ></input>
                              </div>
                              <div className="col-12 md-editor">
                                   <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={this.state.descriptionMarkdown}
                                   />
                              </div>
                              <div className="col-12">
                                   <button className="btn-save-specialty" onClick={() => this.handleSaveSpecialty()}>
                                        Thêm
                                   </button>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
import { manageActions } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { values } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
     constructor(props) {
          super(props);
          this.state = {
               //
               contentMarkdown: '',
               contentHTML: '',
               selectedDoctor: null,
               description: '',
               listDoctor: [],
               hasOldData: false,

               //save doctor info
               listPrice: [],
               listPayment: [],
               listProvince: [],
               selectedPrice: '',
               selectedPayment: '',
               selectedProvince: '',
               nameClinic: '',
               addressClinic: '',
               note: '',
          };
     }

     componentDidMount() {
          this.props.fetchAllDoctor();
          this.props.getRequireDoctorInfo();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.allDoctors !== this.props.allDoctors) {
               let dataSelect = this.buildDataInPutSelect(this.props.allDoctors, 'USERS');
               this.setState({
                    listDoctor: dataSelect,
               });
          }

          if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
               // console.log('data from redux : ', this.props.allRequiredDoctorInfo);
               let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
               let dataSelectPrice = this.buildDataInPutSelect(resPrice, 'PRICE');
               let dataSelectPayment = this.buildDataInPutSelect(resPayment, 'PAYMENT');
               let dataSelectProvince = this.buildDataInPutSelect(resProvince, 'PROVINCE');
               this.setState({
                    listPrice: dataSelectPrice,
                    listPayment: dataSelectPayment,
                    listProvince: dataSelectProvince,
               });
          }
          if (prevProps.language !== this.props.language) {
               let dataSelect = this.buildDataInPutSelect(this.props.allDoctors, 'USERS');
               let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
               let dataSelectPrice = this.buildDataInPutSelect(resPrice, 'PRICE');
               let dataSelectPayment = this.buildDataInPutSelect(resPayment, 'PAYMENT');
               let dataSelectProvince = this.buildDataInPutSelect(resProvince, 'PROVINCE');
               this.setState({
                    listDoctor: dataSelect,
                    listPrice: dataSelectPrice,
                    listPayment: dataSelectPayment,
                    listProvince: dataSelectProvince,
               });
          }
     }
     buildDataInPutSelect = (data, type) => {
          let result = [];
          let { language } = this.props;
          if (data && data.length > 0) {
               if (type === 'USERS') {
                    data.map((item, index) => {
                         let object = {};
                         let labelVi = `${item.lastName} ${item.firstName}`;
                         let labelEn = `${item.firstName} ${item.lastName}`;
                         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                         object.value = item.id;
                         result.push(object);
                    });
               } else if (type === 'PRICE') {
                    data.map((item, index) => {
                         let object = {};
                         let labelVi = ` ${item.valueVi}`;
                         let labelEn = `${item.valueEn} USD `;
                         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                         object.value = item.keyMap;
                         result.push(object);
                    });
               } else if (type === 'PAYMENT' || type === 'PROVINCE') {
                    data.map((item, index) => {
                         let object = {};
                         let labelVi = ` ${item.valueVi}`;
                         let labelEn = `${item.valueEn}`;
                         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                         object.value = item.keyMap;
                         result.push(object);
                    });
               }
          }

          return result;
     };
     handleEditorChange = ({ html, text }) => {
          this.setState({
               contentHTML: html,
               contentMarkdown: text,
          });
     };

     handleChangeSelect = async (selectedDoctor) => {
          this.setState({ selectedDoctor: selectedDoctor });
          let { listPayment, listPrice, listProvince } = this.state;
          let res = await getDetailInfoDoctor(selectedDoctor.value);
          if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentHTML) {
               let markdown = res.data.Markdown;
               let addressClinic = '',
                    nameClinic = '',
                    note = '',
                    paymentId = '',
                    priceId = '',
                    provinceId = '',
                    selectedPayment = '',
                    selectedPrice = '',
                    selectedProvince = '';

               if (res.data.Doctor_Infor) {
                    nameClinic = res.data.Doctor_Infor.nameClinic;
                    addressClinic = res.data.Doctor_Infor.addressClinic;
                    note = res.data.Doctor_Infor.note;
                    paymentId = res.data.Doctor_Infor.paymentId;
                    priceId = res.data.Doctor_Infor.priceId;
                    provinceId = res.data.Doctor_Infor.provinceId;
                    selectedPayment = listPayment.find((item) => {
                         if (item.value === paymentId) return item;
                    });
                    selectedPrice = listPrice.find((item) => {
                         if (item.value === priceId) return item;
                    });
                    selectedProvince = listProvince.find((item) => {
                         if (item.value === provinceId) return item;
                    });
               }

               this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldData: true,
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    selectedProvince: selectedProvince,
               });
          } else {
               this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    hasOldData: false,
                    addressClinic: '',
                    nameClinic: '',
                    note: '',
               });
          }
          // console.log('res doctor : ', res);
     };
     handleOnchangeText = (event, id) => {
          let stateCopy = this.state;
          stateCopy[id] = event.target.value;
          this.setState({
               ...stateCopy,
          });
     };
     handleSaveContentMarkdown = () => {
          let {
               contentHTML,
               contentMarkdown,
               description,
               selectedDoctor,
               hasOldData,
               selectedPrice,
               selectedPayment,
               selectedProvince,
               nameClinic,
               addressClinic,
               note,
          } = this.state;

          if (contentHTML && contentMarkdown && description && selectedDoctor && selectedDoctor.value) {
               this.props.saveDetailDoctorAction({
                    contentHTML: contentHTML,
                    contentMarkdown: contentMarkdown,
                    description: description,
                    doctorId: selectedDoctor.value,
                    action: hasOldData === true ? manageActions.EDIT : manageActions.CREATE,
                    selectedPrice: selectedPrice.value,
                    selectedPayment: selectedPayment.value,
                    selectedProvince: selectedProvince.value,
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    note: note,
               });
          } else {
               alert('Vui lòng điền thông tin');
          }
     };
     handleChangeSelectDoctorInfo = async (selectionOption, name) => {
          let stateName = name.name;
          let stateCopy = this.state;
          stateCopy[stateName] = selectionOption;
          this.setState({
               ...stateCopy,
          });
          console.log('check state ', selectionOption);
     };
     render() {
          let { selectedDoctor, description, hasOldData, addressClinic, nameClinic, note } = this.state;
          // console.log('check state :', this.state);
          return (
               <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                         <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className="more-info">
                         <div className="content-left">
                              <label>
                                   {' '}
                                   <FormattedMessage id="admin.manage-doctor.select-doctor" />
                              </label>
                              <Select
                                   value={selectedDoctor}
                                   onChange={this.handleChangeSelect}
                                   options={this.state.listDoctor}
                                   placeholder={<div>Chọn bác sĩ</div>}
                                   name={'selectedDoctor'}
                              />
                         </div>
                         <div className="content-right">
                              <label>
                                   {' '}
                                   <FormattedMessage id="admin.manage-doctor.intro" />
                              </label>
                              <textarea
                                   className="form-control"
                                   onChange={(event) => this.handleOnchangeText(event, 'description')}
                                   value={description}
                              >
                                   ThachNhe
                              </textarea>
                         </div>
                    </div>
                    <div className="more-info-extra row">
                         <div className="col-4 form-group">
                              <label>Chọn giá</label>
                              <Select
                                   value={this.state.selectedPrice}
                                   onChange={this.handleChangeSelectDoctorInfo}
                                   options={this.state.listPrice}
                                   placeholder={<div>Chọn giá</div>}
                                   name="selectedPrice"
                              />
                         </div>
                         <div className="col-4 form-group">
                              <label>Chọn phương thức thanh toán</label>
                              <Select
                                   value={this.state.selectedPayment}
                                   onChange={this.handleChangeSelectDoctorInfo}
                                   options={this.state.listPayment}
                                   placeholder={'Phương thức thanh toán'}
                                   name="selectedPayment"
                              />
                         </div>
                         <div className="col-4 form-group">
                              <label>Chọn tỉnh thành </label>
                              <Select
                                   value={this.state.selectedProvince}
                                   onChange={this.handleChangeSelectDoctorInfo}
                                   options={this.state.listProvince}
                                   placeholder={<div>Chọn tỉnh thành</div>}
                                   name="selectedProvince"
                              />
                         </div>
                         <div className="col-4 form-group">
                              <label>Tên phòng khám</label>
                              <input
                                   className="form-control"
                                   onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                                   value={nameClinic}
                              />
                         </div>
                         <div className="col-4 form-group">
                              <label>Địa chỉ phòng khám</label>
                              <input
                                   className="form-control"
                                   onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                                   value={addressClinic}
                              />
                         </div>
                         <div className="col-4 form-group">
                              <label>Note</label>
                              <input
                                   className="form-control"
                                   onChange={(event) => this.handleOnchangeText(event, 'note')}
                                   value={note}
                              />
                         </div>
                    </div>
                    <div className="manage-doctor-editor">
                         <MdEditor
                              style={{ height: '500px' }}
                              renderHTML={(text) => mdParser.render(text)}
                              onChange={this.handleEditorChange}
                              value={this.state.contentMarkdown}
                         />
                    </div>
                    <button
                         className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                         onClick={() => this.handleSaveContentMarkdown()}
                    >
                         {hasOldData === true ? (
                              <span>
                                   <FormattedMessage id="admin.manage-doctor.save" />
                              </span>
                         ) : (
                              <span>
                                   <FormattedMessage id="admin.manage-doctor.add" />
                              </span>
                         )}
                    </button>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          language: state.app.language,
          allDoctors: state.admin.allDoctors,
          allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
          saveDetailDoctorAction: (data) => dispatch(actions.saveDetailDoctorAction(data)),
          getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

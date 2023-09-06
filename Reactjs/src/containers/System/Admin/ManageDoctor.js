import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import { manageActions } from "../../../utils/constant";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctor: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInPutSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInPutSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
  }
  buildDataInPutSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.Markdown &&
      res.data.Markdown.contentHTML
    ) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("res doctor : ", res);
  };
  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleSaveContentMarkdown = () => {
    let {
      contentHTML,
      contentMarkdown,
      description,
      selectedOption,
      hasOldData,
    } = this.state;
    if (
      contentHTML &&
      contentMarkdown &&
      description &&
      selectedOption &&
      selectedOption.value
    ) {
      this.props.saveDetailDoctorAction({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        doctorId: selectedOption.value,
        action: hasOldData === true ? manageActions.EDIT : manageActions.CREATE,
      });
    } else {
      alert("Vui lòng điền thông tin");
    }
  };
  render() {
    let { selectedOption, description, hasOldData } = this.state;
    //console.log("state : ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> create information</div>
        <div className="more-info">
          <div className="content-left">
            <label>choice doctor</label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
            />
          </div>
          <div className="content-right">
            <label>introduction info</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnchangeDescription(event)}
              value={description}
            >
              ThachNhe
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctorAction: (data) =>
      dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

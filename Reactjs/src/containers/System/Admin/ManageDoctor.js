import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
    };
  }

  componentDidMount() {}
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  //   handleChange = ({ label, value }) => {
  //     this.setState({
  //       selectedDoctor: value,
  //     });
  //   };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };
  handleOnchangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleSaveContentMarkdown = () => {
    console.log("check state : ", this.state);
  };
  render() {
    let { selectedDoctor, description } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> create information</div>
        <div className="more-info">
          <div className="content-left">
            <label>choice doctor</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChange}
              options={options}
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
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Save info
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

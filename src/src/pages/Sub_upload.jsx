import React, { Component } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import toastr from "toastr";
import $ from "jquery";

class Sub_upload extends Component {
  componentDidMount() {
    document.title = "AMS-Accessories UPLOAD";
  }
  state = {
    selectedFile: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    if (!this.state.selectedFile) {
      toastr.error("Please choose a file before pressing the Upload button");
      return;
    }

    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios
      .post(BASE_URL + "upload_ass", formData)
      .then((response) => {
        // Handle response if needed
        console.log(response);
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
  };

  // onFileUpload = () => {
  //   const formData = new FormData();
  //   formData.append(
  //     "myFile",
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   );

  //   axios
  //     .post(BASE_URL + "upload_ass", formData)
  //     .then((response) => {
  //       // Handle response if needed
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // Handle error if needed
  //       console.error(error);
  //     });
  // };

  fileData = () => {
    if (this.state.selectedFile) {
      const date = new Date(this.state.selectedFile.lastModified);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Month is zero-based, so we add 1
      const day = date.getDate();
      const formattedDate = `${day.toString().padStart(2, "0")}-${month
        .toString()
        .padStart(2, "0")}-${year}`;
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name || "N/A"}</p>
          <p>File Type: {this.state.selectedFile.type || "N/A"}</p>
          <p>Last Modified: {formattedDate}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h2>Choose a file before pressing the Upload button</h2>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="card">
              <div className="card-header card-primary card-outline">
                <h3 className="card-title">
                  <i className="fa fa-upload"></i> Upload
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-md-4 m-sm-12">
                    <form encType="multipart/form-data">
                      <div className="custom-file">
                        <label className="custom-file-label" htmlFor="file">
                          Choose file
                        </label>
                        <input
                          type="file"
                          name="file"
                          onChange={this.onFileChange}
                          className="custom-file-input"
                          id="file"
                          accept=".csv"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-2 col-md-2 m-sm-12">
                    <button
                      type="button"
                      className="btn btn-success btn-outline-white text-white"
                      onClick={this.onFileUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                {this.fileData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sub_upload;

import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, searchUser, updateUser } from "../../store/actions";
import "./BTForm.css";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    hoTen: "",
    phoneNumber: "",
    email: "",
  };
  state = {
    key: "",
    values: this.stateDefault,
    errors: {},
  };
  handleState = (event) => {
    // console.log(event);
    const {
      name,
      value,
      title,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    let messerr = "";
    // Kiểm tra rỗng
    if (valueMissing) {
      messerr = `${title} không được bỏ trống`;
    }

    // Kiểm tra định dạng
    if (patternMismatch) {
      switch (name) {
        case "maSV":
          messerr = `${title} phải từ 5 đến 15 ký tự`;
          break;
        case "hoTen":
          messerr = `${title} phải là ký tự`;
          break;
        case "phoneNumber":
          messerr = `${title} phải là số và 10 số`;
          break;
        default:
          messerr = `${title} không đúng định dạng`;
      }
    }

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        [name]: messerr,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    if (this.props.selectedUser) {
      this.props.dispatch(updateUser(this.state.values));
    } else {
      this.props.dispatch(addUser(this.state.values));
    }
    this.setState({
      key: "",
      values: this.stateDefault,
    });
  };

  handleKey = (event) => {
    this.setState({
      key: event.target.value,
    });
  };

  handelSearch = () => {
    // console.log(this.state.key);
    this.props.dispatch(searchUser(this.state.key));
  };

  // Chuyển props thành state nội bộ của component
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { maSV, hoTen, phoneNumber, email } = this.state.values;
    return (
      <div className="pt-5">
        <h3 className="bg-black text-white p-3 font-bold">
          Thông tin sinh viên
        </h3>
        <form id="form" noValidate onSubmit={this.handleSubmit}>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="group">
              <input
                type="text"
                required
                name="maSV"
                title="Mã SV"
                pattern="^[a-zA-Z0-9_-]{5,15}$"
                maxLength={15}
                value={maSV}
                onChange={this.handleState}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>Mã SV</label>

              <span className="err text-red-500 text-20">
                {this.state.errors.maSV}
              </span>
            </div>
            <div className="group">
              <input
                type="text"
                required
                name="hoTen"
                title="Họ tên"
                pattern="^[A-Za-z]+$"
                value={hoTen}
                onChange={this.handleState}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>Họ Tên</label>
              <span className="err text-red-500 text-20">
                {this.state.errors.hoTen}
              </span>
            </div>
            <div className="group">
              <input
                type="text"
                required
                name="phoneNumber"
                title="Số điện thoại"
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$"
                value={phoneNumber}
                onChange={this.handleState}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>Số điện thoại</label>
              <span className="err text-red-500 text-20">
                {this.state.errors.phoneNumber}
              </span>
            </div>
            <div className="group">
              <input
                type="email"
                required
                name="email"
                title="Email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                value={email}
                onChange={this.handleState}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>Email</label>
              <span className="err text-red-500 text-20">
                {this.state.errors.email}
              </span>
            </div>
          </div>
          <div className="mt-5 flex flex-row justify-between">
            <div>
              <button className="p-2 bg-green-400 rounded-md font-bold text-white mr-2">
                {!this.props.selectedUser
                  ? "Thêm sanh diên"
                  : "Cập nhật sanh diên"}
              </button>
              <button
                type="reset"
                className="p-2 bg-violet-400 rounded-md font-bold text-white mr-2"
              >
                Reset
              </button>
            </div>
            <fieldset className="space-y-1 dark:text-gray-100">
              <label htmlFor="Search" className="hidden">
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="button"
                    title="search"
                    className="p-1 focus:outline-none focus:ring"
                    onClick={this.handelSearch}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 dark:text-gray-100"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  value={this.state.key}
                  placeholder="Search..."
                  className="w-32 py-2 pl-10 text-sm rounded-md border-2 border-violet-400 sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:border-violet-400"
                  onChange={this.handleKey}
                />
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    ...state.BTQuanLySinhVien,
  };
};

export default connect(mapStateToProp)(FormDangKy);

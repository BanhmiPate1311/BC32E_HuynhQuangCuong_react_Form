import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../store/actions";

class DanhSachSinhVien extends Component {
  state = {
    mangSinhVien: [],
  };
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (nextProps.svSearch.length !== 0) {
      return (currentState.mangSinhVien = nextProps.svSearch);
    }
    return (currentState.mangSinhVien = nextProps.mangSinhVien);
  };

  render() {
    const { mangSinhVien } = this.state;
    const { flag } = this.props;

    return (
      <div className="mt-5">
        <table className="min-w-full text-blue-400">
          <thead className="bg-black text-white">
            <tr className="text-left">
              <th className="p-3">Mã SV</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Email</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {!flag ? (
              <tr className="border-2">
                <td className="text-center text-3xl" colSpan={5}>
                  Không tìm thấy bạn sanh diên này
                </td>
              </tr>
            ) : (
              mangSinhVien.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                >
                  <td className="p-3">{item.maSV}</td>
                  <td className="p-3">{item.hoTen}</td>
                  <td className="p-3">{item.phoneNumber}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3 text-right">
                    <button
                      className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900 mr-2"
                      onClick={() => {
                        this.props.dispatch(editUser(item.id));
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 font-semibold rounded-md bg-red-500 text-gray-900"
                      onClick={() => {
                        this.props.dispatch(deleteUser(item.id));
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    ...state.BTQuanLySinhVien,
  };
};

export default connect(mapStateToProp)(DanhSachSinhVien);

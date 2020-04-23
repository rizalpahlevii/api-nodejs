"use strict";
module.exports = class General {
  static errorResponse(data) {
    response = {
      status: "failed",
      data: data,
    };
    return response;
  }
  static successResponse(data) {
    response = {
      status: "success",
      data: data,
    };
    return response;
  }
};

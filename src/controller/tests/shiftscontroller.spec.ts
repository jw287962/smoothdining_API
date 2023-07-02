import {
  Request,
  Response,
  NextFunction,
  request,
  response,
  json,
} from "express";
import Shifts from "../../model/stores/Shifts";
import shiftController from "../shift_Controller";
jest.mock("../../model/stores/Shifts");

describe("test query Shifts controller", () => {
  it("return error if future date", async () => {
    const tmr = new Date(1688281421943 + 86400000);
    const req = {
      params: { dateID: tmr },
      cookies: jest.fn(request.cookies),
    } as unknown as Request;
    const res = {
      json: jest.fn(json),
      status: jest.fn(response.status),
    } as unknown as Response;
    // (Shifts.find as jest.Mock).mockReturnValue

    await shiftController.queryShiftsDate(req, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot query future dates",
    });
  });

  it("Not Date Format", async () => {
    const req = {
      params: { dateID: 1688342400000 },
      cookies: jest.fn(request.cookies),
    } as unknown as Request;
    const res = {
      json: jest.fn(json),
      status: jest.fn(response.status),
    } as unknown as Response;
    // (Shifts.find as jest.Mock).mockReturnValue

    await shiftController.queryShiftsDate(req, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not Date Format",
    });
  });
});
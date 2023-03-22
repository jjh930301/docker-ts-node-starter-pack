import { Body, Controller, Example, Get, Path, Put, Query, Request, Route, Security, Tags } from "tsoa";
import ServiceData from "../../utils/servicedata";
import { IModifyUser } from "./dto/ImodifyUserDto";
import { UserService } from "./userService";

@Tags('user')
@Route('user')
export class UserContoller extends Controller {

  private readonly userSvc : UserService = new UserService();

  @Example({
    status : 200,
    message : ['message'],
    payload : {
      user : {
        email: "string",
        mobile: "string",
        status: 0,
        type: 0
      }
    },
    result_code : 2000,
  })
  @Security('jwt')
  @Get()
  public async user(
    @Request() req
  ) {
    if(req?.user?.status === 401) return req.user
    try {
      return await this.userSvc.user(req.user.id);
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }

  @Example({
    status : 200,
    message : ['message'],
    payload : {
      result : true
    },
    result_code : 2000,
  })
  @Security('jwt')
  @Put('')
  public async modifyUser(
    @Request() req,
    @Body() body : IModifyUser,
  ) {
    if(req?.user?.status === 401) return req.user
    try {
      return await this.userSvc.modifyUser(req.user.id , body)
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }
}
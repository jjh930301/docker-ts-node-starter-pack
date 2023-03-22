import {Body,Controller,Get,Path,Post,Query,Route,SuccessResponse,Tags,Response, Example} from "tsoa";
import { IRegistUser } from "./dto/IregistUserDto";

import { AuthService } from "./authService";
import ServiceData from "../../utils/servicedata";

@Tags('auth')
@Route("auth")
export class AuthController extends Controller {

  private readonly authSvc : AuthService = new AuthService();

  @Example({
    status : 200,
    message : ['message'],
    payload : {
      email : 'string',
      mobile : 'string',
      accessToken : 'string',
    },
    result_code : 2000,
  }) // Custom success response
  @Post("regist")
  public async createUser(
    @Body() body: IRegistUser,
  ) {
    try {
      return await this.authSvc.regist(body);
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }
}
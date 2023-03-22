
export default class ServiceData {
  /**
   * @param status status codoe
   * @param message message[]
   * @param payload payload any
   * @param result_code result code
   */
   constructor(
    public status: number,
    private message: string,
    public payload?: any | null,
    private result_code?: number | null,
  ) { }

  static timeout = () => {
    return {
      status : 408 , 
      message : ['Request timeout'] , 
      payload : {result : null} , 
      result_code : 4008
    }
  }

  static invalidRequest = (
    message: string,
    result_code: number | null = null,
    key : string,

  ) => {
    return {
      status :400, 
      message :[message], 
      payload :{[key]:null}, 
      result_code :result_code
    };
  };

  static noModelFound = (name: string) => {
    return {
      status : 404,
      message : [`no ${name} found`],
      payload : {result:null},
      result_code : 4001,
    };
  };

  static notAuthorized = (message : string | null = "") => {
    return {
      status : 401,
      message : [`authentication failed${message}`],
      payload : {result:null},
      result_code : 4001,
    };
  };

  static cannotAccess = (
    message : string | null = "",
    result_code : number | null = 4000
  ) => {
    return {
      status : 403,
      message : [`Access denied${message}`],
      payload : {result:null},
      result_code : result_code
    }
  }

  static missingRequestBody = (name: string | null = 'check all') => {
    return {
      status : 404,
      message : [`missing body data found${` - (${name}`})`],
      payload : {result:null},
      result_code : 4002,
    };
  };

  static invalidRequestData = (name: string) => {
    return {
      status : 404,
      message : [`invalid ${name} found`],
      payload : {result:null},
      result_code : 4003,
    };
  };

  static badRequest = (message : string | null = '' , key : string, result_code : number) => {
    return {
      status : 404,
      message : [`BadRequest${message}`],
      payload : {[key] : null},
      result_code : result_code
    };
  }

  // for axios
  static httpOk = (
    message : string,
    data: any | null = null,
  ) => {
    return {
      status : 200, 
      message : [message], 
      payload : data.data, 
      result_code : 2101
    };
  };

  // for axios
  static httpError = (
    message : string,
    data : any
  ) => {
    return {
      status : 502,
      message : [message],
      payload : data,
      result_code : 5001
    }
  }

  static ok = (
    message: string,
    payload: any | null = null,
    result_code: number | null = null,
  ) => {
    return {
      status :200, 
      message :[message], 
      payload :payload, 
      result_code :result_code
    };
  };

  static successfullyFetched = (
    name: string,
    payload: any,
    result_code: number | null = null,
  ) => {
    return {
      status : 200,
      message : [`${name} successfully fetched`],
      payload : payload,
      result_code : result_code,
    };
  };

  static dataRegistered = (name: string, payload: any) => {
    return {
      status : 201,
      message : [`${name} successfully registered`],
      payload : payload,
      result_code : 2001
    };
  };

  static successModify = (message: string, paylod: any , result_code : number) => {
    return {
      status : 200,
      message : [`${message}`],
      payload : paylod,
      result_code : 2101
    };
  }

  static serverError = (
    message: string,
    result_code: number | null = 5101
  ) => {
    return {
      status :500,
      message :[message],
      payload :{result:null},
      result_code :result_code,
    };
  };

  static serverCrudError = () => {
    return {
      status : 501,
      message : [`CRUD error`],
      payload : {result:null},
      result_code : 5001,
    };
  };
}


import { WsException } from '@nestjs/websockets';

type WsExceptionType = 'BadRequest' | 'Unauthorized' | 'Unknown';

export class WsBaseException extends WsException {
  readonly type: WsExceptionType;

  constructor(type: WsExceptionType, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsBaseException {
  constructor(message: string | unknown) {
    super('BadRequest', message);
  }
}

export class WsUnauthorizedException extends WsBaseException {
  constructor(message: string | unknown) {
    super('Unauthorized', message);
  }
}

export class WsUnknownException extends WsBaseException {
  constructor(message: string | unknown) {
    super('Unknown', message);
  }
}

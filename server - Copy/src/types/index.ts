// User related types
export interface IUser {
  userId: number;
  userName: string;
  name: string;
  userHeadUrl?: string;
  userRoomCards: number;
  roomId: number;
  createdAt: Date;
}

export interface IUserCreate {
  userName: string;
  password: string;
  name: string;
}

export interface IUserLogin {
  userName: string;
  password: string;
}

export interface IUserResponse extends Omit<IUser, 'password'> {}

// JWT related types
export interface IJWTPayload {
  userId: number;
  userName: string;
  iat: number;
  exp: number;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUserResponse;
}

// WebSocket message types
export interface IWebSocketMessage<T = any> {
  type: string;
  data: T;
}

export interface ISignUpMessage extends IWebSocketMessage<IUserCreate> {
  type: 'signUp';
}

export interface ILoginMessage extends IWebSocketMessage<IUserLogin> {
  type: 'login';
}

export interface IWebSocketResponse<T = any> {
  type: string;
  success: boolean;
  message: string;
  timestamp: string;
  data?: T;
  token?: string;
  user?: IUserResponse;
}

// Service response types
export interface IServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface IAuthServiceResponse extends IServiceResponse<IUserResponse> {
  token?: string;
  user?: IUserResponse;
}

// Database related types
export interface IDatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// Error types
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ERROR = 'DUPLICATE_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ICustomError {
  code: ErrorCode;
  message: string;
  details?: any;
}

// Message handler types
export type MessageHandler = (connection: any, data: any) => Promise<void>;

export interface IMessageHandlers {
  [key: string]: MessageHandler;
} 
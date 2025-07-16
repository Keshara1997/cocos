export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET || 'default',
    EXPIRES_IN: '24h' as const,
    ALGORITHM: 'HS256' as const,
} as const;

export const BCRYPT_CONFIG = {
    SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
} as const;

export const SERVER_CONFIG = {
    PORT: parseInt(process.env.PORT || '3000'),
    WS_PROTOCOL: 'echo-protocol',
    NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

export const WEBSOCKET_MESSAGE_TYPES = {
    // Client to Server
    SIGN_UP: 'signUp',
    LOGIN: 'login',
    GET_USER_INFO: 'getUserInfo',
    UPDATE_USER_INFO: 'updateUserInfo',

    // Server to Client
    SIGN_UP_RESPONSE: 'signUpResponse',
    LOGIN_RESPONSE: 'loginResponse',
    GET_USER_INFO_RESPONSE: 'getUserInfoResponse',
    UPDATE_USER_INFO_RESPONSE: 'updateUserInfoResponse',
    WELCOME: 'welcome',
    ERROR: 'error',
} as const;

export const DATABASE_CONFIG = {
    DEFAULT_USER_ROOM_CARDS: 0,
    DEFAULT_ROOM_ID: 0,
} as const;

export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 20,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 50,
    },
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 30,
    },
} as const; 
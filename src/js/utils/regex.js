export const DATE_REGEX = /^(20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;
export const DATE_TIME_REGEX = /^(20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01]) ([01]\d|2[0-3]):([0-5]\d|2[0-9])$/;
export const DURATION_REGEX = /^[0-9]{2}:([01]\d|2[0-3]):([0-5]\d|2[0-9])$/;
export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d|2[0-9])$/;

export const SERVICE_VERSION_REGEX = /^#(\d)/;
export const SERVICE_ALLIANCE_REGEX = /\|{2} (\S{2,36}) - (\S{2,36}) \|{2}/;
export const SERVICE_CARRIER_REGEX = /(\S{2,36}) - (\S{2,36})/g;

export const FLOAT_REGEX = /^[-+]?[0-9]*(\.[0-9]+)$/;
export const INT_REGEX = /^[-+]?[0-9]*$/;

export const COLUMN_AND_OPERATOR_REGEX = /^([\d-_\.\ a-zA-Z]+)\[([a-z]{2,4})\]$/;
export const COLUMN_OPERATOR_AND_VALUE_REGEX = /^([a-zA-Z0-9_\.]{2,})\[([a-z]{2,4})\]([a-zA-Z0-9\-\_: ]+)$/;
export const TIME_ZONE_REGEX = /^([+-])(2[0-3]|[01][0-9]):([0-5][0-9])$/;

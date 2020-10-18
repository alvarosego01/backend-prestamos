export enum ActionAdmin
{
    CHANGE_ROLE = "CHANGE_ROLE",
    MOVED       = "MOVED",
    REMOVED     = "REMOVED",
    SET_LICENSE = "SET_LICENSE", //establecimiento de licencia
    DEL_LICENSE = "DEL_LICENSE", //borrado de licencia
    STP_LICENSE = "STP_LICENSE", //pausa de licencia
    CHG_LICENSE = "CHG_LICENSE" //cambio de licencia
}

export enum StatusLicense
{
    ACTIVE  = "ACTIVE",
    PAUSED  = "PAUSED",
    REMOVED = "REMOVED"
}

export enum ActionDescp
{
    SET_LICENSE = "Se le otorgó la licencia al usuario"
}
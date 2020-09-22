
export const rolesMenu = {
  sessionBaseUrl: "dashboard",
  GENERAL: [
    {
      name: "Perfil",
      icon: null,
      url: "profile",
    },
    {
      name: "Mensajeria",
      icon: null,
      url: "messages",
      child: [
        {
          name: "Mensaje",
          icon: null,
          url: "message/:id",
        },
      ],
    },
    {
      name: "Notificaciones",
      icon: null,
      url: "notifications",
      child: [
        {
          name: "Notificación",
          icon: null,
          url: "notification/:id",
        },
      ],
    },
    {
      name: "Configuraciones",
      icon: null,
      url: "settings",
    },
    {
      name: "Cerrar sesión",
      icon: null,
      url: null,
    },
  ],

  ADMIN_ROLE: [
    {
      name: "Gestión de usuarios",
      icon: null,
      url: "usersControl",
      child: [
          {
            name: "Usuario",
          icon: null,
           url: "user/:id"
        }
        ],
    },
    {
      name: "Gestión de contratos",
      icon: null,
      url: "contractsControl",
      child: [
        {
          name: "Contrato",
        icon: null,
         url: "contract/:id"
      }
      ],
    },
    {
      name: "Control de roles",
      icon: null,
      url: "rolesControl",
    },
    {
      name: "Atención al cliente",
      icon: null,
      url: "supportControl",
      child: [
        {
          name: "Atención al cliente",
        icon: null,
         url: "support/:id"
      }
      ],
    },
  ],

  CONTRATISTA_ROLE: [
    {
      name: "Historial de Contratos",
      icon: null,
      url: "contracts",
      child: [
        {
          name: "Contrato",
        icon: null,
         url: "contract/:id"
      }
      ],
    },
  ],
  ARTISTA_ROLE: [
    {
      name: "Historial de Contratos",
      icon: null,
      url: "contracts",
      child: [
        {
          name: "Contrato",
        icon: null,
         url: "contract/:id"
      }
      ],
    },
  ],
};

export const subRolesMenu = {
  CANTANTE_ROLE: [
    // {
    //     name: "Contratos",
    //     icon: null,
    //     url: "contracts",
    //   },
  ],

  INSTRUMENTISTA_ROLE: [
    // {
    //     name: "Contratos",
    //     icon: null,
    //     url: "contracts",
    //   },
  ],

  ESCENADIRECTOR_ROLE: [
    // {
    //     name: "Contratos",
    //     icon: null,
    //     url: "contracts",
    //   },
  ],

  ORQUESTADIRECTOR_ROLE: [
    // {
    //     name: "Contratos",
    //     icon: null,
    //     url: "contracts",
    //   },
  ],
};

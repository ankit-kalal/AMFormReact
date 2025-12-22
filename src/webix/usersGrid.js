/**
 * Webix Users Grid Component
 * Pure Webix configuration - no business logic
 */

export const getUsersGridConfig = () => {
  return {
    view: "datatable",
    id: "usersGrid",
    columns: [
      { id: "name", header: "Name", width: 200, sort: "string" },
      { id: "email", header: "Email", width: 250, sort: "string" },
      { id: "role", header: "Role", width: 120, sort: "string" },
      { id: "lastLogin", header: "Last Login", width: 150, sort: "date" }
    ],
    autoheight: false,
    autowidth: true,
    scroll: "xy",
    select: true,
    pager: {
      template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
      size: 20,
      group: 5
    }
  };
};


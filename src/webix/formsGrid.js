/**
 * Webix Forms Grid Component
 * Pure Webix configuration - no business logic
 */

export const getFormsGridConfig = () => {
  return {
    view: "datatable",
    id: "formsGrid",
    columns: [
      { id: "name", header: "Form Name", width: 250, sort: "string" },
      { id: "createdAt", header: "Created Date", width: 150, sort: "date" },
      { id: "updatedAt", header: "Last Modified", width: 150, sort: "date" }
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


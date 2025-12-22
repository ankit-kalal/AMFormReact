/**
 * Webix Forms Grid Component
 * Pure Webix configuration - no business logic
 */

export const getFormsGridConfig = () => {
  return {
    view: "datatable",
    id: "formsGrid",
    columns: [
      {
        id: "view_action",
        header: "View",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h viewbtn" data-action="view" data-row-id="' + rowId + '">View</button>';
        }
      },
      {
        id: "edit_action",
        header: "Edit",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h editbtn" data-action="edit" data-row-id="' + rowId + '">Edit</button>';
        }
      },
      {
        id: "delete_action",
        header: "Delete",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h deletebtn" data-action="delete" data-row-id="' + rowId + '">Delete</button>';
        }
      },
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


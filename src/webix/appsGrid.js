/**
 * Webix Apps Grid Component
 * Pure Webix configuration - no business logic
 */

export const getAppsGridConfig = () => {
  return {
    view: "datatable",
    id: "appsGrid",
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
      { id: "app_name", header: "App Name",  sort: "string" },
      { id: "description", header: "Description",  sort: "string" },
      { id: "version", header: "Version", sort: "string"},
      { id: "form_count", header: "Forms",  sort: "int", template: function(obj) {
        return obj.form_count + ' ' + (obj.form_count === 1 ? 'form' : 'forms');
      }},
      { id: "created_at", header: "Created",  sort: "date" }
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


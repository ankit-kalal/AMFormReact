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
          return '<button style="background: none; border: none; color: #1976d2; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="view" data-row-id="' + rowId + '">View</button>';
        }
      },
      {
        id: "edit_action",
        header: "Edit",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #388e3c; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="edit" data-row-id="' + rowId + '">Edit</button>';
        }
      },
      {
        id: "delete_action",
        header: "Delete",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #d32f2f; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="delete" data-row-id="' + rowId + '">Delete</button>';
        }
      },
      { 
        id: "app_name", 
        header: [{ 
          text: "App Name", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "app_name"
          }
        }],  
        sort: "string"
      },
      { 
        id: "description", 
        header: [{ 
          text: "Description", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "description"
          }
        }],  
        sort: "string"
      },
      { 
        id: "version", 
        header: [{ 
          text: "Version", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "version"
          }
        }], 
        sort: "string"
      },
      { 
        id: "form_count", 
        header: [{ 
          text: "Forms", 
          content: "excelFilter", 
          mode: "number"
        }],  
        sort: "int",
        template: function(obj) {
          return obj.form_count + ' ' + (obj.form_count === 1 ? 'form' : 'forms');
        }
      },
      { 
        id: "created_at", 
        header: [{ 
          text: "Created", 
          content: "excelFilter", 
          mode: "date"
        }],  
        sort: "date"
      }
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


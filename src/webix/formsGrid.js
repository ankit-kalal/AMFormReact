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
        width: 50,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #1976d2; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="view" data-row-id="' + rowId + '">View</button>';
        }
      },
      {
        id: "edit_action",
        header: "Edit",
        width: 50,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #388e3c; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="edit" data-row-id="' + rowId + '">Edit</button>';
        }
      },
      
      { 
        id: "name", 
        width: 200,
        header: [{ 
          text: "Form Name", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "name"
          }
        }], 
        width: 250, 
        sort: "string"
      },
      {
        id: "description",
        width: 200,
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
        id: "createdAt", 
        header: [{ 
          text: "Created Date", 
          content: "excelFilter", 
          mode: "date"
        }], 
        width: 150, 
        sort: "date"
      },
      { 
        id: "updatedAt", 
        header: [{ 
          text: "Last Modified", 
          content: "excelFilter", 
          mode: "date"
        }], 
        width: 150, 
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


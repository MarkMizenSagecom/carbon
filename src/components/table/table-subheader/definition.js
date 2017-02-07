import TableSubheader from './';
import Definition from './../../../../demo2/utils/definition';

let definition = new Definition('table-subheader', TableSubheader, {
  propTypes: {
    align: "String",
    name: "String",
    sortable: "Boolean"
  },
  propDescriptions: {
    align: "Aligns the text in the cell. Can be set to left, center or right.",
    name: "This will normally match the key for data displayed in this column, it is used to identify the sort column in the table.",
    sortable: "Turn sortable on/off for this column."
  }
});

export default definition;

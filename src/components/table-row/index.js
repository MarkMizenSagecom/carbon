import React from 'react';
import Icon from 'utils/icon';

class TableRow extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.childPropsHaveChanged) {
      return true;
    }

    return (nextProps.data !== this.props.data);
  }

  buildRow = () => {
    var row = [],
        rowID = this.props.row_id;

    if (!this.props.placeholder) {
      row.push(
        <td key={ rowID + 'actions' } className="ui-table-row__td">
          <button type="button" className="ui-table-row__delete" id={ rowID } onClick={this.deleteMethod}>
            <Icon type="delete" className="ui-table-row__delete-icon" />
          </button>
        </td>
      );
    } else {
      row.push(<td key={ rowID + 'actions' } className="ui-table-row__td"></td>);
    }

    for (var key in this.props.fields) {
      var field = this.props.fields[key];

      if (field) {
        var value = (this.props.data) ? this.props.data.get(field.props.name) : null;
        row.push(this.buildCell(field, value));
      }
    }

    return row;
  }

  deleteMethod = (ev) => {
    ev.preventDefault();
    this.props.deleteRowHandler(ev, this.props);
  }

  buildCell = (field, value) => {
    var rowID = this.props.row_id,
        fieldProps = {
          label: false,
          key: rowID,
          name: `[${this.props.name}_attributes][${rowID}][${field.props.name}]`,
          row_id: rowID,
          namespace: this.props.name,
          onChange: this.props.updateRowHandler
        };

    if (value) {
      fieldProps.value = value
    }

    if (this.props.placeholder) {
      fieldProps._placeholder = true;
    }

    var fieldHTML = React.cloneElement(field, fieldProps);

    return <td key={ rowID + field.props.name } className="ui-table-row__td">{ fieldHTML }</td>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <tr className="ui-table-row">
        { this.buildRow() }
      </tr>
    );
  }

};

export default TableRow;

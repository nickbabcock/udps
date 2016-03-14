import React, {Component} from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class Statistics extends Component {
  render() {
    return (
      <div>
        <h2>Statistics</h2>
        <DatePicker hintText="Portrait Dialog" />
      </div>
    );
  }
}
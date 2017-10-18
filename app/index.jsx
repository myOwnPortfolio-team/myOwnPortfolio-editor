/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Dexie from 'dexie';

// import hello from './config/hello.json';

import './style/index.scss';

// function HelloWorld(props) {
//   let message;
//   if (props.message && props.message['hello-message']) message = props.message['hello-message'];
//   else message = 'Error';

//   return (
//     <h1>{message}</h1>
//   );
// }

class DBPerson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      persons: [],
    };
  }

  componentDidMount() {
    this.state.database.person.toArray()
      .then(persons => this.setState({ persons }));
  }

  render() {
    const rows = [];
    this.state.persons.forEach(person =>
      rows.push(<li key={person.firstName}>{person.firstName} {person.lastName}</li>));

    return (
      <ul>
        {rows}
      </ul>
    );
  }
}

// ========================================

const db = new Dexie('LocalStorage');

// Create schema
db.version(1).stores({
  person: 'firstName, lastName',
});

// Open the database
db.open();

// Adding data
db.person.add({
  firstName: 'f1',
  lastName: 'l1',
});

db.person.add({
  firstName: 'f2',
  lastName: 'l2',
});

db.person.add({
  firstName: 'f3',
  lastName: 'l3',
});

ReactDOM.render(
  <DBPerson database={db} />,
  // <HelloWorld message={hello} />,
  document.getElementById('root'),
);

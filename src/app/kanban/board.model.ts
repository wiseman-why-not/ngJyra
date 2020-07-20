// this represents our data on the front end angular app.
// this will make it less likley for any data that we write
// to the data base to get corrupted because we can write
// any values to a noSql database like firestore.

export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

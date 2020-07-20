import { Board, Task } from './board.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  /**
   * Create a new board for the current user
   */

   async createBoard(data: Board) {
     const user = await this.afAuth.currentUser;
     return this.db.collection('boards').add({
       ...data,
       uid: user.uid,
       tasks: [{ description: "Add task", label: 'yellow'}]
     });
   }

   /**
    * Delete Board
    */
   deleteBoard(boardId: string) {
     return this.db.collection('boards').doc(boardId).delete();
   }

   /**
    * Update teh tasks on the board
    */
   updateTasks(boardId: string, tasks: Task[]) {
     return this.db.collection('boards').doc(boardId).update({ tasks });
   }

   /**
    * Remove a specific task from the board
    */
   removeTask(boardId: string, task: Task){
     return this.db
       .collection('boards')
       .doc(boardId)
       .update({ tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
   }

    /**
    * Get all boards owned by the current user
    */
   getUserBoards() {
     return this.afAuth.authState.pipe(
       switchMap(user => {
         if (user) {
           return this.db
             .collection<Board>('boards', ref =>
               ref.where('uid', '==', user.uid).orderBy('priority')
               ).valueChanges({ idField: 'id' });
         } else {
           return [];
         }
       })
     );
   }

    /**
    * Run a batch write to change the priority of each board for sorting
    */
   sortBoards(boards: Board[]) {
     const db = firebase.firestore();
     const batch = db.batch();
     const refs = boards.map(b => db.collection('boards').doc(b.id));

     refs.forEach((ref, idx) => batch.update(ref, {prority: idx}));
     batch.commit();
   }
}

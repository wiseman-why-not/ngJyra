import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { BoardService } from './../board.service';
import { Board } from './../board.model';


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {

  boards: Board[];
  sub: Subscription;

  constructor(public BoardService: BoardService) { }

  ngOnInit(): void {
    this.sub = this.BoardService.getUserBoards().subscribe(
      boards => (this.boards = boards)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.BoardService.sortBoards(this.boards);
  }

}

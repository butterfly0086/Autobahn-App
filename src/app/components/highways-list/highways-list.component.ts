import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AutobahnService } from '../../services/autobahn.service';

@Component({
  selector: 'app-highways-list',
  templateUrl: './highways-list.component.html',
  styleUrls: ['./highways-list.component.scss'],
})

export class HighwaysListComponent implements OnInit, AfterViewInit {
  highways: string[] = [];
  loading: boolean | null = false;
  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private autobahnService: AutobahnService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.selectedOptions.selected.map(
      option => option.value
    );

    if (selectedOptions.length > 0) {
      let roadworks: any[] = [];
      this.loading = true;

      this.autobahnService.getRoadworks(selectedOptions[0]).subscribe((data) => {
        data.roadworks.forEach((roadwork: any, index: number) => {
          const { title, identifier } = roadwork;

          roadworks = [ ...roadworks, { title, identifier, id: index + 1 } ];
        });

        this.dataSource.data = roadworks;

        this.loading = false;
      });
    }
  }

  ngOnInit(): void {
    this.autobahnService.getHighways().subscribe((data) => {
      this.highways = data.roads;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  highwaysGrid: number = 2;
  roadworksGrid: number = 10;
  highways: string[] = [];
  getHighwaysLoading: boolean | null = false;
  loading: boolean | null = false;
  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  searchValue: string = '';
  selectedHighway: string[] = [];

  constructor(private autobahnService: AutobahnService, private breakpointObserver: BreakpointObserver) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit(): void {
    this.handleGrid();
    this.getHighwaysLoading = true;
    
    this.autobahnService.getHighways().subscribe((data) => {
      this.highways = data.roads;

      this.getHighwaysLoading = false;
    });
  };

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  };

  handleGrid () {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          if (this.selectedHighway.length > 0) {
            this.highwaysGrid = 0;
            this.roadworksGrid = 12;
          } else {
            this.highwaysGrid = 12;
            this.roadworksGrid = 0;
          }
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.highwaysGrid = 4;
          this.roadworksGrid = 8;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.highwaysGrid = 3;
          this.roadworksGrid = 9;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.highwaysGrid = 3;
          this.roadworksGrid = 9;
        } else {
          this.highwaysGrid = 2;
          this.roadworksGrid = 10;
        }
      }
    });
  };

  onSearchHighways () {
    this.getHighwaysLoading = true;

    this.autobahnService.getHighways().subscribe((data) => {
      this.highways = data.roads.filter((road: string) => road.indexOf(this.searchValue) > -1);

      this.getHighwaysLoading = false;
    });
  };

  onHandleMenu () {
    this.selectedHighway = [];
    this.handleGrid();
  };

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.selectedOptions.selected.map(
      option => option.value
    );

    if (selectedOptions.length > 0) {
      let roadworks: any[] = [];
      this.selectedHighway = selectedOptions;
      this.loading = true;
      this.handleGrid();

      this.autobahnService.getRoadworks(selectedOptions[0]).subscribe((data) => {
        data.roadworks.forEach((roadwork: any, index: number) => {
          const { title, identifier } = roadwork;

          roadworks = [ ...roadworks, { title, identifier, id: index + 1 } ];
        });

        this.dataSource.data = roadworks;

        this.loading = false;
      });
    }
  };
}

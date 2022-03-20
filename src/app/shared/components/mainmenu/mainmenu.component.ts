import { Component, OnInit } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MenuNode } from '../../interfaces/menu-node';

const MENU_NODES: MenuNode[] = [
  {
    name: 'Home',
    route: '/home'
  },
  {
    name: 'Content',
    children: [
      {
        name: 'Users',
        children: [
          {
            name: 'Users Page',
            route: '/users'
          }, 
          {name: 'User 1'}, 
          {name: 'User 2'},
          {name: 'User 3'},
          {name: 'User 4'},
          {name: 'User 5'}
        ],
      },
      {
        name: 'Posts',
        children: [
          {
            name: 'Posts Page',
            route: '/posts'
          }, 
          {name: 'Post 1'},
          {name: 'Post 2'},
          {name: 'Post 3'},
          {name: 'Post 4'}
        ],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  route?: string;
  level: number;
}

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  constructor() {
    this.dataSource.data = MENU_NODES;
  }

  private _transformer = (node: MenuNode, level: number): FlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
  }

  changeRouteHandler($event: any): void {
    console.log('%c *-*-* changeRouteHandler *-*-*', 'color:#bada55;', $event);
  }
}

import {Injectable} from '@angular/core';
import {Technology} from '../interfaces/technology';
import {Level} from '../interfaces/level';

@Injectable()
export class TechnologyService {

  levels: Level[] = [
    {
      id: 1,
      name: 'Essential'
    }, {
      id: 2,
      name: 'Basic'
    }, {
      id: 3,
      name: 'Intermediate'
    }, {
      id: 4,
      name: 'Advanced'
    }, {
      id: 5,
      name: 'Professional'
    }
  ];

  technologies: Technology[] = [
    {
      id: 'ios',
      name: 'iOS',
      color: '#1C56FB',
      icon: 'ios.svg'
    }, {
      id: 'android',
      name: 'Android',
      color: '#3ECF8E',
      icon: 'android.svg'
    }, {
      id: 'java',
      name: 'Java',
      color: '#FF0844',
      icon: 'java.svg'
    }, {
      id: 'firebase',
      name: 'Firebase',
      color: '#FCCA3F',
      icon: 'firebase.svg'
    }, {
      id: 'angular',
      name: 'Angular',
      color: '#E23237',
      icon: 'angular.svg'
    }, {
      id: 'productivity',
      name: 'Productividad',
      color: '#434343',
      icon: 'productivity.svg'
    }, {
      id: 'gcp',
      name: 'Google Cloud Platform',
      color: '#3B78E7',
      icon: 'gcp.svg'
    }, {
      id: 'prog',
      name: 'Programación',
      color: '#b224ef',
      icon: 'code.svg'
    }
  ];

  constructor() {
  }

  getTechnologies(): Technology[] {
    return this.technologies;
  }

  getTechnology(id: string): Technology {
    return this.technologies.find(x => x.id === id);
  }

  getLevel(id: number): Level {
    return this.levels.find(x => x.id === id);
  }

  getLevels(): Level[] {
    return this.levels;
  }

}

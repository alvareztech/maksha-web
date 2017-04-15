import {Injectable} from '@angular/core';
import {Technology} from '../interfaces/technology';
import {Level} from '../interfaces/level';

@Injectable()
export class TechnologyService {

  levels: Level[] = [
    {
      id: 1,
      name: 'Básico'
    },
    {
      id: 2,
      name: 'Intermedio'
    },
    {
      id: 3,
      name: 'Avanzado'
    },
    {
      id: 4,
      name: 'Desafiante'
    }
  ];

  technologies: Technology[] = [
    {
      id: 'ios',
      name: 'iOS',
      color: '#1C56FB',
      icon: 'ios.svg'
    },
    {
      id: 'android',
      name: 'Android',
      color: '#3ECF8E',
      icon: 'android.svg'
    },
    {
      id: 'java',
      name: 'Java',
      color: '#FF0844',
      icon: 'java.svg'
    },
    {
      id: 'firebase',
      name: 'Firebase',
      color: '#FCCA3F',
      icon: 'firebase.svg'
    },
    {
      id: 'angular',
      name: 'Angular',
      color: '#FF0844',
      icon: 'angular.svg'
    }
  ];

  constructor() {
  }

  getTechnology(id: string): Technology {
    return this.technologies.find(x => x.id === id);
  }

  getLevel(id: number): Level {
    return this.levels.find(x => x.id === id);
  }

}
